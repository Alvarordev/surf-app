import { useRef, useState, useMemo, useEffect } from 'react'
import { startOfHour, subHours } from 'date-fns'
import type { MapRef } from 'react-map-gl/mapbox'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getConditionsByZone } from '@/features/surf-details/surfSlice'
import { SURF_SPOTS } from '../data/spots'
import type { SurfConditionObject } from '../types/surf'

const LIMA_INITIAL_VIEW = {
  longitude: -77.035,
  latitude: -12.146698164476819,
  zoom: 13.3,
}

export const useMapController = () => {
  const mapRef = useRef<MapRef>(null)
  const [viewState, setViewState] = useState(LIMA_INITIAL_VIEW)

  const dispatch = useAppDispatch()
  const selectedBeachId = useAppSelector((state) => state.surf.selectedBeachId)
  const zones = useAppSelector((state) => state.surf.zones)

  const currentZoneId = useMemo(() => {
    const spot = SURF_SPOTS.find((s) => s.id === selectedBeachId)
    return spot ? spot.zoneId : 'costa-verde'
  }, [selectedBeachId])

  const selectedBeach = useMemo(() => {
    if (!selectedBeachId) return null

    const spot = zones?.[currentZoneId]?.spots?.[selectedBeachId]
    if (!spot) return null

    const hours = spot.conditions.hours
    const currentHour = startOfHour(subHours(new Date(), 5))
    const currentHourISO = currentHour.toISOString()

    const forecast: SurfConditionObject[] = []
    for (let i = 0; i < 24; i++) {
      const targetHour = new Date(currentHour)
      targetHour.setHours(targetHour.getHours() + i)
      const iso = targetHour.toISOString()
      if (hours[iso]) {
        forecast.push(hours[iso])
      }
    }

    return {
      ...spot,
      currentConditions: hours[currentHourISO] || null,
      hourlyForecast: forecast,
    }
  }, [zones, selectedBeachId, currentZoneId])

  console.log('Costa verde:', zones?.[currentZoneId]?.spots)

  useEffect(() => {
    dispatch(
      getConditionsByZone({
        zoneId: currentZoneId,
      }),
    )
  }, [dispatch, currentZoneId])

  useEffect(() => {
    if (selectedBeachId && mapRef.current) {
      const spot = SURF_SPOTS.find((s) => s.id === selectedBeachId)
      if (spot) {
        mapRef.current.flyTo({
          center: [spot.lng, spot.lat],
          zoom: 16,
          duration: 1500,
          essential: true,
        })
      }
    }
  }, [selectedBeachId])

  return {
    mapRef,
    viewState,
    setViewState,
    selectedBeach,
    spots: SURF_SPOTS,
  }
}
