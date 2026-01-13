import { fetchWeatherApi } from 'openmeteo'

export const fetchWeatherData = async (lat: number, lng: number) => {
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
    ],
    timezone: 'America/New_York',
    forecast_days: 1,
  }
  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)

  const response = responses[0]

  // const utcOffsetSeconds = response.utcOffsetSeconds()

  const hourly = response.hourly()!

  const weatherData = {
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray()!,
      relative_humidity_2m: hourly.variables(1)!.valuesArray()!,
      wind_speed_10m: hourly.variables(2)!.valuesArray()!,
      wind_direction_10m: hourly.variables(3)!.valuesArray()!,
      uv_index: hourly.variables(4)!.valuesArray()!,
    },
  }

  const hours = weatherData.hourly.time.map((time, i) => {
    return {
      time: time.toISOString(),
      airTemperature: weatherData.hourly.temperature_2m[i], // Mapping to match previous naming if helpful, or keep new names
      humidity: weatherData.hourly.relative_humidity_2m[i],
      windSpeed: weatherData.hourly.wind_speed_10m[i],
      windDirection: weatherData.hourly.wind_direction_10m[i],
      uvIndex: weatherData.hourly.uv_index[i],
    }
  })

  return { hours }
}

export const fetchMarineData = async (lat: number, lng: number) => {
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: [
      'wave_height',
      'sea_level_height_msl',
      'wave_direction',
      'wave_period',
      'swell_wave_height',
      'swell_wave_direction',
      'swell_wave_period',
      'secondary_swell_wave_height',
      'secondary_swell_wave_period',
      'secondary_swell_wave_direction',
      'sea_surface_temperature',
    ],
    timezone: 'America/New_York',
    forecast_days: 1,
  }
  const url = 'https://marine-api.open-meteo.com/v1/marine'
  const responses = await fetchWeatherApi(url, params)

  const response = responses[0]
  // const utcOffsetSeconds = response.utcOffsetSeconds()
  const hourly = response.hourly()!

  const marineData = {
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
      ),
      wave_height: hourly.variables(0)!.valuesArray()!,
      sea_level_height_msl: hourly.variables(1)!.valuesArray()!,
      wave_direction: hourly.variables(2)!.valuesArray()!,
      wave_period: hourly.variables(3)!.valuesArray()!,
      swell_wave_height: hourly.variables(4)!.valuesArray()!,
      swell_wave_direction: hourly.variables(5)!.valuesArray()!,
      swell_wave_period: hourly.variables(6)!.valuesArray()!,
      secondary_swell_wave_height: hourly.variables(7)!.valuesArray()!,
      secondary_swell_wave_period: hourly.variables(8)!.valuesArray()!,
      secondary_swell_wave_direction: hourly.variables(9)!.valuesArray()!,
      sea_surface_temperature: hourly.variables(10)!.valuesArray()!,
    },
  }

  const hours = marineData.hourly.time.map((time, i) => ({
    time: time.toISOString(),
    waveHeight: marineData.hourly.wave_height[i],
    tideHeight: marineData.hourly.sea_level_height_msl[i],
    waveDirection: marineData.hourly.wave_direction[i],
    wavePeriod: marineData.hourly.wave_period[i],
    swellHeight: marineData.hourly.swell_wave_height[i],
    swellDirection: marineData.hourly.swell_wave_direction[i],
    swellPeriod: marineData.hourly.swell_wave_period[i],
    secondarySwellHeight: marineData.hourly.secondary_swell_wave_height[i],
    secondarySwellPeriod: marineData.hourly.secondary_swell_wave_period[i],
    secondarySwellDirection:
      marineData.hourly.secondary_swell_wave_direction[i],
    waterTemperature: marineData.hourly.sea_surface_temperature[i],
  }))

  return { hours }
}
