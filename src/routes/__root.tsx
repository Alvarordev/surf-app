import { Outlet, createRootRoute } from '@tanstack/react-router'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useAppSelector } from '@/store/hooks'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const selectedBeachId = useAppSelector((state) => state.surf.selectedBeachId)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <div
          className={`${selectedBeachId ? 'hidden' : 'block w-full'} md:block md:w-auto`}
        >
          <Sidebar />
        </div>
        <main
          className={`flex-1 overflow-y-auto ${!selectedBeachId ? 'hidden' : 'block'} md:block relative`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
