import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$zoneId')({
  component: ZoneRoute,
})

function ZoneRoute() {
  return null
}
