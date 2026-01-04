import { fetchSurfData } from '@/api/stormGlass'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface SurfData {
  data: any
  lastUpdated: number
}

export interface SurfState {
  beaches: Record<string, SurfData>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SurfState = {
  beaches: {},
  status: 'idle',
  error: null,
}

export const getBeachConditions = createAsyncThunk(
  'surf/getConditions',
  async ({ lat, lng }: { lat: number; lng: number }, { getState }) => {
    const state = getState() as { surf: SurfState }
    const beachKey = `${lat.toFixed(4)},${lng.toFixed(4)}`
    const cachedBeach = state.surf.beaches[beachKey]
    
    const now = Date.now()
    const CUATRO_HORAS = 4 * 60 * 60 * 1000

    if (cachedBeach && now - cachedBeach.lastUpdated < CUATRO_HORAS) {
      console.log(`⚡ Usando datos cacheados para [${beachKey}] (Ahorrando API Calls)`)
      return { beachKey, data: cachedBeach.data, fromCache: true }
    }

    console.log(`🌊 Fetching new surf data for [${beachKey}] from StormGlass API`)
    const response = await fetchSurfData(lat, lng)
    return { beachKey, data: response, fromCache: false }
  },
)

const surfSlice = createSlice({
  name: 'surf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBeachConditions.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getBeachConditions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { beachKey, data } = action.payload
        state.beaches[beachKey] = {
          data,
          lastUpdated: Date.now(),
        }
      })
      .addCase(getBeachConditions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch surf data'
      })
  },
})

export default surfSlice.reducer
