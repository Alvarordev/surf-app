export interface SurfSpot {
  id: string
  name: string
  lat: number
  lng: number
  zoneId: string
  label: string
  image: string
  rating: number
  difficulty: string
  exposure: number
}

export const SURF_SPOTS: SurfSpot[] = [
  {
    id: 'punta-roquitas',
    name: 'Punta Roquitas',
    lat: -12.123180071799927,
    lng: -77.04436400350683,
    zoneId: 'costa-verde',
    label: '1',
    image: './src/assets/puntaroquitas.png',
    rating: 4,
    difficulty: 'Intermedio',
    exposure: 1.15
  },
  {
    id: 'pampilla',
    name: 'La Pampilla',
    lat: -12.125419615422878,
    lng: -77.04065382892229,
    zoneId: 'costa-verde',
    label: '2',
    image: './src/assets/pampilla.webp',
    rating: 4,
    difficulty: 'Intermedio',
    exposure: 1.10
  },
  {
    id: 'waikiki',
    name: 'Waikiki',
    lat: -12.128046371914616,
    lng: -77.0390385583773,
    zoneId: 'costa-verde',
    label: '3',
    image: './src/assets/waikiki.jpg',
    rating: 4,
    difficulty: 'Principiante',
    exposure: 0.85
  },
  {
    id: 'makaha',
    name: 'Makaha',
    lat: -12.130135401180992,
    lng: -77.03700309696961,
    zoneId: 'costa-verde',
    label: '4',
    image: './src/assets/makaha.jpg',
    rating: 3,
    difficulty: 'Principiante',
    exposure: 0.80
  },
  {
    id: 'redondo',
    name: 'Redondo',
    lat: -12.132700195971223,
    lng: -77.03436112363295,
    zoneId: 'costa-verde',
    label: '5',
    image: './src/assets/redondo.webp',
    rating: 3,
    difficulty: 'Principiante',
    exposure: 0.90
  },
  {
    id: 'barranquito',
    name: 'Barranquito',
    lat: -12.14362141118888,
    lng: -77.02766559183499,
    zoneId: 'costa-verde',
    label: '6',
    image: './src/assets/barranquito.png',
    rating: 5,
    difficulty: 'Intermedio',
    exposure: 1.05
  },
  {
    id: 'los-pavos',
    name: 'Los Pavos',
    lat: -12.146698164476819,
    lng: -77.02646796694538,
    zoneId: 'costa-verde',
    label: '7',
    image: './src/assets/los-pavos.jpg',
    rating: 4,
    difficulty: 'Intermedio',
    exposure: 0.95
  },
  {
    id: 'los-yuyos',
    name: 'Los Yuyos',
    lat: -12.152764030459467,
    lng: -77.02638216509918,
    zoneId: 'costa-verde',
    label: '8',
    image: './src/assets/los-yuyos.jpg',
    rating: 5,
    difficulty: 'Principiante',
    exposure: 0.65
  },
  {
    id: 'sombrillas',
    name: 'Sombrillas',
    lat: -12.158028092889367,
    lng: -77.02740290015365,
    zoneId: 'costa-verde',
    label: '9',
    image: './src/assets/sombrillas.jpg',
    rating: 4,
    difficulty: 'Principiante',
    exposure: 0.85
  },
  {
    id: 'triangulo',
    name: 'Triángulo',
    lat: -12.162880817423463,
    lng: -77.02869630534595,
    zoneId: 'costa-verde',
    label: '10',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 5,
    difficulty: 'Intermedio',
    exposure: 1.05
  },
  {
    id: 'pescadores',
    name: 'Pescadores',
    lat: -12.165290320891614,
    lng: -77.0305037256613,
    zoneId: 'costa-verde',
    label: '11',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 4,
    difficulty: 'Intermedio',
    exposure: 0.90
  },
  {
    id: 'la-herradura',
    name: 'La Herradura',
    lat: -12.174513014359023,
    lng: -77.034172162188,
    zoneId: 'costa-verde',
    label: '12',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    rating: 5,
    difficulty: 'Experto',
    exposure: 1.25
  },
]