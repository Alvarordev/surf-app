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
  windType: 'ONSHORE' | 'OFFSHORE' | 'SIDESHORE'
  windImpact: string
}

const STATUS_BASE: Record<
  BeachStatus,
  Omit<BeachStatusInfo, 'description' | 'windType' | 'windImpact'>
> = {
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
}): BeachStatusInfo & {
  windType: string
  windImpact: string
  swellEnergy: string
} {
  const {
    waveHeight,
    swellHeight,
    swellPeriod,
    secondarySwellPeriod,
    windSpeed,
    windDirection,
    wavePeriod,
  } = data

  const realHeight = waveHeight * exposure
  const heightStr = realHeight.toFixed(1)

  const isOffshore = windDirection >= 20 && windDirection <= 110
  const isOnshore = windDirection >= 180 && windDirection <= 280

  let windType: 'ONSHORE' | 'OFFSHORE' | 'SIDESHORE' = 'SIDESHORE'
  let windImpact = 'Viento lateral cruzado.'

  if (isOffshore) {
    windType = 'OFFSHORE'
    windImpact = 'Viento de tierra (Offshore), peinando las olas.'
  } else if (isOnshore) {
    windType = 'ONSHORE'
    windImpact =
      windSpeed > 14
        ? 'Viento fuerte del mar (Onshore), picando la cara de la ola.'
        : 'Viento ligero del mar (Onshore), afectando la forma.'
  }

  const bestPeriod = Math.max(
    swellPeriod || 0,
    secondarySwellPeriod || 0,
    wavePeriod || 0,
  )

  const isCleanSwell = (swellHeight || 0) > waveHeight * 0.5
  const swellEnergy =
    bestPeriod >= 12 ? 'Groundswell' : bestPeriod >= 9 ? 'Swell' : 'Windswell'

  if (windSpeed > 25 || realHeight > 3.0) {
    return {
      ...STATUS_BASE[BeachStatus.PELIGROSO],
      windType,
      windImpact,
      swellEnergy,
      description: `¡Alerta! Mar muy agresivo (${heightStr}m) y viento extremo. No apto para la mayoría.`,
    }
  }

  const isPoorQuality =
    (isOnshore && windSpeed >= 12) || bestPeriod < 8 || !isCleanSwell

  if (realHeight >= 0.7 && isPoorQuality) {
    return {
      ...STATUS_BASE[BeachStatus.MOVIDO],
      windType,
      windImpact,
      swellEnergy,
      description: `Condición Poor: Olas de ${heightStr}m con ${windType === 'ONSHORE' ? 'viento del mar' : 'poco orden'}. Mar algo movido.`,
    }
  }

  const windIsFavorable = isOffshore || windSpeed < 10
  const energyIsStrong = realHeight >= 0.8 && bestPeriod >= 11

  if (energyIsStrong && windIsFavorable && isCleanSwell) {
    return {
      ...STATUS_BASE[BeachStatus.OPTIMO],
      windType,
      windImpact,
      swellEnergy,
      description: `¡Excelentes condiciones! ${swellEnergy} peinado de ${heightStr}m con sets de ${bestPeriod.toFixed(0)}s.`,
    }
  }

  const descriptionApto =
    realHeight < 0.6
      ? `Mar tipo piscina (${heightStr}m), ideal para nadar o principiantes.`
      : `Sesión tranquila con olas de ${heightStr}m y viento moderado.`

  return {
    ...STATUS_BASE[BeachStatus.APTO],
    windType,
    windImpact,
    swellEnergy,
    description: descriptionApto,
  }
}

export function getTideInterpretation(currentTide: number, nextTide: number) {
  const TIDE_OFFSET = 0.45
  const realCurrent = (currentTide + TIDE_OFFSET).toFixed(2)
  const isRising = nextTide > currentTide

  return {
    value: parseFloat(realCurrent),
    label: `${realCurrent}m`,
    trend: isRising ? 'Subiendo' : 'Bajando',
    isRising: isRising,
  }
}

export function getWindColor(
  type: 'ONSHORE' | 'OFFSHORE' | 'SIDESHORE',
  speed: number,
) {
  if (type === 'OFFSHORE') return '#22c55e' // Verde
  if (type === 'ONSHORE') return speed > 15 ? '#ef4444' : '#f97316' // Rojo si fuerte, Naranja si suave
  return '#94a3b8' // Gris para sideshore
}
