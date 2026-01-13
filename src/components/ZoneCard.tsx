interface ZoneCardProps {
  name: string
  spotCount: number
  image: string
  onClick: () => void
}

export default function ZoneCard({
  name,
  spotCount,
  image,
  onClick,
}: ZoneCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-background-accent border border-gray-800/50 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all group flex items-center p-3 gap-4"
    >
      <div className="w-18 h-20 md:w-22 md:h-24 shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight">
          {name}
        </h3>
        <p className="text-sm text-gray-500 font-bold tracking-tight mt-0.5">
          {spotCount} spots
        </p>
      </div>
    </div>
  )
}
