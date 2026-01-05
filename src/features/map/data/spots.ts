export interface SurfSpot {
  id: string
  name: string
  lat: number
  lng: number
  zoneId: string
  label: string
  image: string
  rating: number
  crowd: string
}

export const SURF_SPOTS: SurfSpot[] = [
  {
    id: 'punta-roquitas',
    name: 'Punta Roquitas',
    lat: -12.123180071799927,
    lng: -77.04436400350683,
    zoneId: 'costa-verde',
    label: '1',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
    rating: 4,
    crowd: 'Low',
  },
  {
    id: 'pampilla',
    name: 'La Pampilla',
    lat: -12.125419615422878,
    lng: -77.04065382892229,
    zoneId: 'costa-verde',
    label: '2',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
    rating: 4,
    crowd: 'Low',
  },
  {
    id: 'waikiki',
    name: 'Waikiki',
    lat: -12.128046371914616,
    lng: -77.0390385583773,
    zoneId: 'costa-verde',
    label: '3',
    image:
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop',
    rating: 4,
    crowd: 'Low',
  },
  {
    id: 'makaha',
    name: 'Makaha',
    lat: -12.130135401180992,
    lng: -77.03700309696961,
    zoneId: 'costa-verde',
    label: '4',
    image:
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop',
    rating: 3,
    crowd: 'Med',
  },
  {
    id: 'redondo',
    name: 'Redondo',
    lat: -12.132700195971223,
    lng: -77.03436112363295,
    zoneId: 'costa-verde',
    label: '5',
    image:
      'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&h=300&fit=crop',
    rating: 3,
    crowd: 'Low',
  },
  {
    id: 'barranquito',
    name: 'Barranquito',
    lat: -12.14362141118888,
    lng: -77.02766559183499,
    zoneId: 'costa-verde',
    label: '6',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 5,
    crowd: 'High',
  },
  {
    id: 'los-pavos',
    name: 'Los Pavos',
    lat: -12.146698164476819,
    lng: -77.02646796694538,
    zoneId: 'costa-verde',
    label: '7',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 4,
    crowd: 'Med',
  },
  {
    id: 'los-yuyos',
    name: 'Los Yuyos',
    lat: -12.152764030459467,
    lng: -77.02638216509918,
    zoneId: 'costa-verde',
    label: '8',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 5,
    crowd: 'High',
  },
  {
    id: 'sombrillas',
    name: 'Sombrillas',
    lat: -12.158028092889367,
    lng: -77.02740290015365,
    zoneId: 'costa-verde',
    label: '9',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 4,
    crowd: 'Med',
  },
  {
    id: 'triangulo',
    name: 'Triángulo',
    lat: -12.162880817423463,
    lng: -77.02869630534595,
    zoneId: 'costa-verde',
    label: '10',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 5,
    crowd: 'High',
  },
  {
    id: 'pescadores',
    name: 'Pescadores',
    lat: -12.165290320891614,
    lng: -77.0305037256613,
    zoneId: 'costa-verde',
    label: '11',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 4,
    crowd: 'Med',
  },
  {
    id: 'la-herradura',
    name: 'La Herradura',
    lat: -12.174513014359023,
    lng: -77.034172162188,
    zoneId: 'costa-verde',
    label: '12',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 5,
    crowd: 'High',
  },
]
