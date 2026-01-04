import { useEffect, useMemo } from 'react'
import { Marker } from 'react-map-gl/mapbox'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getBeachConditions } from '@/features/surf-details/surfSlice'
import type { SurfMarkerProps } from '../types/surf'
import { Thermometer, Waves } from 'lucide-react'

export const SurfMarker: React.FC<SurfMarkerProps> = ({
  longitude,
  latitude,
  label = '1',
}) => {
  const dispatch = useAppDispatch()
  const beachKey = `${latitude.toFixed(4)},${longitude.toFixed(4)}`

  const beachData = useAppSelector((state) => state.surf.beaches[beachKey])
  const status = useAppSelector((state) => state.surf.status)

  useEffect(() => {
    dispatch(getBeachConditions({ lat: latitude, lng: longitude }))
  }, [dispatch, latitude, longitude])

  const conditions = useMemo(() => {
    if (!beachData?.data?.hours?.[0]) return null
    const current = beachData.data.hours[0]

    return {
      height: current.waveHeight?.sg || 0,
      water: current.waterTemperature?.sg || 0,
    }
  }, [beachData])

  const isLoading = status === 'loading'

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="center">
      <div className="group relative flex cursor-pointer flex-col items-center">
        {conditions && !isLoading && (
          <div className="absolute -top-6 flex items-center gap-1 rounded-md bg-emerald-500/90 px-1 text-[9px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-sm">
            <Thermometer size={8} />
            {conditions.water.toFixed(1)}°
          </div>
        )}

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white shadow-lg border-[1.5px] border-[#18181a] transition-all group-hover:scale-110 
          ${isLoading ? 'bg-zinc-700 animate-pulse' : 'bg-indigo-500'}`}
        >
          {label}
        </div>

        <div className="absolute top-full mt-1 flex items-center rounded-full bg-indigo-500/90 px-1.5 text-[10px] text-white backdrop-blur-sm border border-white/10 whitespace-nowrap shadow-md">
          <Waves size={10} className="mr-1" />
          <span>{isLoading ? '...' : `${conditions?.height.toFixed(1)}m`}</span>
        </div>
      </div>
    </Marker>
  )
}
