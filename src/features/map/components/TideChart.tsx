import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { SurfConditionObject } from '../types/surf'

interface TideChartProps {
  currentConditions: SurfConditionObject | null
  hourlyForecast: SurfConditionObject[]
}

export default function TideChart({ hourlyForecast }: TideChartProps) {
  const tideData = useMemo(() => {
    return hourlyForecast.map((h) => ({
      time: new Date(h.time).toLocaleTimeString([], {
        hour: '2-digit',
      }),
      height: parseFloat((h.tideHeight + 0.45).toFixed(2)),
    }))
  }, [hourlyForecast])

  const currentHourLabel = useMemo(() => {
    const now = new Date()
    now.setMinutes(0, 0, 0)
    return now.toLocaleTimeString([], {
      hour: '2-digit',
    })
  }, [])

  if (!tideData || !tideData.length) return null

  return (
    <div className="h-full w-full bg-transparent rounded-4xl p-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={tideData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              fontWeight: 'bold',
            }}
            labelStyle={{ color: '#64748b' }}
          />
          <Area
            type="monotone"
            dataKey="height"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#tideGradient)"
          />
          <ReferenceLine
            x={currentHourLabel}
            stroke="#ef4444"
            strokeDasharray="3 3"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <p className="text-[9px] text-center text-slate-400 font-bold mt-2 uppercase tracking-tight">
        * Datos MSL con offset local (+0.45m). No apto para navegación.
      </p> */}
    </div>
  )
}
