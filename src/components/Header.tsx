import { Sun } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-15 flex items-center justify-between px-4 bg-background border-b border-gray-800 text-white shadow-lg">
      <div>
        <h1 className="text-sm font-bold leading-none">Surfing Spots</h1>
        <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider">
          Peru / Lima
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400">
          <Sun size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
          JS
        </div>
      </div>
    </header>
  )
}
