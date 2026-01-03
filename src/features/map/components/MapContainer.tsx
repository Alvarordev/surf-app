import { Waves } from 'lucide-react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import { Map, Marker } from 'react-map-gl/mapbox'

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
        <Marker
          longitude={-77.03624604509204}
          latitude={-12.12961492494947}
          anchor="center"
        >
          <div className="group relative flex cursor-pointer flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 font-bold text-white shadow-lg border-[1.5px] border-[#18181a] transition-all group-hover:scale-110">
              1
            </div>

            <div className="absolute top-full mt-1 flex items-center rounded-full bg-indigo-500/90 px-1.5 text-[10px] text-white backdrop-blur-sm border border-white/10 whitespace-nowrap">
              <Waves size={10} className="mr-1" />
              <span>1.2m</span>
            </div>
          </div>
        </Marker>
      </Map>
    </div>
  )
}
