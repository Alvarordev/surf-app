import { Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import BeachCard from './BeachCard'
import { SURF_SPOTS } from '@/features/map/data/spots'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setSelectedBeach,
  selectSpotsWithStatus,
} from '@/features/surf-details/surfSlice'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const selectedBeachId = useAppSelector((state) => state.surf.selectedBeachId)
  const spotsStatus = useAppSelector(selectSpotsWithStatus)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSpots = useMemo(() => {
    return SURF_SPOTS.filter((spot) =>
      spot.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return (
    <aside className="w-full md:w-96 border-r border-gray-800 bg-background flex flex-col h-full">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search beach name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#232326] border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="px-4 py-2">
        <h2 className="text-xl font-bold text-white">Costa Verde</h2>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          La bahía más constante de Lima. Ofrece desde picos escuela hasta
          secciones sólidas y tubulares. Recibe swells del Sur con perfección.
        </p>
      </div>

      <div className="px-4 py-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-white">
          Spots{' '}
          <span className="text-gray-500 ml-1">{filteredSpots.length}</span>
        </span>
        <button className="text-xs text-indigo-400 font-medium">
          Sort by: Popular
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {filteredSpots.map((spot) => (
          <BeachCard
            key={spot.id}
            label={spot.label}
            name={spot.name}
            difficulty={spot.difficulty}
            image={spot.image}
            isSelected={spot.id === selectedBeachId}
            status={spotsStatus[spot.id]?.status}
            onClick={() => dispatch(setSelectedBeach(spot.id))}
          />
        ))}
        {filteredSpots.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No se encontraron playas que coincidan con "{searchTerm}"
          </p>
        )}
      </div>
    </aside>
  )
}
