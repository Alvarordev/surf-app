import { Search, SlidersHorizontal, Users, Waves } from 'lucide-react'
import BeachCard from './BeachCard'

const BEACH_SPOTS = [
  {
    id: 1,
    name: 'Makaha Beach',
    distance: '0.8 km',
    quality: 4,
    crowd: 'Low',
    crowdColor: 'text-green-400',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Waikiki',
    distance: '1.2 km',
    quality: 3,
    crowd: 'Med',
    crowdColor: 'text-yellow-400',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'La Pampilla',
    distance: '2.4 km',
    quality: 5,
    crowd: 'High',
    crowdColor: 'text-red-400',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Redondo',
    distance: '3.1 km',
    quality: 3,
    crowd: 'Low',
    crowdColor: 'text-green-400',
    image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&h=300&fit=crop',
  },
]

export default function Sidebar() {
  return (
    <aside className="w-[35%] border-r border-gray-800 bg-[#18181a] flex flex-col h-full">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search beach name..."
            className="w-full bg-[#232326] border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
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
          Usually consistent waves. Good for all levels depending on the specific break.
        </p>
      </div>

      <div className="px-4 py-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-white">Spots <span className="text-gray-500 ml-1">12</span></span>
        <button className="text-xs text-indigo-400 font-medium">Sort by: Popular</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {BEACH_SPOTS.map((spot) => (
          <BeachCard key={spot.id} {...spot} isSelected={spot.id === 1} />
        ))}
      </div>
    </aside>
  )
}
