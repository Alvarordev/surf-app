import type { SurfConditionObject } from '@/features/map/types/surf'

export enum BeachStatus {
  OPTIMO = 'green',
  APTO = 'blue',
  MOVIDO = 'orange',
  PELIGROSO = 'red',
}

export interface BeachStatusInfo {
  status: BeachStatus
  label: string
  color: string
  description: string
}

const STATUS_BASE: Record<BeachStatus, Omit<BeachStatusInfo, 'description'>> = {
  [BeachStatus.OPTIMO]: {
    status: BeachStatus.OPTIMO,
    label: 'Excelente',
    color: '#22c55e',
  },
  [BeachStatus.APTO]: {
    status: BeachStatus.APTO,
    label: 'Apto',
    color: '#3b82f6',
  },
  [BeachStatus.MOVIDO]: {
    status: BeachStatus.MOVIDO,
    label: 'Movido',
    color: '#f97316',
  },
  [BeachStatus.PELIGROSO]: {
    status: BeachStatus.PELIGROSO,
    label: 'Peligroso',
    color: '#ef4444',
  },
}

export function getBeachStatus({
  data,
  exposure,
}: {
  data: SurfConditionObject
  exposure: number
}): BeachStatusInfo {
  let { waveHeight } = data
  const { windSpeed, windDirection, wavePeriod } = data

  waveHeight *= exposure
  const heightStr = waveHeight.toFixed(1)
  const isOffshore = windDirection >= 20 && windDirection <= 110
  const windType = isOffshore ? 'offshore' : 'onshore'

  // 1. PELIGROSO
  if (windSpeed > 25 || (windSpeed > 18 && !isOffshore && waveHeight > 2.5)) {
    return {
      ...STATUS_BASE[BeachStatus.PELIGROSO],
      description: `Alerta por viento extremo (${windSpeed} km/h) y olas de ${heightStr}m. Riesgo alto.`,
    }
  }

  // 2. MOVIDO (Rough/Choppy)
  if (windSpeed > 17 || wavePeriod < 7) {
    return {
      ...STATUS_BASE[BeachStatus.MOVIDO],
      description: `Mar picado con viento ${windType} de ${windSpeed} km/h y periodo corto de ${wavePeriod}s.`,
    }
  }

  // 3. OPTIMO (Condiciones Pro)
  if (waveHeight >= 0.7 && wavePeriod >= 9 && (isOffshore || windSpeed <= 12)) {
    return {
      ...STATUS_BASE[BeachStatus.OPTIMO],
      description: `¡Excelentes condiciones! Olas de ${heightStr}m con buen periodo (${wavePeriod.toFixed(1)}s) y viento ${isOffshore ? 'favorable' : 'suave'}.`,
    }
  }

  // 4. APTO (Tranquilo o Olas pequeñas)
  const reason = waveHeight < 0.6 
    ? `Mar muy tranquilo con olas de ${heightStr}m, ideal para principiantes o nadar.`
    : `Condiciones aceptables con olas de ${heightStr}m y viento moderado.`
    
  return {
    ...STATUS_BASE[BeachStatus.APTO],
    description: reason,
  }
}