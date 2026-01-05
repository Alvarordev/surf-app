export const MOCK_STORMGLASS_RESPONSE = {
  hours: [
    {
      airTemperature: {
        sg: 22.5,
      },
      humidity: {
        sg: 75.2,
      },
      time: new Date().toISOString(),
      waterTemperature: {
        sg: 18.4,
      },
      waveHeight: {
        sg: 1.2,
      },
      wavePeriod: {
        sg: 10.5,
      },
      windDirection: {
        sg: 180.0,
      },
      windSpeed: {
        sg: 5.4,
      },
    },
    {
      airTemperature: {
        sg: 21.8,
      },
      humidity: {
        sg: 78.1,
      },
      time: new Date(Date.now() + 3600000).toISOString(),
      waterTemperature: {
        sg: 18.3,
      },
      waveHeight: {
        sg: 1.3,
      },
      wavePeriod: {
        sg: 11.0,
      },
      windDirection: {
        sg: 185.0,
      },
      windSpeed: {
        sg: 6.1,
      },
    },
  ],
  meta: {
    cost: 1,
    dailyQuota: 10,
    end: new Date(Date.now() + 86400000).toISOString(),
    lat: -12.1311,
    lng: -77.0392,
    params: [
      'waveHeight',
      'wavePeriod',
      'windDirection',
      'windSpeed',
      'waterTemperature',
      'humidity',
      'airTemperature',
    ],
    source: ['sg'],
    start: new Date().toISOString(),
  },
}
