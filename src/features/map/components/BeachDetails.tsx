import { useState } from 'react'
import {
  Bookmark,
  Waves,
  Wind,
  Timer,
  ChevronUp,
  type LucideIcon,
  Shell
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
}

const MetricItem = ({
  icon: Icon,
  label,
  value,
  unit = '',
  loading,
  subValue,
}: MetricItemProps) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-1.5">
      <Icon size={14} className="text-primary" />
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
  }
}

export default function BeachDetails({ beach }: BeachDetailsProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { currentConditions, status } = beach

  const isLoading = !currentConditions

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 w-full pt-16 pb-12 px-6 bg-linear-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pointer-events-none z-40">
        <div
          onClick={() => setIsDrawerOpen(true)}
          className="w-full max-w-150 bg-white rounded-2xl px-4 pb-4 shadow-2xl flex flex-col relative pointer-events-auto cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="flex w-full items-center justify-center gap-2 text-xs pt-2 font-semibold text-slate-400">
            <ChevronUp size={12} className="text-primary" />
            <p>Más Detalles</p>
            <ChevronUp size={12} className="text-primary" />
          </div>

          <div className="flex gap-5 relative">
            <div className="relative w-24 h-24 shrink-0 self-center">
              <img
                src={beach.image}
                alt={beach.name}
                className="w-full h-full object-cover rounded-xl shadow-sm"
              />
              <div className="absolute -bottom-1 translate-y-0.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div
                  className="flex h-7 w-7.5 border-2 border-white rounded-lg font-bold items-center justify-center shadow-md text-sm text-white"
                  style={{ backgroundColor: status?.color || '#626eec' }}
                >
                  {beach.label}
                </div>
                <div className="absolute top-5 h-7 w-8 drop-shadow-md">
                  <WavesIcon color={status?.color || '#626eec'} />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-none">
                    {beach.name}
                  </h2>
                  {status && (
                    <p
                      className="text-[10px] font-bold uppercase mt-1"
                      style={{ color: status.color }}
                    >
                      {status.label}
                    </p>
                  )}
                </div>
                <Bookmark className="h-5 w-5 text-slate-300 cursor-pointer hover:text-primary transition-colors" />
              </div>

              <div className="flex justify-between items-center px-1 mt-2">
                <MetricItem
                  icon={Waves}
                  label="Olas"
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
                />

                <MetricItem
                  icon={Wind}
                  label="Viento"
                  value={currentConditions?.windSpeed?.toFixed(1) ?? ''}
                  unit=" km/h"
                  loading={isLoading}
                />

                <MetricItem
                  icon={Shell}
                  label="Swell"
                  value={currentConditions?.swellHeight?.toFixed(1) ?? ''}
                  unit=" m"
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
