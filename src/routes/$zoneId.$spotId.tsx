import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$zoneId/$spotId')({
  component: SpotRoute,
})

function SpotRoute() {
  return null
}
