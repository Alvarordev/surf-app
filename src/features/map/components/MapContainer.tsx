import 'mapbox-gl/dist/mapbox-gl.css'
import { Map } from 'react-map-gl/mapbox'
import { SurfMarker } from './SurfMarker'
import BeachDetails from './BeachDetails'
import { useMapController } from '../hooks/useMapController'
import { selectSpotsWithStatus } from '@/features/surf-details/surfSlice'
import { useAppSelector } from '@/store/hooks'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function LimaMap() {
  const { mapRef, viewState, setViewState, selectedBeach, spots } =
    useMapController()

  const markersStatus = useAppSelector(selectSpotsWithStatus)

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className="relative bg-[#111111]"
    >
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
            beachStatus={markersStatus[spot.id]?.status}
          />
        ))}
      </Map>

      {selectedBeach && <BeachDetails beach={selectedBeach} />}
    </div>
  )
}
