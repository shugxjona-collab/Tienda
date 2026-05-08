export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Botas' | 'Botines' | 'Tacones';
  colors: string[];
  sizes: number[];
  material: 'Cuero' | 'Gamuza' | 'Sintético';
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
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Botín Suede Camel',
    price: 41.00,
    image: 'https://images.unsplash.com/photo-1549416801-6db7310d65b5?q=80&w=800',
    category: 'Botines',
    colors: ['Beige', 'Marrón'],
    sizes: [36, 37, 38, 41],
    material: 'Gamuza',
    isSale: true
  },
  {
    id: '4',
    name: 'Bota Animal Print',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f68917a?q=80&w=800',
    category: 'Botas',
    colors: ['Leopardo'],
    sizes: [37, 38, 39],
    material: 'Sintético',
    isNew: true
  },
  {
    id: '5',
    name: 'Tacón Stiletto Gold',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800',
    category: 'Tacones',
    colors: ['Dorado', 'Nude'],
    sizes: [35, 36, 37, 38, 39],
    material: 'Sintético',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Tacón de Gala Velvet',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=800',
    category: 'Tacones',
    colors: ['Lila', 'Negro', 'Rojo'],
    sizes: [36, 37, 38, 39],
    material: 'Gamuza',
    isNew: true
  },
  {
    id: '7',
    name: 'Botín Urban Chic',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800',
    category: 'Botines',
    colors: ['Negro', 'Beige'],
    sizes: [37, 38, 40],
    material: 'Cuero',
    isSale: true
  },
  {
    id: '8',
    name: 'Bota de Cuero Oxford',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1520639889456-681b4767117d?q=80&w=800',
    category: 'Botas',
    colors: ['Marrón'],
    sizes: [38, 39, 40, 41],
    material: 'Cuero',
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
