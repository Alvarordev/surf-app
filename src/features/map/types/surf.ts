import type { BeachStatusInfo } from "@/utils/beachStatus"

export interface SurfConditionObject {
  time: string
  airTemperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  uvIndex: number
  waveHeight: number
  waveDirection: number
  wavePeriod: number
  swellHeight: number
  swellDirection: number
  swellPeriod: number
  secondarySwellHeight: number
  secondarySwellPeriod: number
  secondarySwellDirection: number
  waterTemperature: number
}

export interface SurfMarkerProps {
  id: string | number
  longitude: number
  latitude: number
  label?: string
  beachStatus?: BeachStatusInfo
}
