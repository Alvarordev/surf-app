import { Search, SlidersHorizontal, Users, Waves } from 'lucide-react'
import BeachCard from './BeachCard'
import { SURF_SPOTS } from '@/features/map/data/spots'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSelectedBeach } from '@/features/surf-details/surfSlice'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const selectedBeachId = useAppSelector((state) => state.surf.selectedBeachId)

  return (
    <aside className="w-100 border-r border-gray-800 bg-background flex flex-col h-full">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search beach name..."
            className="w-full bg-[#232326] border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <button className="flex items-center gap-2 bg-[#232326] text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-gray-700">
            <Waves size={14} />
            Level
          </button>
          <button className="flex items-center gap-2 bg-[#232326] text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-gray-700">
            <Users size={14} />
            Crowd
          </button>
          <button className="flex items-center gap-2 bg-[#232326] text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-gray-700">
            <Waves size={14} />
            Wave Type
          </button>
        </div>
      </div>

      <div className="px-4 py-2">
        <h2 className="text-xl font-bold text-white">Costa Verde</h2>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          La bahía más constante de Lima. Ofrece desde picos escuela hasta
          secciones sólidas y tubulares. Recibe swells del Sur con
          perfección.
        </p>
      </div>

      <div className="px-4 py-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-white">
          Spots <span className="text-gray-500 ml-1">12</span>
        </span>
        <button className="text-xs text-indigo-400 font-medium">
          Sort by: Popular
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {SURF_SPOTS.map((spot) => (
          <BeachCard
            key={spot.id}
            label={spot.label}
            name={spot.name}
            rating={spot.rating}
            crowd={spot.crowd}
            image={spot.image}
            isSelected={spot.id === selectedBeachId}
            onClick={() => dispatch(setSelectedBeach(spot.id))}
          />
        ))}
      </div>
    </aside>
  )
}
