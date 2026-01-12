import {
  Thermometer,
  Waves,
  Wind,
  Timer,
  Droplets,
  Navigation as Compass,
  ChevronUp,
  X,
} from 'lucide-react'
import type { SurfConditionObject } from '../types/surf'
import { type BeachStatusInfo } from '@/utils/beachStatus'
import type { SurfConditionData } from '@/features/surf-details/surfSlice'

interface BeachDrawerProps {
  beach: SurfConditionData & {
    currentConditions: SurfConditionObject | null
    status: BeachStatusInfo | null
    hourlyForecast: SurfConditionObject[]
  }
  isOpen: boolean
  onClose: () => void
}

export default function BeachDrawer({
  beach,
  isOpen,
  onClose,
}: BeachDrawerProps) {
  const { currentConditions, hourlyForecast, status } = beach

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
        } max-h-[90vh] overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white pt-4 pb-2 px-6 flex justify-between items-center border-b border-slate-50 z-10">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2" />
          <div>
            <h2 className="text-2xl font-black text-slate-800">{beach.name}</h2>
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: status?.color }}
              />
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {status?.label || 'Cargando...'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center justify-center gap-2">
              <Waves size={32} className="text-primary mb-1" />
              <div className="text-center">
                <p className="text-3xl font-black text-slate-800">
                  {currentConditions
                    ? (currentConditions.waveHeight * beach.exposure).toFixed(1)
                    : '--'}
                  <span className="text-lg ml-0.5">m</span>
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Altura de Ola
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center justify-center gap-2">
              <Timer size={32} className="text-primary mb-1" />
              <div className="text-center">
                <p className="text-3xl font-black text-slate-800">
                  {currentConditions?.wavePeriod?.toFixed(1) ?? '--'}
                  <span className="text-lg ml-0.5">s</span>
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Periodo
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-black text-slate-800 px-1">
              Condiciones Detalladas
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Wind size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Viento
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-slate-800">
                      {currentConditions?.windSpeed.toFixed(1)} km/h
                    </p>
                    <div
                      className="transition-transform duration-700"
                      style={{
                        transform: `rotate(${currentConditions?.windDirection ?? 0}deg)`,
                      }}
                    >
                      <ChevronUp size={16} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Compass size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Swell
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-slate-800">
                      {currentConditions?.waveDirection ?? 0}°
                    </p>
                    <div
                      className="transition-transform duration-700"
                      style={{
                        transform: `rotate(${currentConditions?.waveDirection ?? 0}deg)`,
                      }}
                    >
                      <ChevronUp size={16} className="text-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Thermometer size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Agua
                  </p>
                  <p className="font-black text-slate-800">
                    {currentConditions?.waterTemperature.toFixed(1)}°C
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
                <div className="p-3 bg-cyan-50 rounded-xl">
                  <Droplets size={20} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Humedad
                  </p>
                  <p className="font-black text-slate-800">
                    {currentConditions?.humidity}%
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 text-white p-6 rounded-4xl space-y-2">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Estado Actual
            </h4>
            <p className="text-lg font-bold">
              {status?.description || 'Cargando información del spot...'}
            </p>
            <p className="text-xs text-slate-400 italic">
              * Datos basados en el pronóstico de OpenMeteo para las coordenadas
              del spot.
            </p>
          </section>

          {hourlyForecast && hourlyForecast.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 px-1">
                Próximas Horas
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-1">
                {hourlyForecast.map((hour, index) => {
                  const date = new Date(hour.time)
                  const hourStr = date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })

                  return (
                    <div
                      key={hour.time}
                      className="min-w-24 bg-white border border-slate-100 p-4 rounded-3xl flex flex-col items-center gap-2 shadow-xs"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {index === 0 ? 'Ahora' : hourStr}
                      </span>
                      <div className="relative">
                        <p className="text-lg font-black text-slate-800">
                          {(hour.waveHeight * beach.exposure).toFixed(1)}
                          <span className="text-[10px] ml-0.5">m</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer size={10} className="text-primary" />
                        <span className="text-[10px] font-bold text-slate-500">
                          {hour.wavePeriod.toFixed(1)}s
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div
                          className="transition-transform duration-500"
                          style={{
                            transform: `rotate(${hour.windDirection}deg)`,
                          }}
                        >
                          <ChevronUp size={12} className="text-blue-400" />
                        </div>
                        <span className="text-[8px] font-black text-slate-400">
                          {hour.windSpeed.toFixed(0)} km/h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          <div className="h-10" />
        </div>
      </div>
    </>
  )
}
