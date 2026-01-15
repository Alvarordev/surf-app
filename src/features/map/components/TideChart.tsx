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
  const { tideData, currentHourLabel } = useMemo(() => {
    const now = new Date()
    const currentHour = now.getHours()

    // Periodos fijos: 12 AM - 11 AM (0-11) y 12 PM - 11 PM (12-23)
    const isFirstPeriod = currentHour < 12
    const startHour = isFirstPeriod ? 0 : 12
    const endHour = isFirstPeriod ? 11 : 23

    const displayData = hourlyForecast
      .filter((h) => {
        const hDate = new Date(h.time)
        const hour = hDate.getHours()
        // Aseguramos que sea del día de hoy local
        const isToday = hDate.toDateString() === now.toDateString()
        return isToday && hour >= startHour && hour <= endHour
      })
      .map((h) => ({
        time: new Date(h.time).toLocaleTimeString([], {
          hour: '2-digit',
          hour12: true,
        }),
        height: parseFloat((h.tideHeight + 0.45).toFixed(2)),
      }))

    const referenceNow = new Date(now)
    referenceNow.setMinutes(0, 0, 0)

    const currentLabel = referenceNow.toLocaleTimeString([], {
      hour: '2-digit',
      hour12: true,
    })

    return { tideData: displayData, currentHourLabel: currentLabel }
  }, [hourlyForecast])

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
            tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8' }}
            interval={1}
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
            labelStyle={{ color: '#64748b', fontSize: '14px' }}
            formatter={(value: any, name: any) => {
              if (name === 'height') {
                return [`${value} m`]
              }
            }}
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
            stroke="#060606"
            strokeDasharray="8 4"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
