export interface Zone {
  id: string
  name: string
  description: string
  image: string
  center: { lat: number; lng: number }
  spots: string[]
}

export const SURF_ZONES: Record<string, Zone> = {
  'costa-verde': {
    id: 'costa-verde',
    name: 'Costa Verde',
    description:
      'La bahía más constante de Lima. Ofrece desde picos escuela hasta secciones sólidas y tubulares. Recibe swells del Sur con perfección.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    center: { lat: -12.145, lng: -77.035 },
    spots: [
      'la-herradura',
      'pescadores',
      'triangulo',
      'sombrillas',
      'los-yuyos',
      'los-pavos',
      'barranquito',
      'redondo',
      'makaha',
      'waikiki',
      'pampilla',
      'punta-roquitas',
    ],
  },
  'sur-chico': {
    id: 'sur-chico',
    name: 'Sur Chico',
    description:
      'Cuna del surf peruano. Playas con fondos de roca y arena que producen olas de clase mundial y gran potencia.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    center: { lat: -12.3333, lng: -76.825 },
    spots: ['senoritas'],
  },
}
