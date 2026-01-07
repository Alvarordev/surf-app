import { useEffect, useState } from 'react'
import { SURF_SPOTS, type SurfSpot } from '../data/spots'
import {
  Bookmark,
  Thermometer,
  Waves,
  Wind,
  Timer,
  Droplets,
} from 'lucide-react'
import { WavesIcon } from '@/assets/WavesIcon'

export default function BeachDetails({
  beachId,
  currentConditions,
}: {
  beachId: string
  currentConditions: any
}) {
  const [beachData, setBeachData] = useState<SurfSpot | null>(null)

  useEffect(() => {
    const data = SURF_SPOTS.find((spot) => spot.id === beachId)
    if (data) {
      setBeachData(data)
    }
  }, [beachId])

  if (!beachData) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full pt-16 pb-12 px-6 bg-linear-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pointer-events-none">
      <div className="w-full max-w-[50%] bg-white rounded-2xl p-4 shadow-2xl flex gap-5 relative pointer-events-auto">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full" />

        <div className="relative w-24 h-24 shrink-0 self-center">
          <img
            src={beachData.image}
            alt={beachData.name}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute -bottom-1 translate-y-0.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="flex h-7 w-7.5 border-2 border-background rounded-lg font-bold items-center justify-center bg-primary shadow-md text-sm text-foreground">
              {beachData.label}
            </div>
            <div className="absolute top-5 h-7 w-8">
              <WavesIcon color="#626eec" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-center w-full mb-2">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {beachData.name}
            </h2>
            <Bookmark className="h-4 w-4 text-slate-300 cursor-pointer hover:text-primary transition-colors" />
          </div>

          <div className="flex justify-between items-center px-1">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Waves size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Altura
                </span>
              </div>
              <p className="text-sm font-black text-slate-800">
                {currentConditions ? `${(currentConditions.waveHeight.sg * beachData.exposure).toFixed(2)}m` : '...'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Timer size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Periodo
                </span>
              </div>
              <p className="text-sm font-black text-slate-800">
                {currentConditions ? `${currentConditions.wavePeriod.sg}s` : '...'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Wind size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Viento
                </span>
              </div>
              <p className="text-sm font-black text-slate-800">
                {currentConditions ? `${(currentConditions.windSpeed.sg * 3.6).toFixed(1)} km/h` : '...'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Thermometer size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Temp
                </span>
              </div>
              <p className="text-sm font-black text-slate-800">
                {currentConditions ? `${currentConditions.waterTemperature.sg}°` : '...'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Droplets size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Humedad
                </span>
              </div>
              <p className="text-sm font-black text-slate-800">
                {currentConditions ? `${currentConditions.humidity.sg}%` : '...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
