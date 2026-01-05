import { useEffect, useMemo } from 'react'
import { Marker } from 'react-map-gl/mapbox'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  getConditionsByZone,
  setSelectedBeach,
} from '@/features/surf-details/surfSlice'
import type { SurfMarkerProps } from '../types/surf'
import { SURF_ZONES } from '../data/zones'
import { WavesIcon } from '@/assets/WavesIcon'

export const SurfMarker: React.FC<SurfMarkerProps> = ({
  id,
  longitude,
  latitude,
  label = '1',
}) => {
  const dispatch = useAppDispatch()
  const selectedBeachId = useAppSelector((state) => state.surf.selectedBeachId)
  const isSelected = selectedBeachId === id

  const zone = useMemo(() => {
    return Object.values(SURF_ZONES).find((z) => z.spots.includes(id as string))
  }, [id])

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

  const handleClick = () => {
    dispatch(setSelectedBeach(id))
  }

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="center">
      <div
        className="group relative flex cursor-pointer flex-col items-center"
        onClick={handleClick}
      >
        <div
          className={`flex h-8 w-8 border-2 border-background rounded-lg font-bold items-center justify-center shadow-lg text-sm transition-colors ${
            isSelected
              ? 'bg-foreground text-background'
              : 'bg-primary text-white'
          }`}
        >
          {label}
        </div>
        <div className="absolute top-6 h-8 w-9">
          <WavesIcon color={isSelected ? '#ffffff' : '#626eec'} />
        </div>
      </div>
    </Marker>
  )
}
