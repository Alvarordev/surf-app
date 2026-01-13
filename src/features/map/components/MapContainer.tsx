import 'mapbox-gl/dist/mapbox-gl.css'
import { Map } from 'react-map-gl/mapbox'
import { ArrowLeft } from 'lucide-react'
import { SurfMarker } from './SurfMarker'
import BeachDetails from './BeachDetails'
import { useMapController } from '../hooks/useMapController'
import {
  selectSpotsWithStatus,
  setSelectedBeach,
} from '@/features/surf-details/surfSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapaLima() {
  const dispatch = useAppDispatch()
  const { mapRef, viewState, setViewState, selectedBeach, spots } =
    useMapController()

  const markersStatus = useAppSelector(selectSpotsWithStatus)

  return (
    <div style={{ width: '100%', height: '100%' }} className="relative">
      {selectedBeach && (
        <button
          onClick={() => dispatch(setSelectedBeach(null))}
          className="absolute top-20 left-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-slate-200 text-slate-700 md:hidden hover:bg-white transition-colors"
          aria-label="Back to list"
        >
          <ArrowLeft size={20} />
        </button>
      )}

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
