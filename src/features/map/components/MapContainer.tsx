import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState, useMemo } from 'react'
import { Map, type MapRef } from 'react-map-gl/mapbox'
import { SurfMarker } from './SurfMarker'
import { SURF_SPOTS } from '../data/spots'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import BeachDetails from './BeachDetails'
import { SURF_ZONES } from '../data/zones'
import { getConditionsByZone } from '@/features/surf-details/surfSlice'

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
  const dispatch = useAppDispatch()

  const selectedBeach = useMemo(
    () => SURF_SPOTS.find((s) => s.id === selectedBeachId),
    [selectedBeachId],
  )

  const zone = useMemo(() => {
    if (!selectedBeach) return SURF_ZONES.COSTA_VERDE 
    return (
      Object.values(SURF_ZONES).find((z) => z.id === selectedBeach.zoneId) ||
      SURF_ZONES.COSTA_VERDE
    )
  }, [selectedBeach])

  const zones = useAppSelector((state) => state.surf.zones)
  
  const conditions = zones?.[zone.id]?.data?.hours[0]

  console.log('Current Conditions:', conditions)

  useEffect(() => {
    if (zone) {
      dispatch(
        getConditionsByZone({
          zoneId: zone.id,
          lat: zone.center.lat,
          lng: zone.center.lng,
        }),
      )
    }
  }, [dispatch, zone])

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
    <div style={{ width: '100%', height: '100%' }} className="relative">
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

      {selectedBeachId != null && (
        <BeachDetails
          beachId={selectedBeachId}
          currentConditions={conditions}
        />
      )}
    </div>
  )
}
