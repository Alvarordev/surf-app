import { useState } from 'react'
import {
  Bookmark,
  Waves,
  Wind,
  Timer,
  ChevronUp,
  type LucideIcon,
  Shell,
} from 'lucide-react'
import { WavesIcon } from '@/assets/WavesIcon'
import type { SurfConditionObject } from '../types/surf'
import { type BeachStatusInfo } from '@/utils/beachStatus'
import type { SurfConditionData } from '@/features/surf-details/surfSlice'
import BeachDrawer from './BeachDrawer'

interface MetricItemProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  loading?: boolean
  subValue?: string
  color?: string
}

const MetricItem = ({
  icon: Icon,
  label,
  value,
  unit = '',
  loading,
  subValue,
  color,
}: MetricItemProps) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-1.5">
      <Icon size={14} style={{ color: color || '#3b82f6' }} />
      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </span>
    </div>
    <div className="text-center">
      <p className="text-sm font-black text-slate-800">
        {loading ? (
          <span className="animate-pulse bg-slate-200 h-4 w-10 block rounded" />
        ) : (
          `${value}${unit}`
        )}
      </p>
      {subValue && !loading && (
        <p className="text-[10px] text-slate-400 font-medium">{subValue}</p>
      )}
    </div>
  </div>
)

interface BeachDetailsProps {
  beach: SurfConditionData & {
    currentConditions: SurfConditionObject | null
    status: BeachStatusInfo | null
    hourlyForecast: SurfConditionObject[]
    dailyForecast: SurfConditionObject[]
  }
}

export default function BeachDetails({ beach }: BeachDetailsProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { currentConditions } = beach

  const isLoading = !currentConditions

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 w-full pt-4 pb-4 px-3 md:pt-16 md:pb-12 md:px-6 bg-linear-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pointer-events-none z-40">
        <div
          onClick={() => setIsDrawerOpen(true)}
          className="w-full max-w-150 bg-white rounded-3xl p-3 md:px-4 md:pb-4 shadow-2xl flex flex-col relative pointer-events-auto cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex w-full items-center justify-center gap-2 text-[10px] pt-1 md:pt-3 font-black text-slate-300 uppercase tracking-widest group-hover:text-primary transition-colors">
            <ChevronUp size={12} className="group-hover:animate-bounce" />
            <span>ver más detalles</span>
            <ChevronUp size={12} className="group-hover:animate-bounce" />
          </div>

          <div className="flex gap-3 md:gap-5 relative mt-2">
            <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 self-center">
              <img
                src={beach.image}
                alt={beach.name}
                className="w-full h-full object-cover rounded-2xl shadow-sm border border-slate-100"
              />
              <div className="absolute -bottom-1 translate-y-0.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div
                  className="flex h-7 w-7.5 border-2 border-white rounded-lg font-black items-center justify-center shadow-md text-sm text-white"
                  style={{ backgroundColor: beach.status?.color || '#626eec' }}
                >
                  {beach.label}
                </div>
                <div className="absolute top-5 h-7 w-8 drop-shadow-md">
                  <WavesIcon color={beach.status?.color || '#626eec'} />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tighter leading-none">
                    {beach.name}
                  </h2>
                </div>
                <Bookmark className="h-5 w-5 text-slate-200 cursor-pointer hover:text-primary transition-colors" />
              </div>

              <div className="flex justify-between md:justify-between items-center px-1 bg-slate-50/50 py-2 md:py-3 rounded-2xl border border-slate-50">
                <MetricItem
                  icon={Waves}
                  label="Altura"
                  value={
                    currentConditions
                      ? (currentConditions.waveHeight * beach.exposure).toFixed(
                          1,
                        )
                      : ''
                  }
                  unit="m"
                  loading={isLoading}
                />

                <MetricItem
                  icon={Timer}
                  label="Periodo"
                  value={currentConditions?.wavePeriod?.toFixed(1) ?? ''}
                  unit="s"
                  loading={isLoading}
                />2

                <MetricItem
                  icon={Wind}
                  label="Viento"
                  value={currentConditions?.windSpeed?.toFixed(0) ?? ''}
                  unit=" km/h"
                  loading={isLoading}
                />

                <MetricItem
                  icon={Shell}
                  label="Swell"
                  value={currentConditions?.swellHeight?.toFixed(1) ?? ''}
                  unit="m"
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BeachDrawer
        beach={beach}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
