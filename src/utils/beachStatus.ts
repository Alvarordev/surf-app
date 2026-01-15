import type { SurfConditionObject } from '@/features/map/types/surf'
import { getWindShore } from './surfUtils'

export enum SurfCategory {
  POOR = 'Malo',
  POOR_TO_FAIR = 'Pobre a Regular',
  FAIR = 'Regular',
  GOOD = 'Bueno',
  EXCELLENT = 'Excelente',
}

export const SURF_CATEGORY_BASE: Record<
  SurfCategory,
  { status: SurfCategory; label: string; color: string }
> = {
  [SurfCategory.POOR]: {
    status: SurfCategory.POOR,
    label: 'Malo',
    color: '#ef4444',
  },
  [SurfCategory.POOR_TO_FAIR]: {
    status: SurfCategory.POOR_TO_FAIR,
    label: 'Pobre',
    color: '#f97316',
  },
  [SurfCategory.FAIR]: {
    status: SurfCategory.FAIR,
    label: 'Regular',
    color: '#eab308',
  },
  [SurfCategory.GOOD]: {
    status: SurfCategory.GOOD,
    label: 'Bueno',
    color: '#3b82f6',
  },
  [SurfCategory.EXCELLENT]: {
    status: SurfCategory.EXCELLENT,
    label: 'Excelente',
    color: '#22c55e',
  },
}

export function getBeachConditions({
  data,
  tideIsRising,
}: {
  data: SurfConditionObject
  tideIsRising: boolean
}): {
  status: SurfCategory
  label: string
  color: string
  windType: string
  description: string
} {
  const {
    swellHeight,
    swellPeriod,
    swellDirection,
    secondarySwellHeight,
    secondarySwellDirection,
    windSpeed,
    windDirection,
  } = data

  const DIRECCION_SPOT = 225
  const UMBRAL_VIENTO_FUERTE = 15

  const effectiveWindSpeed = Math.max(windSpeed, 8)

  let score = swellHeight * (swellPeriod / 10)

  const diffAngulo = Math.abs(swellDirection - DIRECCION_SPOT)
  if (diffAngulo < 30) {
    score *= 1.2
  } else if (diffAngulo > 60) {
    score *= 0.7
  }

  if (
    secondarySwellHeight > 0.5 &&
    Math.abs(secondarySwellDirection - swellDirection) > 40
  ) {
    score *= 0.9
  }

  let windMult = 1.0
  if (effectiveWindSpeed <= 9) {
    windMult = 1.2
  } else if (effectiveWindSpeed > UMBRAL_VIENTO_FUERTE) {
    if (windDirection > 200 && windDirection < 270) {
      windMult = 0.5
    } else {
      windMult = 0.8
    }
  }

  const tideMult = tideIsRising ? 1.1 : 0.9

  const finalScore = score * windMult * tideMult
  const windType = getWindShore(windDirection)

  if (finalScore >= 1.4)
    return {
      ...SURF_CATEGORY_BASE[SurfCategory.EXCELLENT],
      windType,
      description: getBeachDescription(
        data,
        tideIsRising,
        SurfCategory.EXCELLENT,
      ),
    }
  if (finalScore >= 1.2)
    return {
      ...SURF_CATEGORY_BASE[SurfCategory.GOOD],
      windType,
      description: getBeachDescription(data, tideIsRising, SurfCategory.GOOD),
    }
  if (finalScore >= 0.9)
    return {
      ...SURF_CATEGORY_BASE[SurfCategory.FAIR],
      windType,
      description: getBeachDescription(data, tideIsRising, SurfCategory.FAIR),
    }
  if (finalScore >= 0.6)
    return {
      ...SURF_CATEGORY_BASE[SurfCategory.POOR_TO_FAIR],
      windType,
      description: getBeachDescription(
        data,
        tideIsRising,
        SurfCategory.POOR_TO_FAIR,
      ),
    }
  return {
    ...SURF_CATEGORY_BASE[SurfCategory.POOR],
    windType,
    description: getBeachDescription(data, tideIsRising, SurfCategory.POOR),
  }
}

const getBeachDescription = (
  data: SurfConditionObject,
  tideIsRising: boolean,
  category: SurfCategory,
): string => {
  const {
    swellHeight,
    swellPeriod,
    secondarySwellHeight,
    secondarySwellDirection,
    swellDirection,
    windSpeed,
    windDirection,
  } = data

  const surfHeight = (swellHeight * (1 + (swellPeriod - 8) * 0.12)).toFixed(1)
  const type = getWindShore(windDirection)

  let energyAnalisys = ''
  if (swellPeriod >= 13) {
    energyAnalisys = `Un groundswell potente de ${swellPeriod.toFixed(1)}s está generando series sólidas con mucha pared.`
  } else if (swellPeriod >= 10) {
    energyAnalisys = `Periodo de ${swellPeriod.toFixed(1)}s ideal para la zona, con olas consistentes de ${surfHeight}m.`
  } else {
    energyAnalisys = `Mar algo débil debido al periodo corto (${swellPeriod.toFixed(1)}s); las olas podrían carecer de recorrido.`
  }

  let interference = ''
  const angleDiff = Math.abs(secondarySwellDirection - swellDirection)
  if (secondarySwellHeight > 0.6 && angleDiff > 35) {
    interference = ` Hay un cruce de mar importante que podría desordenar los sets.`
  }

  let windImpact = ''
  if (type === 'OFFSHORE' && windSpeed < 15) {
    windImpact = `El viento ${type} está peinando las olas, creando condiciones limpias y abiertas.`
  } else if (type === 'ONSHORE') {
    windImpact = `El viento ${type} está "picando" la cara de la ola, lo que dificultará las maniobras.`
  } else {
    windImpact = `Viento ${type} moderado; el mar presenta algo de textura pero se mantiene surfeable.`
  }

  const tideStatus = tideIsRising
    ? 'La marea llenando ayudará a que las secciones no se sequen en la orilla.'
    : 'Con la marea bajando, el mar podría ponerse más rápido pero con riesgo de cerrarse.'

  return `Condición ${category}. ${energyAnalisys}${interference} ${windImpact} ${tideStatus}`
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

export function getWindColor(type: string, speed: number) {
  if (type === 'OFFSHORE') return '#22c55e' // Verde
  if (type === 'ONSHORE') return speed > 15 ? '#ef4444' : '#f97316' // Rojo si fuerte, Naranja si suave
  return '#94a3b8' // Gris para sideshore
}
