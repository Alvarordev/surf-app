import { MOCK_STORMGLASS_RESPONSE } from '@/api/mockData'
import { fetchSurfData, fetchSolarData } from '@/api/stormGlass'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface SurfData {
  data: any
  lastUpdated: number
}

export interface SurfState {
  zones: Record<string, SurfData>
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

const USE_MOCK = false

export const getConditionsByZone = createAsyncThunk(
  'surf/getConditionsByZone',
  async (
    { zoneId, lat, lng }: { zoneId: string; lat: number; lng: number },
    { getState },
  ) => {
    if (USE_MOCK)
      return { zoneId, data: MOCK_STORMGLASS_RESPONSE, fromCache: false }

    const state = getState() as { surf: SurfState }
    const cachedZone = state.surf.zones?.[zoneId]

    const now = Date.now()
    const CUATRO_HORAS = 4 * 60 * 60 * 1000

    if (cachedZone && now - cachedZone.lastUpdated < CUATRO_HORAS) {
      console.log(
        `⚡ Usando datos cacheados para la zona [${zoneId}] (Ahorrando API Calls)`,
      )
      return { zoneId, data: cachedZone.data, fromCache: true }
    }

    console.log(
      `🌊 Fetching new surf data for zone [${zoneId}] from StormGlass API`,
    )
    const [surfData, solarData] = await Promise.all([
      fetchSurfData(lat, lng),
      fetchSolarData(lat, lng),
    ])

    const hoursObj: Record<string, any> = {}

    surfData.hours.forEach((hour: any, index: number) => {
      const timeKey = hour.time 
      hoursObj[timeKey] = {
        ...hour,
        uvIndex: solarData.hours?.[index]?.uvIndex || null,
      }
    })

    const integratedData = {
      ...surfData,
      hours: hoursObj,
    }

    return { zoneId, data: integratedData, fromCache: false }
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConditionsByZone.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getConditionsByZone.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { zoneId, data } = action.payload
        if (!state.zones) state.zones = {}
        state.zones[zoneId] = {
          data,
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

export default surfSlice.reducer
