import { createFileRoute } from '@tanstack/react-router'
import MapaLima from '@/features/map/components/MapContainer'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="h-full w-full">
      <MapaLima/>
    </div>
  )
}
