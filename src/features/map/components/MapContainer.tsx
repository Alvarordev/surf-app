import 'mapbox-gl/dist/mapbox-gl.css'
import { Map } from 'react-map-gl/mapbox'
import { SurfMarker } from './SurfMarker'
import BeachDetails from './BeachDetails'
import { useMapController } from '../hooks/useMapController'
import { getBeachStatus, type BeachStatusInfo } from '@/utils/beachStatus'
import { useMemo } from 'react'
import { startOfHour, subHours } from 'date-fns'
import { useAppSelector } from '@/store/hooks'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapaLima() {
  const { mapRef, viewState, setViewState, selectedBeach, spots } =
    useMapController()

  const zones = useAppSelector((state) => state.surf.zones)

  // Calcular el estado de todas las playas cargadas para mostrar en los marcadores
  const markersStatus = useMemo(() => {
    const currentHourISO = startOfHour(subHours(new Date(), 5)).toISOString()
    const statuses: Record<string, BeachStatusInfo> = {}

    spots.forEach((spot) => {
      const zoneData = zones[spot.zoneId]
      const spotData = zoneData?.spots[spot.id]
      const currentConditions = spotData?.conditions.hours[currentHourISO]

      if (currentConditions) {
        statuses[spot.id] = getBeachStatus({
          data: currentConditions,
          exposure: spot.exposure,
        })
      }
    })

    return statuses
  }, [spots, zones])

  return (
    <div style={{ width: '100%', height: '100%' }} className="relative">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/alvarordev/cmjxtvirk000k01s59fed7o30"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {spots.map((spot) => (
          <SurfMarker
            key={spot.id}
            id={spot.id}
            label={spot.label}
            longitude={spot.lng}
            latitude={spot.lat}
            beachStatus={markersStatus[spot.id]}
          />
        ))}
      </Map>

      {selectedBeach && <BeachDetails beach={selectedBeach} />}
    </div>
  )
}
