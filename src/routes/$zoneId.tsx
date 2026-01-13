import { createFileRoute } from '@tanstack/react-router'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'
import { getConditionsByZone } from '@/features/surf-details/surfSlice'

export const Route = createFileRoute('/$zoneId')({
  component: ZoneRoute,
})

function ZoneRoute() {
  const { zoneId } = Route.useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (zoneId) {
      dispatch(getConditionsByZone({ zoneId }))
    }
  }, [dispatch, zoneId])

  return null
}
