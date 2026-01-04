export interface SurfData {
  waveHeight: number
  waterTemp: number
  wavePeriod?: number
}

export interface SurfMarkerProps {
  id: string | number
  longitude: number
  latitude: number
  label?: string
}
