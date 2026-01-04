import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import { Map } from 'react-map-gl/mapbox'
import { SurfMarker } from './SurfMarker'

const LIMA_INITIAL_VIEW = {
  longitude: -77.035,
  latitude: -12.125,
  zoom: 13,
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapaLima() {
  const [viewState, setViewState] = useState(LIMA_INITIAL_VIEW)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/alvarordev/cmjxtvirk000k01s59fed7o30"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <SurfMarker
          id="la-pampilla"
          label="1"
          longitude={-77.0392}
          latitude={-12.1311}
        />
      </Map>
    </div>
  )
}
