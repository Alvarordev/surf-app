import { useRef, useState, useMemo, useEffect } from 'react'
import { startOfHour } from 'date-fns'
import type { MapRef } from 'react-map-gl/mapbox'
import { useParams } from '@tanstack/react-router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  getConditionsByZone,
  selectSpotsWithStatus,
} from '@/features/surf-details/surfSlice'
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

  const params = useParams({ strict: false }) as {
    zoneId?: string
    spotId?: string
  }
  const { zoneId: currentZoneIdParam, spotId: selectedBeachId } = params

  const dispatch = useAppDispatch()
  const zones = useAppSelector((state) => state.surf.zones)

  const currentZoneId = useMemo(() => {
    if (currentZoneIdParam) return currentZoneIdParam
    const spot = SURF_SPOTS.find((s) => s.id === selectedBeachId)
    return spot ? spot.zoneId : 'costa-verde'
  }, [selectedBeachId, currentZoneIdParam])

  const spotsStatus = useAppSelector(selectSpotsWithStatus)

  const selectedBeach = useMemo(() => {
    if (!selectedBeachId) return null

    const spot = zones?.[currentZoneId]?.spots?.[selectedBeachId]
    if (!spot) return null

    const hours = spot.conditions.hours
    const currentHour = startOfHour(new Date())

    const forecast: SurfConditionObject[] = []
    for (let i = 0; i < 24; i++) {
      const targetHour = new Date(currentHour)
      targetHour.setHours(targetHour.getHours() + i)
      const iso = targetHour.toISOString()
      if (hours[iso]) {
        forecast.push(hours[iso])
      }
    }

    const { condition, status } = spotsStatus[selectedBeachId] || {}

    const dailyForecast = Object.values(hours).sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
    )

    return {
      ...spot,
      currentConditions: condition || null,
      status: status || null,
      hourlyForecast: forecast,
      dailyForecast,
    }
  }, [zones, selectedBeachId, currentZoneId, spotsStatus])

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
