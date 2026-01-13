import { Marker } from 'react-map-gl/mapbox'
import { useParams, useNavigate } from '@tanstack/react-router'
import type { SurfMarkerProps } from '../types/surf'
import { WavesIcon } from '@/assets/WavesIcon'
import { SURF_SPOTS } from '../data/spots'

export const SurfMarker: React.FC<SurfMarkerProps> = ({
  id,
  longitude,
  latitude,
  label = '1',
  beachStatus,
}) => {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as {
    zoneId?: string
    spotId?: string
  }
  const { zoneId, spotId: selectedBeachId } = params

  const isSelected = selectedBeachId === id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const spot = SURF_SPOTS.find(s => s.id === id)
    const targetZoneId = zoneId || spot?.zoneId || 'costa-verde'
    
    if (selectedBeachId === id) {
      navigate({
        to: '/$zoneId',
        params: { zoneId: targetZoneId },
        search: (prev: any) => ({ ...prev, view: 'map' }),
      } as any)
    } else {
      navigate({
        to: '/$zoneId/$spotId',
        params: { zoneId: targetZoneId, spotId: id },
        search: (prev: any) => ({ ...prev, view: 'map' }),
      } as any)
    }
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
          style={
            isSelected
              ? { backgroundColor: 'var(--foreground)' }
              : { backgroundColor: beachStatus?.color }
          }
        >
          {label}
        </div>
        <div className="absolute top-6 h-8 w-9">
          <WavesIcon color={isSelected ? 'var(--foreground)' : beachStatus?.color} />
        </div>
      </div>
    </Marker>
  )
}
