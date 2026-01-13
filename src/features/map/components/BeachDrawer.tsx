import { useMemo } from 'react'
import { Waves, Wind, Timer, X, Navigation2, Sun } from 'lucide-react'
import type { SurfConditionObject } from '../types/surf'
import {
  getBeachStatus,
  getTideInterpretation,
  getWindColor,
} from '@/utils/beachStatus'
import type { SurfConditionData } from '@/features/surf-details/surfSlice'
import { WavesArrowDown, WavesArrowUp } from '@/assets/icons'
import TideChart from './TideChart'
import { getCardinal } from '@/utils/surfUtils'

interface BeachDrawerProps {
  beach: SurfConditionData & {
    currentConditions: SurfConditionObject | null
    hourlyForecast: SurfConditionObject[]
    dailyForecast: SurfConditionObject[]
  }
  isOpen: boolean
  onClose: () => void
}

export default function BeachDrawer({
  beach,
  isOpen,
  onClose,
}: BeachDrawerProps) {
  const { currentConditions, hourlyForecast, dailyForecast } = beach

  const status = useMemo(() => {
    if (!currentConditions) return null
    return getBeachStatus({ data: currentConditions, exposure: beach.exposure })
  }, [currentConditions, beach.exposure])

  const tideInfo = useMemo(() => {
    if (!currentConditions || hourlyForecast.length < 2) return null
    return getTideInterpretation(
      currentConditions.tideHeight,
      hourlyForecast[1].tideHeight,
    )
  }, [currentConditions, hourlyForecast])

  if (!currentConditions) return null

  console.log('Conditions:', currentConditions)

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl z-50 transition-transform duration-500 ease-out transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } max-h-[92vh] overflow-y-auto shadow-2xl`}
      >
        <div className="sticky top-0 bg-white pt-4 pb-2 px-6 flex justify-between items-center border-b border-slate-50 z-20">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />

          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {beach.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: status?.color }}
                />
                <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {status?.label}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Wind size={12} /> {status?.windType}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                {tideInfo?.isRising ? (
                  <WavesArrowUp size={12} color="#90a1b9" />
                ) : (
                  <WavesArrowDown size={12} color="#90a1b9" />
                )}
                MAREA: {tideInfo?.value.toFixed(1)}
                {'m'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-all active:scale-95"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-linear-to-br from-slate-900 to-slate-800 p-5 rounded-2xl shadow-xl flex flex-col relative overflow-hidden text-white group h-40">
              <div className="flex justify-between items-start z-10 w-full mb-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Olas
                </p>
              </div>

              <div className="flex items-baseline gap-2 z-10 mt-0">
                <span className="text-4xl font-black italic text-white line-clamp-1">
                  {(currentConditions.waveHeight * beach.exposure).toFixed(1)}
                </span>
                <span className="text-xs font-bold opacity-50">METROS</span>
              </div>
              <div className="mt-auto z-10 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Timer size={14} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-400">
                    Periodo:
                  </span>
                  <span className="text-sm font-bold text-white">
                    {currentConditions.wavePeriod.toFixed(1)}s
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-0.5 bg-white/10 rounded-full">
                    <Navigation2
                      size={12}
                      className="text-primary"
                      style={{
                        transform: `rotate(${currentConditions.waveDirection + 180}deg)`,
                      }}
                      fill="currentColor"
                    />
                  </div>
                  <span className="text-slate-400 font-bold text-sm">
                    Direccion:{' '}
                  </span>
                  <span className="text-sm font-bold">
                    {currentConditions.waveDirection.toFixed(0)}°
                  </span>
                  <span className="text-sm font-bold text-white">
                    {getCardinal(currentConditions.waveDirection)}
                  </span>
                </div>
              </div>
              <Waves className="absolute -right-6 -bottom-6 w-28 h-28 text-white/5 group-hover:scale-110 transition-transform duration-700 z-0" />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-1">
                Oleaje
              </p>
              <div className="flex-1 flex flex-col justify-center gap-3">
                <div className="flex items-center justify-between group">
                  <span className="text-[10px] font-bold text-slate-500 uppercase w-6">
                    Pri
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {currentConditions.swellHeight.toFixed(1)}m
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {currentConditions.swellPeriod.toFixed(0)}s
                  </span>
                  <div className="flex items-center gap-1 min-w-12 justify-end">
                    <Navigation2
                      size={12}
                      className="text-primary"
                      style={{
                        transform: `rotate(${currentConditions.swellDirection + 180}deg)`,
                      }}
                      fill="currentColor"
                    />
                    <span className="text-[10px] font-bold text-slate-500">
                      {getCardinal(currentConditions.swellDirection)}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {currentConditions.swellDirection.toFixed(0)}°
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase w-6">
                    Sec
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {currentConditions.secondarySwellHeight.toFixed(1)}m
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {currentConditions.secondarySwellPeriod.toFixed(0)}s
                  </span>
                  <div className="flex items-center gap-1 min-w-12 justify-end">
                    <Navigation2
                      size={12}
                      className="text-slate-400"
                      style={{
                        transform: `rotate(${currentConditions.secondarySwellDirection + 180}deg)`,
                      }}
                      fill="currentColor"
                    />
                    <span className="text-[10px] font-bold text-slate-500">
                      {getCardinal(currentConditions.secondarySwellDirection)}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {currentConditions.secondarySwellDirection}°
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-40">
              <div className="flex justify-between items-start mb-1 h-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Clima
                </p>
                <span
                  className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white uppercase"
                  style={{
                    backgroundColor: getWindColor(
                      status!.windType,
                      currentConditions.windSpeed,
                    ),
                  }}
                >
                  {status?.windType}
                </span>
              </div>
              <div className="flex items-center gap-4 flex-1 px-1">
                <div className="flex flex-col gap-1 min-w-14">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      {currentConditions.windSpeed.toFixed(0)}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      km/h
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation2
                      size={12}
                      className="text-slate-700"
                      style={{
                        transform: `rotate(${currentConditions.windDirection + 180}deg)`,
                      }}
                      fill="currentColor"
                    />
                    <span className="text-xs font-bold text-slate-600">
                      {getCardinal(currentConditions.windDirection)}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {currentConditions.windDirection.toFixed(0)}°
                    </span>
                  </div>
                </div>

                <div className="w-px h-10 bg-slate-100 mx-auto"></div>

                <div className="flex flex-col gap-2 min-w-12">
                  <div className="flex justify-between items-center gap-2">
                    <Sun size={14} className="text-orange-500" />
                    <span className="text-sm font-black text-slate-700">
                      {currentConditions.airTemperature?.toFixed(0) || '--'}°
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <Waves size={14} className="text-blue-500" />
                    <span className="text-sm font-black text-slate-700">
                      {currentConditions.waterTemperature?.toFixed(0) || '--'}°
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-40">
              <div className="flex justify-between items-center mb-1 h-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Marea
                </p>
                <span className="text-xs font-bold text-slate-800">
                  {tideInfo?.label}
                </span>
              </div>

              <div className="flex-1 w-full min-h-0 relative -ml-2 -mb-2">
                <TideChart
                  currentConditions={currentConditions}
                  hourlyForecast={beach.hourlyForecast}
                />
              </div>
            </div>
          </div>

          <section className="bg-slate-900 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Waves size={80} />
            </div>
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />{' '}
              Recomendaciones
            </h4>
            <p className="text-sm font-bold leading-relaxed text-slate-200">
              Condición{' '}
              <span className="text-primary italic uppercase">
                {status?.label}
              </span>
              . Hay olas de{' '}
              <span className="text-white">
                {(currentConditions.waveHeight * beach.exposure).toFixed(1)}m
              </span>{' '}
              con un periodo pico de{' '}
              <span className="text-white">
                {currentConditions.wavePeriod.toFixed(1)}s
              </span>
              .
              {status?.windType === 'OFFSHORE'
                ? ' El viento offshore está peinando las olas perfectamente.'
                : ` El viento ${status?.windType} de ${currentConditions.windSpeed.toFixed(0)} km/h está afectando la formación.`}
              {tideInfo?.trend === 'Bajando'
                ? ' Con la marea bajando, los bancos de arena deberían empezar a definir mejor la pared.'
                : ' La marea subiendo puede hacer que la ola pierda fuerza en algunas secciones.'}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 capitalize italic">
              Proximas horas
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
              {dailyForecast.map((hour, index) => {
                const hourStatus = getBeachStatus({
                  data: hour,
                  exposure: beach.exposure,
                })
                const date = new Date(hour.time)
                const hourStr = date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })

                return (
                  <div
                    key={hour.time}
                    className="min-w-27.5 bg-white border border-slate-100 p-4 rounded-3xl flex flex-col items-center gap-3 shadow-xs hover:border-slate-200 transition-all"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {index === 0 ? 'AHORA' : hourStr}
                    </span>
                    <div className="relative flex flex-col items-center">
                      <p
                        className="text-2xl font-black italic tracking-tighter"
                        style={{ color: hourStatus.color }}
                      >
                        {(hour.waveHeight * beach.exposure).toFixed(1)}
                        <span className="text-[10px] ml-0.5 not-italic opacity-50 font-bold">
                          m
                        </span>
                      </p>
                      <div className="flex items-center gap-1 mt-1 bg-slate-50 px-2 py-0.5 rounded-full">
                        <Timer size={10} className="text-slate-400" />
                        <span className="text-[10px] font-extrabold text-slate-500">
                          {hour?.wavePeriod.toFixed(1)}s
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-50" />

                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="transition-transform duration-500"
                        style={{
                          transform: `rotate(${hour.windDirection}deg)`,
                        }}
                      >
                        <Navigation2
                          size={14}
                          fill="currentColor"
                          style={{
                            color: getWindColor(
                              hourStatus.windType,
                              hour.windSpeed,
                            ),
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-400">
                        {hour.windSpeed.toFixed(0)}{' '}
                        <span className="text-[8px] opacity-70">KM/H</span>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
