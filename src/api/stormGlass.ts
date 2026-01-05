import axios from 'axios'

const API_KEY = import.meta.env.VITE_STORMGLASS_API_KEY

const stormGlassClient = axios.create({
  baseURL: 'https://api.stormglass.io/v2',
  headers: {
    Authorization: API_KEY,
  },
})

export const fetchSurfData = async (lat: number, lng: number) => {
  const params =
    'waveHeight,wavePeriod,windDirection,windSpeed,waterTemperature,humidity,airTemperature'

  const response = await stormGlassClient.get('/weather/point', {
    params: {
      lat,
      lng,
      params,
      source: 'sg',
      end: Math.floor(Date.now() / 1000) + 86400, // 24 horas desde ahora
    },
  })

  console.log('🌊 StormGlass API Response:', response.data)
  return response.data
}
