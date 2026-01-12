import { SURF_SPOTS, type SurfSpot } from '@/features/map/data/spots'
import { fetchWeatherData, fetchMarineData } from '@/api/openMeteo'
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import type { SurfConditionObject } from '@/features/map/types/surf'
import { getBeachStatus, type BeachStatusInfo } from '@/utils/beachStatus'
import { startOfHour, subHours } from 'date-fns'

export interface SurfConditionData extends SurfSpot {
  conditions: {
    hours: Record<string, SurfConditionObject>
  }
  lastUpdated: number
}

export interface ZoneData {
  id: string
  spots: Record<string, SurfConditionData>
  lastUpdated: number
}

export interface SurfState {
  zones: Record<string, ZoneData>
  selectedBeachId: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SurfState = {
  zones: {},
  selectedBeachId: null,
  status: 'idle',
  error: null,
}

const fetchSpotData = async (spot: SurfSpot): Promise<SurfConditionData> => {
  const [weatherData, marineData] = await Promise.all([
    fetchWeatherData(spot.lat, spot.lng),
    fetchMarineData(spot.lat, spot.lng),
  ])

  const hoursObj: Record<string, SurfConditionObject> = {}

  weatherData.hours.forEach((hour: any) => {
    const timeKey = hour.time
    hoursObj[timeKey] = { ...hour }
  })

  marineData.hours.forEach((hour: any) => {
    const timeKey = hour.time
    if (hoursObj[timeKey]) {
      hoursObj[timeKey] = { ...hoursObj[timeKey], ...hour }
    } else {
      hoursObj[timeKey] = { ...hour as SurfConditionObject }
    }
  })

  return {
    ...spot,
    conditions: { hours: hoursObj },
    lastUpdated: Date.now(),
  }
}

export const getConditionsByZone = createAsyncThunk(
  'surf/getConditionsByZone',
  async (
    { zoneId }: { zoneId: string },
    { getState },
  ) => {
    const state = getState() as { surf: SurfState }
    const cachedZone = state.surf.zones?.[zoneId]

    const now = Date.now()
    const CUATRO_HORAS = 60 * 60 * 1000

    if (cachedZone && now - cachedZone.lastUpdated < CUATRO_HORAS) {
      console.log(
        `⚡ Usando datos cacheados para la zona [${zoneId}] (Ahorrando API Calls)`,
      )
      return { zoneId, spotsData: cachedZone.spots, fromCache: true }
    }

    console.log(
      `🌊 Fetching new surf data for zone [${zoneId}] from OpenMeteo API`,
    )
    
    const zoneSpots = SURF_SPOTS.filter(s => s.zoneId === zoneId)

    const spotsResults = await Promise.all(
      zoneSpots.map(spot => fetchSpotData(spot))
    )
    
    const spotsData: Record<string, SurfConditionData> = {}
    spotsResults.forEach(res => {
      spotsData[res.id] = res
    })

    return { zoneId, spotsData, fromCache: false }
  },
)

const surfSlice = createSlice({
  name: 'surf',
  initialState,
  reducers: {
    setSelectedBeach: (state, action) => {
      state.selectedBeachId =
        state.selectedBeachId === action.payload ? null : action.payload
    },
    clearCache: (state) => {
      state.zones = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConditionsByZone.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getConditionsByZone.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { zoneId, spotsData } = action.payload
        if (!state.zones) state.zones = {}
        state.zones[zoneId] = {
          id: zoneId,
          spots: spotsData,
          lastUpdated: Date.now(),
        }
      })
      .addCase(getConditionsByZone.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch surf data'
      })
  },
})

export const { setSelectedBeach, clearCache } = surfSlice.actions

// Selectors
const selectZones = (state: { surf: SurfState }) => state.surf.zones

/**
 * Selector que devuelve todos los spots con su estado actual calculado
 */
export const selectSpotsWithStatus = createSelector(
  [selectZones],
  (zones) => {
    const currentHourISO = startOfHour(subHours(new Date(), 5)).toISOString()
    const statuses: Record<string, { condition: SurfConditionObject; status: BeachStatusInfo }> = {}

    SURF_SPOTS.forEach((spot) => {
      const zoneData = zones[spot.zoneId]
      const spotData = zoneData?.spots[spot.id]
      const currentConditions = spotData?.conditions.hours[currentHourISO]

      if (currentConditions) {
        statuses[spot.id] = {
          condition: currentConditions,
          status: getBeachStatus({
            data: currentConditions,
            exposure: spot.exposure,
          }),
        }
      }
    })

    return statuses
  }
)

export default surfSlice.reducer
