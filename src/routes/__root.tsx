import { Outlet, createRootRoute, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import LimaMap from '@/features/map/components/MapContainer'
import Header from '@/components/Header'

type SurfSearchParams = {
  view?: 'list' | 'map'
}

export const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): SurfSearchParams => {
    return {
      view: (search.view as 'list' | 'map') || 'list',
    }
  },
  component: RootLayout,
})

function RootLayout() {
  const [searchTerm, setSearchTerm] = useState('')
  const { view } = useSearch({ from: Route.id })

  return (
    <div className="flex h-dvh w-screen overflow-hidden bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div
        className={`
        ${view === 'map' ? 'hidden md:block' : 'block'}
        h-full w-full md:w-auto z-10
      `}
      >
        <Sidebar searchTerm={searchTerm} />
      </div>

      <main
        className={`
        flex-1 relative h-full
        ${view === 'list' ? 'opacity-0 pointer-events-none absolute inset-0 md:opacity-100 md:pointer-events-auto md:relative' : 'opacity-100 pointer-events-auto'}
      `}
      >
        <LimaMap />
        <Outlet />
      </main>
    </div>
  )
}
