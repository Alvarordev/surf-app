import { Star } from 'lucide-react'

interface BeachCardProps {
  id: number
  name: string
  distance: string
  quality: number
  crowd: string
  crowdColor: string
  image: string
  isSelected?: boolean
}

export default function BeachCard({
  id,
  name,
  distance,
  quality,
  crowd,
  crowdColor,
  image,
  isSelected,
}: BeachCardProps) {
  return (
    <div
      className={`flex gap-3 p-2 rounded-xl bg-[#1c1c1f] border-[1.5px] ${
        isSelected ? 'border-indigo-500' : 'border-gray-800'
      } hover:border-gray-700 transition-all cursor-pointer group`}
    >
      <div className="relative w-24 h-24">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-1 left-1 bg-indigo-500 text-xs font-bold px-1.5 py-0.5 rounded text-white">
          #{id}
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 py-0.5">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
            {name}
          </h3>
          <span className="text-[10px] text-gray-500 font-medium">
            {distance}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
              Quality
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    i < quality
                      ? 'fill-indigo-500 text-indigo-500'
                      : 'text-gray-700'
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
              Crowd
            </span>
            <span className={`text-[10px] font-bold ${crowdColor}`}>
              {crowd}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
