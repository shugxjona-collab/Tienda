export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Botas' | 'Botines' | 'Tacones';
  colors: string[];
  sizes: number[];
  material: 'Cuero' | 'Gamuza' | 'Sintético';
  description?: string;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Botín Beige Elegancia',
    price: 45.00,
    image: '/botin-beige.jpg', 
    category: 'Botines',
    colors: ['Beige'],
    sizes: [35, 36, 37, 38, 39, 40],
    material: 'Cuero',
    description: 'Botín clásico en color beige, ideal para combinar con atuendos casuales y formales. Destaca por su versatilidad y confort.',
    isNew: true
  },
  {
    id: '2',
    name: 'Botín Café Clásico',
    price: 42.00,
    image: '/botin-cafe.jpg',
    category: 'Botines',
    colors: ['Marrón'],
    sizes: [35, 36, 37, 38],
    material: 'Sintético',
    description: 'Un botín atemporal en color café oscuro. Perfecto para el día a día gracias a su diseño ergonómico y duradero.',
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Botín Cuero Azul Noche',
    price: 48.00,
    image: '/botin-azul.jpg',
    category: 'Botines',
    colors: ['Azul'],
    sizes: [35, 36, 37, 38, 39],
    material: 'Cuero',
    description: 'Botín de cuero premium en tono azul noche con tacón grueso. Diseño minimalista y elegante, ideal para un look sofisticado.',
    isNew: true
  },
  {
    id: '4',
    name: 'Botín Gamuza Hexágono',
    price: 50.00,
    image: '/botin-gamuza-hex.jpg',
    category: 'Botines',
    colors: ['Negro'],
    sizes: [36, 37, 38, 39],
    material: 'Gamuza',
    description: 'Botín de gamuza negra con detalle de hebilla hexagonal metálica y tacón con acento cromado. Perfecto para destacar con estilo.',
    isBestSeller: true
  },
  {
    id: '5',
    name: 'Botín Leopardo Chic',
    price: 45.00,
    image: '/botin-leopardo.jpg',
    category: 'Botines',
    colors: ['Leopardo'],
    sizes: [35, 36, 37, 38],
    material: 'Sintético',
    description: 'Botín audaz con estampado de leopardo y textura tipo cuero. Un toque atrevido para elevar cualquier outfit casual o de noche.',
    isSale: true
  },
  {
    id: '6',
    name: 'Bota Alta Plisada',
    price: 65.00,
    image: '/botas-altas.jpg',
    category: 'Botas',
    colors: ['Blanco', 'Marrón', 'Negro'],
    sizes: [36, 37, 38, 39, 40],
    material: 'Sintético',
    description: 'Elegantes botas altas con diseño plisado y tacón en bloque con detalle metálico. Disponibles en tonos blanco, marrón y negro.',
    isNew: true
  },
  {
    id: '7',
    name: 'Botín Beige Hebilla',
    price: 46.00,
    image: '/botin-beige-hebilla.jpg',
    category: 'Botines',
    colors: ['Beige'],
    sizes: [35, 36, 37, 38, 39],
    material: 'Sintético',
    description: 'Botín en tono beige nude con elegante detalle de hebilla negra. Diseño clásico reinventado para una apariencia pulcra y moderna.',
    isBestSeller: true
  }
];

export const FILTERS = {
  categories: ['Todos', 'Botas', 'Botines', 'Tacones'],
  materials: ['Todos', 'Cuero', 'Gamuza', 'Sintético'],
  sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  colors: ['Blanco', 'Negro', 'Marrón', 'Beige', 'Lila', 'Leopardo']
};

export const CONTACT_INFO = {
  phones: ['+593999693683', '+593978889256'],
  bank: {
    name: 'Banco Pichincha',
    account: '2211955347',
    owner: 'HILDA GUANANGA'
  },
  address: 'Primera Constituyente y García Moreno, Riobamba, Ecuador',
  hours: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
};
