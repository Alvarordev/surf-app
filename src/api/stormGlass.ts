import axios from 'axios'

const API_KEY = import.meta.env.VITE_STORMGLASS_API_KEY

const stormGlassClient = axios.create({
  baseURL: 'https://api.stormglass.io/v2',
  headers: {
    Authorization: API_KEY,
  },
})

const getLimaTimeRange = () => {
  const now = new Date()
  const limaTime = new Date(now.getTime() - 5 * 60 * 60 * 1000)
  limaTime.setUTCHours(0, 0, 0, 0)

  const start = new Date(limaTime.getTime() + 5 * 60 * 60 * 1000)
  const end = new Date(start.getTime() + 48 * 60 * 60 * 1000)

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  }
}

export const fetchSurfData = async (lat: number, lng: number) => {
  const params =
    'waveHeight,wavePeriod,waveDirection,windDirection,windSpeed,waterTemperature,humidity,airTemperature,swellHeight,swellDirection,swellPeriod'

  const { start, end } = getLimaTimeRange()

  const response = await stormGlassClient.get('/weather/point', {
    params: {
      lat,
      lng,
      params,
      source: 'sg',
      start,
      end,
    },
  })

  console.log('🌊 StormGlass API Response:', response.data)
  return response.data
}

export const fetchSolarData = async (lat: number, lng: number) => {
  const params = 'uvIndex'

  const { start, end } = getLimaTimeRange()

  const response = await stormGlassClient.get('/solar/point', {
    params: {
      lat,
      lng,
      params,
      start,
      end,
    },
  })

  console.log('☀️ StormGlass Solar API Response:', response.data)
  return response.data
}
