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
  const { 
    waveHeight, swellHeight, swellPeriod, 
    secondarySwellPeriod, windSpeed, windDirection, wavePeriod 
  } = data

  // 1. Altura real ajustada por exposición
  const realHeight = waveHeight * exposure
  const heightStr = realHeight.toFixed(1)

  // 2. Clasificación del Viento (Crítico para Lima)
  const isOffshore = windDirection >= 20 && windDirection <= 110;
  const isOnshore = windDirection >= 190 && windDirection <= 280; // Viento del mar
  
  // 3. Energía real (Periodo dominante)
  const bestPeriod = Math.max(swellPeriod || 0, secondarySwellPeriod || 0, wavePeriod || 0);

  // --- LÓGICA DE DECISIÓN (Orden de prioridad) ---

  // A. PELIGROSO: Viento muy fuerte o olas masivas
  if (windSpeed > 22 || realHeight > 2.8) {
    return {
      ...STATUS_BASE[BeachStatus.PELIGROSO],
      description: `Alerta: Mar muy picado (${windSpeed.toFixed(0)} km/h) y olas de ${heightStr}m.`,
    };
  }

  // B. OPTIMO (Verde): Solo si el viento ayuda o es casi imperceptible
  // Si es Onshore > 10km/h, YA NO ES OPTIMO.
  const windIsGood = isOffshore || windSpeed < 10;
  const hasGoodEnergy = realHeight >= 0.8 && bestPeriod >= 10 && (swellHeight || 0) > 0.5;

  if (hasGoodEnergy && windIsGood) {
    return {
      ...STATUS_BASE[BeachStatus.OPTIMO],
      description: `¡Excelentes condiciones! Olas peinadas de ${heightStr}m con periodo de ${bestPeriod.toFixed(0)}s.`,
    };
  }

  // C. MOVIDO (Naranja): Cuando hay olas pero el viento las malogra (Tu caso actual)
  // Si hay altura pero el viento es Onshore moderado, el mar está "sancochado"
  if (realHeight >= 0.7 && isOnshore && windSpeed >= 10) {
    return {
      ...STATUS_BASE[BeachStatus.MOVIDO],
      description: `Mar movido por viento onshore de ${windSpeed.toFixed(0)} km/h. Olas con mucha espuma.`,
    };
  }

  // D. APTO (Azul): Mar tranquilo o olas chicas para aprender
  const descriptionApto = realHeight < 0.6 
    ? `Mar tipo piscina (${heightStr}m), excelente para nadar o remar.`
    : `Olas pequeñas de ${heightStr}m, condiciones aceptables para principiantes.`;

  return {
    ...STATUS_BASE[BeachStatus.APTO],
    description: descriptionApto,
  };
}