import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { Map, type MapRef } from 'react-map-gl/mapbox'
import { SurfMarker } from './SurfMarker'
import { SURF_SPOTS } from '../data/spots'
import { useAppSelector } from '@/store/hooks'
import BeachDetails from './BeachDetails'

const LIMA_INITIAL_VIEW = {
  longitude: -77.035,
  latitude: -12.146698164476819,
  zoom: 13,
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapaLima() {
  const mapRef = useRef<MapRef>(null)
  const [viewState, setViewState] = useState(LIMA_INITIAL_VIEW)
  const selectedBeachId = useAppSelector((state) => state.surf.selectedBeachId)

  useEffect(() => {
    if (selectedBeachId && mapRef.current) {
      const spot = SURF_SPOTS.find((s) => s.id === selectedBeachId)
      if (spot) {
        mapRef.current.flyTo({
          center: [spot.lng, spot.lat],
          zoom: 16,
          duration: 1500,
          essential: true,
        })
      }
    }
  }, [selectedBeachId])

  return (
    <div style={{ width: '100%', height: '100%' }} className='relative'>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/alvarordev/cmjxtvirk000k01s59fed7o30"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {SURF_SPOTS.map((spot) => (
          <SurfMarker
            key={spot.id}
            id={spot.id}
            label={spot.label}
            longitude={spot.lng}
            latitude={spot.lat}
          />
        ))}
      </Map>

      {selectedBeachId != null && <BeachDetails beachId={selectedBeachId} />}
    </div>
  )
}
