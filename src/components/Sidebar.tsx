import { useMemo } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import BeachCard from './BeachCard'
import ZoneCard from './ZoneCard'
import { SURF_SPOTS } from '@/features/map/data/spots'
import { SURF_ZONES } from '@/features/map/data/zones'
import { useAppSelector } from '@/store/hooks'
import { selectSpotsWithStatus } from '@/features/surf-details/surfSlice'

interface SidebarProps {
  searchTerm: string
}

export default function Sidebar({ searchTerm }: SidebarProps) {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as {
    zoneId?: string
    spotId?: string
  }
  const { zoneId, spotId } = params

  const spotsStatus = useAppSelector(selectSpotsWithStatus)

  const activeZone = useMemo(() => {
    return zoneId ? SURF_ZONES[zoneId] : null
  }, [zoneId])

  const filteredSpots = useMemo(() => {
    let spots = SURF_SPOTS
    if (zoneId) {
      spots = spots.filter((spot) => spot.zoneId === zoneId)
    }
    return spots.filter((spot) =>
      spot.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, zoneId])

  const zonesList = useMemo(() => {
    return Object.values(SURF_ZONES).map((zone) => {
      const count = SURF_SPOTS.filter((s) => s.zoneId === zone.id).length
      return { ...zone, spotCount: count }
    })
  }, [])

  return (
    <aside className="w-full md:w-102 border-r border-gray-800 bg-background flex flex-col h-full overflow-hidden relative">
      <div className="flex-1 flex flex-col h-full pt-44 pb-6 overflow-hidden">
        {!zoneId ? (
          <>
            <div className="px-6 flex items-baseline gap-4 mb-4 shrink-0">
              <div className="flex items-baseline gap-2">
                <h2 className="text-base font-semibold text-white tracking-tight">
                  Zonas
                </h2>
                <span className="text-base font-semibold text-white">
                  {zonesList.length}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-base font-semibold text-gray-700 tracking-tight">
                  Spots
                </h2>
                <span className="text-base font-semibold text-gray-700">
                  {SURF_SPOTS.length}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-4 no-scrollbar">
              {zonesList.map((zone) => (
                <ZoneCard
                  key={zone.id}
                  name={zone.name}
                  image={zone.image}
                  spotCount={zone.spotCount}
                  onClick={() =>
                    navigate({ to: '/$zoneId', params: { zoneId: zone.id } })
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="px-6 py-2 space-y-2 shrink-0">
              <h2 className="text-xl font-bold text-white italic tracking-tighter">
                {activeZone?.name}
              </h2>
              <p className="text-[11px] text-gray-500 font-bold leading-relaxed tracking-wide">
                {activeZone?.description}
              </p>
            </div>

            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-900 mx-6 shrink-0">
              <span className="text-xs font-black text-white uppercase tracking-widest">
                Spots{' '}
                <span className="text-primary ml-2">
                  {filteredSpots.length}
                </span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-4 space-y-3 no-scrollbar">
              {filteredSpots.map((spot) => (
                <BeachCard
                  key={spot.id}
                  label={spot.label}
                  name={spot.name}
                  difficulty={spot.difficulty}
                  image={spot.image}
                  isSelected={spot.id === spotId}
                  status={spotsStatus[spot.id]?.status}
                  onClick={() => {
                    if (spotId === spot.id) {
                      navigate({
                        to: '/$zoneId',
                        params: { zoneId: zoneId! },
                        search: (prev: any) => ({ ...prev, view: 'list' }),
                      } as any)
                    } else {
                      navigate({
                        to: '/$zoneId/$spotId',
                        params: { zoneId: zoneId!, spotId: spot.id },
                        search: (prev: any) => ({ ...prev, view: 'map' }),
                      } as any)
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
