import { WavesIcon } from '@/assets/WavesIcon'
import type { BeachStatusInfo } from '@/utils/beachStatus'

interface BeachCardProps {
  label: string
  name: string
  difficulty: string
  image: string
  isSelected?: boolean
  status?: BeachStatusInfo
  onClick?: () => void
}

export default function BeachCard({
  label,
  name,
  difficulty,
  image,
  isSelected,
  status,
  onClick,
}: BeachCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-xl bg-background-accent border-2 border-background-accent ${
        isSelected && ' border-primary/50'
      } transition-all cursor-pointer group`}
    >
      <div className="relative w-16 h-16 mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="group absolute -bottom-2 left-1/2 right-1/2 flex cursor-pointer flex-col items-center">
          <div
            className={`flex h-7 w-7.5 border-2 border-background rounded-lg font-bold items-center justify-center shadow-lg text-sm transition-colors ${
              isSelected ? 'bg-white text-primary' : 'bg-primary text-white'
            }`}
          >
            {label}
          </div>
          <div className="absolute top-5 h-7 w-8">
            <WavesIcon color={isSelected ? '#ffffff' : '#626eec'} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 py-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-medium font-bold text-white group-hover:text-primary transition-colors">
              Playa {name}
            </h3>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col ">
            <span className="text-xs text-foreground-accent font-semibold ">
              Estado
            </span>
            <span
              className="text-xs font-bold leading-none mt-1"
              style={{ color: status?.color || '#94a3b8' }}
            >
              {status?.label || '---'}
            </span>
          </div>

          <div className="flex flex-col ">
            <span className="text-xs text-foreground-accent font-bold tracking-wider">
              Dificultad
            </span>
            <span className={`text-xs font-bold`}>{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
