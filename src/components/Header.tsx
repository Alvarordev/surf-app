import {
  Search,
  ArrowLeft,
  SlidersHorizontal,
  Map as MapIcon,
  List,
} from 'lucide-react'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const navigate = useNavigate()
  const params = useParams({ strict: false }) as { zoneId?: string }
  const { zoneId } = params
  const search = useSearch({ strict: false }) as { view?: string }
  const isMapView = search.view === 'map'

  return (
    <div className="absolute top-0 left-0 right-0 md:right-auto md:w-102 z-50 pt-2 pb-10 px-0 bg-linear-to-b from-black via-black/80 to-transparent pointer-events-none">
      <div className="p-6 pb-4 space-y-6 pointer-events-auto">
        <div className="flex items-center">
          <button
            onClick={() =>
              zoneId
                ? navigate({
                    to: '/',
                    search: (prev) => ({ ...prev, view: 'list' }) as any,
                  })
                : null
            }
            className={`flex-1 transition-opacity ${zoneId ? 'opacity-100' : 'opacity-20 cursor-default'}`}
          >
            <ArrowLeft size={26} strokeWidth={3} className="text-white" />
          </button>

          <div className="text-center shrink-0">
            <h1 className="text-xl font-black text-white tracking-tight">
              Surfing spots
            </h1>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                PERU / LIMA
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              navigate({
                search: (prev: any) => ({
                  ...prev,
                  view: isMapView ? 'list' : 'map',
                }),
              } as any)
            }}
            className="md:hidden flex-1 flex justify-end"
          >
            {isMapView ? (
              <List size={24} className="text-white" />
            ) : (
              <MapIcon size={24} className="text-white" />
            )}
          </button>
          <div className="hidden md:block w-6" />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          <button className="flex items-center gap-2 bg-[#171719] border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold text-white whitespace-nowrap">
            <SlidersHorizontal size={14} className="text-gray-400" />
            Filters
          </button>
          <div className="flex-1 min-w-35 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={14}
            />
            <input
              type="text"
              placeholder="Name"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#171719] border border-gray-800 rounded-xl py-2 pl-9 pr-4 text-xs font-bold text-white placeholder-gray-500 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
