/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  MessageCircle, 
  User,
  Heart,
  ChevronDown,
  CreditCard,
  Building2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, FILTERS, CONTACT_INFO, type Product } from './constants';

// --- Utility: WhatsApp Link Generator ---
const getWhatsAppUrl = (phone: string, message: string) => {
  return `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [cart, setCart] = useState<{product: Product; quantity: number, size: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [activeMaterial, setActiveMaterial] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizeForCart, setSelectedSizeForCart] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    names: '',
    idCard: '',
    phone: '',
    country: 'Ecuador',
    region: '',
    city: '',
    address: ''
  });

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProduct && selectedProduct.sizes.length > 0) {
      setSelectedSizeForCart(selectedProduct.sizes[0]);
    } else {
      setSelectedSizeForCart(null);
    }
  }, [selectedProduct]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = activeCategory === 'Todos' || p.category === activeCategory;
      const matchSize = activeSize === null || p.sizes.includes(activeSize);
      const matchMaterial = activeMaterial === 'Todos' || p.material === activeMaterial;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSize && matchMaterial && matchSearch;
    });
  }, [activeCategory, activeSize, activeMaterial, searchQuery]);

  const addToCart = (product: Product, size: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.product.id === product.id && item.size === size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: number) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleReserve = (productName?: string) => {
    const message = productName 
      ? `Hola Calzado Arelys, deseo reservar el calzado: ${productName}`
      : "Hola Calzado Arelys, deseo realizar una consulta sobre sus calzados.";
    window.open(getWhatsAppUrl(CONTACT_INFO.phones[0], message), '_blank');
  };

  const handleWhatsAppCheckout = (phone: string) => {
    if (!shippingInfo.names || !shippingInfo.idCard || !shippingInfo.phone || !shippingInfo.region || !shippingInfo.city || !shippingInfo.address) {
      alert("Por favor, completa todos los campos de envío para continuar.");
      return;
    }
    const items = cart.map(i => `• ${i.product.name} (Talla: ${i.size}) (Cant: ${i.quantity}) - $${(i.product.price * i.quantity).toFixed(2)}`).join('\n');
    const total = totalPrice.toFixed(2);
    
    const shippingDetails = `*Datos de Envío:*\n- Nombres: ${shippingInfo.names}\n- Cédula: ${shippingInfo.idCard}\n- Teléfono: ${shippingInfo.phone}\n- País: ${shippingInfo.country}\n- Región/Provincia: ${shippingInfo.region}\n- Ciudad: ${shippingInfo.city}\n- Dirección: ${shippingInfo.address}`;

    const message = `*NUEVO PEDIDO - CALZADO ARELYS*\n\nHola, deseo confirmar mi compra por un total de *$${total}*.\n\n*Detalle del pedido:*\n${items}\n\n${shippingDetails}\n\n_Por favor, confírmeme para proceder con el pago y envío._`;
    window.open(getWhatsAppUrl(phone, message), '_blank');
  };

  return (
    <div className="min-h-screen selection:bg-brand-gold/30">
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-prestige-border py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            
            {/* Left Section - Guaranteed space */}
            <div className="flex-1 flex items-center justify-start min-w-[40px] md:min-w-[150px]">
              <div className="hidden lg:flex items-center gap-6 font-sans">
                <a href="#inicio" className="nav-link whitespace-nowrap">Inicio</a>
                <a href="#tienda" className="nav-link whitespace-nowrap">Colección</a>
              </div>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 hover:text-brand-gold transition-colors shrink-0"
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Center Section - LOGO with strict constraints */}
            <div className="flex-shrink-1 px-4 text-center">
              <h1 className="text-xl md:text-3xl font-serif tracking-[0.1em] md:tracking-[0.2em] uppercase text-prestige-dark whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] xs:max-w-[160px] sm:max-w-none">
                Arelys
              </h1>
            </div>
            
            {/* Right Section - Guaranteed space */}
            <div className="flex-1 flex items-center justify-end gap-1 md:gap-6 min-w-[80px] md:min-w-[150px]">
              <div className="hidden lg:flex items-center gap-6 font-sans mr-2">
                <a href="#nosotros" className="nav-link">Boutique</a>
                <a href="#ubicacion" className="nav-link">Contacto</a>
              </div>
              
              <div className="flex items-center gap-0 sm:gap-1 shrink-0">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:text-brand-gold transition-colors shrink-0"
                >
                  <Search size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 hover:text-brand-gold transition-colors shrink-0"
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* --- Search Bar Expandable --- */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t border-prestige-border overflow-hidden"
            >
              <div className="container mx-auto px-10 py-8">
                <div className="relative max-w-4xl mx-auto">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Buscador de Colección..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-prestige-bg border border-prestige-border px-16 py-6 text-sm focus:outline-none focus:border-brand-gold transition-all font-serif italic"
                  />
                  <Search size={18} strokeWidth={1} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold" />
                  <button 
                    onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300 hover:text-prestige-dark transition-colors"
                  >
                    <X size={20} strokeWidth={1} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-[111] shadow-2xl flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-xl font-bold tracking-tighter text-stone-900">
                  <span className="text-brand-gold italic">C</span>alzado Arelys
                </h1>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors"><X size={24} /></button>
              </div>
              
              <div className="flex flex-col gap-8 text-lg font-medium uppercase tracking-widest text-stone-600">
                <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Inicio</a>
                <a href="#tienda" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Tienda</a>
                <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Nosotros</a>
                <a href="#ubicacion" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">Contacto</a>
              </div>
              
              <div className="mt-auto pt-8 border-t border-stone-100 italic text-stone-400 text-sm">
                Encuentra tu estilo perfecto.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="inicio" className="relative h-screen flex items-center overflow-hidden bg-white">
        <div className="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
          <div className="lg:col-span-7 flex flex-col justify-center border-r border-prestige-border pr-16 py-24 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-brand-gold text-[10px] font-bold uppercase tracking-[4px] mb-8">Nueva Temporada 2024</span>
              <h2 className="text-6xl md:text-[100px] font-serif leading-[0.9] text-prestige-dark mb-10">
                Elegancia<br />en cada<br /><span className="italic">paso.</span>
              </h2>
              <p className="text-stone-500 text-lg mb-12 leading-relaxed max-w-md">
                Descubre nuestra curaduría exclusiva de calzado artesanal, diseñado para la mujer contemporánea que valora la sofisticación.
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#tienda" className="luxury-button">
                  Explorar Catálogo
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 relative h-[50vh] lg:h-full order-1 lg:order-2 bg-prestige-rose">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000" 
                alt="Luxury Footwear" 
                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Delivery Info --- */}
      <section className="bg-white py-16 border-y border-prestige-border">
        <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Truck size={20} strokeWidth={1} />, title: "Envíos Exclusivos", desc: "Entrega boutique en todo el país." },
            { icon: <CheckCircle2 size={20} strokeWidth={1} />, title: "Calidad Premium", desc: "Materiales curados de alta gama." },
            { icon: <Phone size={20} strokeWidth={1} />, title: "Concierge 24/7", desc: "Asistencia personalizada vía WhatsApp." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4 group">
              <div className="text-brand-gold mb-2">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[2px] font-bold text-prestige-dark mb-2">{item.title}</h3>
                <p className="text-[11px] text-stone-400 uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Shop Section --- */}
      <section id="tienda" className="py-32 bg-prestige-rose">
        <div className="container mx-auto px-10">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[4px] mb-4">Catálogo de Lujo</span>
            <h2 className="text-5xl font-serif mb-8 italic">Nuestra Selección</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-4">
              {FILTERS.categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-[3px] font-bold transition-all border-b-2 py-2 ${activeCategory === cat ? 'border-brand-gold text-brand-gold' : 'border-transparent text-stone-400 hover:text-prestige-dark'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 mt-12">
              <div className="flex items-center gap-4">
                <span className="text-[9px] uppercase tracking-[2px] font-bold text-stone-400">Talla:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveSize(null)}
                    className={`text-[10px] font-bold px-3 py-1 border transition-all ${activeSize === null ? 'border-brand-gold text-brand-gold' : 'border-prestige-border text-stone-400 hover:border-prestige-dark'}`}
                  >
                    ALL
                  </button>
                  {FILTERS.sizes.slice(0, 5).map(s => (
                    <button 
                      key={s}
                      onClick={() => setActiveSize(s)}
                      className={`text-[10px] font-bold px-3 py-1 border transition-all ${activeSize === s ? 'border-brand-gold text-brand-gold' : 'border-prestige-border text-stone-400 hover:border-prestige-dark'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className="group flex flex-col gap-6"
                >
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-white"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      {product.isNew && <span className="bg-prestige-dark text-white text-[8px] font-bold px-3 py-1 uppercase tracking-[2px]">New Arrival</span>}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes[0]); }}
                        className="w-full py-4 bg-prestige-dark text-white text-[10px] uppercase tracking-[3px] font-bold shadow-2xl hover:bg-brand-gold transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="cursor-pointer flex justify-between items-start" onClick={() => setSelectedProduct(product)}>
                    <div>
                      <h3 className="text-lg font-serif text-prestige-dark mb-1">{product.name}</h3>
                      <div className="text-[10px] uppercase tracking-[2px] text-stone-400 font-medium">{product.category} • {product.material}</div>
                    </div>
                    <span className="text-sm font-bold text-brand-gold tracking-tighter">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <Search className="mx-auto mb-4 text-stone-300" size={48} />
              <p className="text-stone-500">No encontramos productos que coincidan con los filtros.</p>
              <button 
                onClick={() => { setActiveCategory('Todos'); setActiveSize(null); setActiveMaterial('Todos'); }}
                className="mt-4 text-brand-gold font-bold hover:underline"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="nosotros" className="py-32 bg-white">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000" 
                alt="Boutique" 
                className="w-full h-full object-cover grayscale-[30%]"
              />
              <div className="absolute top-10 right-10 flex flex-col gap-1 items-end">
                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[4px]">Established</span>
                <span className="text-brand-gold text-2xl font-serif italic">2019</span>
              </div>
            </div>
            
            <div>
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[4px] mb-6 block">Nuestra Historia</span>
              <h2 className="text-5xl font-serif mb-10 leading-tight">Sofisticación <br />y <span className="italic">Exclusividad</span></h2>
              <p className="text-stone-500 text-lg leading-relaxed mb-8 font-light">
                <strong>Arelys Boutique</strong> nació de la pasión por la alta zapatería y el deseo de ofrecer a la mujer contemporánea piezas que trasciendan las tendencias. 
              </p>
              <p className="text-stone-400 mb-12 italic text-sm leading-relaxed border-l-2 border-brand-gold pl-6">
                Ubicados en el corazón de Riobamba, somos el destino predilecto para quienes buscan un calzado con alma y distinción.
              </p>
              <div className="grid grid-cols-2 gap-12 border-t border-prestige-border pt-12">
                <div>
                  <h4 className="text-4xl font-serif text-prestige-dark mb-2 italic tracking-tighter">500+</h4>
                  <p className="text-[9px] text-stone-400 uppercase tracking-[3px] font-bold">Clientes VIP</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif text-prestige-dark mb-2 italic tracking-tighter">Boutique</h4>
                  <p className="text-[9px] text-stone-400 uppercase tracking-[3px] font-bold">Exclusividad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-32 bg-prestige-bg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-prestige-rose rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="container mx-auto px-10 text-center relative z-10">
          <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[4px] mb-6 block">Voces de Distinción</span>
          <h2 className="text-5xl font-serif mb-24 italic">Experiencias Boutique</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: "Andrea V.", text: "Las botas que compré son increíbles, súper cómodas y recibo cumplidos siempre que las uso." },
              { name: "Lucía M.", text: "Excelente atención y el envío fue muy rápido. ¡Recomendadísimo!" },
              { name: "Camila R.", text: "Calzado Arelys es mi lugar favorito para comprar tacones. Tienen modelos únicos." }
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-brand-gold mb-8 italic text-xs tracking-widest font-serif">Selection Member</div>
                <p className="text-stone-500 italic mb-10 leading-relaxed text-lg font-light">"{t.text}"</p>
                <div className="text-[10px] uppercase tracking-[3px] font-bold text-prestige-dark border-t border-prestige-border pt-6 w-fit">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Location Section --- */}
      <section id="ubicacion" className="py-32 bg-prestige-bg scroll-mt-20">
        <div className="container mx-auto px-10">
          <div className="border border-prestige-border bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <div className="p-16 md:p-24 flex flex-col justify-center">
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[4px] mb-6 block">Ubicación Privada</span>
              <h2 className="text-5xl font-serif mb-12 italic">Visítanos</h2>
              <div className="space-y-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[3px] font-bold text-stone-400">Dirección</span>
                  <p className="text-prestige-dark font-medium">{CONTACT_INFO.address}</p>
                </div>
                <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[3px] font-bold text-stone-400">Atención</span>
                  <p className="text-prestige-dark font-medium">{CONTACT_INFO.hours}</p>
                </div>
              </div>
              <button 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`)}
                className="mt-16 luxury-button w-fit flex items-center gap-3"
              >
                Ver en Mapas <ChevronRight size={14} />
              </button>
            </div>
            <div className="h-[500px] lg:h-auto bg-prestige-rose flex items-center justify-center border-l border-prestige-border">
               <div className="text-center">
                 <MapPin size={48} strokeWidth={1} className="mx-auto text-brand-gold mb-6" />
                 <p className="text-stone-400 text-[10px] uppercase tracking-[6px] font-bold">Riobamba, Ecuador</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-10 max-w-4xl">
          <div className="text-center mb-20">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[4px] mb-4 block">Asistencia</span>
            <h2 className="text-5xl font-serif italic">Preguntas Boutique</h2>
          </div>
          <div className="space-y-0 border-t border-prestige-border">
            {[
              { q: "¿Hacen envíos a todo el país?", a: "Sí, realizamos envíos seguros a todas las provincias de Ecuador a través de Servientrega y cooperativas con embalaje de lujo." },
              { q: "¿Cuáles son los métodos de pago?", a: "Aceptamos transferencias bancarias (Pichincha) y pagos directos en nuestro atelier privado." },
              { q: "¿Puedo realizar cambios de talla?", a: "Claro que sí, tienes hasta 3 días después de la compra para realizar cambios por talla, garantizando tu satisfacción plena." }
            ].map((item, i) => (
              <details key={i} className="group border-b border-prestige-border py-8 cursor-default">
                <summary className="text-[12px] uppercase tracking-[3px] font-bold text-prestige-dark flex justify-between items-center list-none cursor-pointer">
                  {item.q}
                  <ChevronDown size={14} strokeWidth={1.5} className="group-open:rotate-180 transition-transform text-brand-gold" />
                </summary>
                <p className="mt-8 text-stone-400 text-sm leading-relaxed font-light italic max-w-2xl">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-prestige-dark text-stone-500 pt-32 pb-16">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-1">
              <h1 className="text-3xl font-serif tracking-[0.2em] uppercase text-white mb-10">
                Arelys
              </h1>
              <p className="text-xs uppercase tracking-[3px] leading-relaxed mb-10 text-stone-400">
                La esencia de la elegancia femenina en cada detalle. Zapatería de autor y boutique exclusiva.
              </p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-brand-gold transition-colors"><Instagram size={18} strokeWidth={1} /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><Facebook size={18} strokeWidth={1} /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><MessageCircle size={18} strokeWidth={1} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[4px] text-white mb-10">Explorar</h4>
              <ul className="space-y-6 text-[10px] uppercase tracking-[3px]">
                <li><a href="#inicio" className="hover:text-brand-gold transition-colors">Main Hall</a></li>
                <li><a href="#tienda" className="hover:text-brand-gold transition-colors">Colección</a></li>
                <li><a href="#nosotros" className="hover:text-brand-gold transition-colors">La Historia</a></li>
                <li><a href="#ubicacion" className="hover:text-brand-gold transition-colors">Atelier</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[4px] text-white mb-10">Asistencia</h4>
              <ul className="space-y-6 text-[10px] uppercase tracking-[3px]">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Envíos VIP</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Cambios</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Legal Boutique</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Cookies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[4px] text-white mb-10">Atención</h4>
              <div className="space-y-6 text-[10px] uppercase font-bold tracking-[3px]">
                <p className="flex items-center gap-4 text-stone-400 font-light hover:text-white transition-colors duration-500 cursor-default">
                  <Phone size={14} strokeWidth={1} /> {CONTACT_INFO.phones[0]}
                </p>
                <p className="flex items-center gap-4 text-stone-400 font-light hover:text-white transition-colors duration-500 cursor-default">
                  <Phone size={14} strokeWidth={1} /> {CONTACT_INFO.phones[1]}
                </p>
                <p className="flex items-center gap-4 text-stone-400 font-light italic">
                  <Truck size={14} strokeWidth={1} /> Concierge Nacional
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 text-center text-[8px] uppercase tracking-[5px] font-bold text-stone-600">
            © {new Date().getFullYear()} Arelys Boutique. Curated Luxury Footwear.
          </div>
        </div>
      </footer>

      {/* --- Cart Sidebar --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col border-l border-prestige-border"
            >
              <div className="p-10 border-b border-prestige-border flex items-center justify-between">
                <h3 className="text-2xl font-serif italic tracking-wide">Tu Colección</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-brand-gold transition-colors"><X strokeWidth={1} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <ShoppingBag size={48} strokeWidth={1} className="mb-6" />
                    <p className="font-serif italic text-lg">Tu carrito aguarda piezas exclusivas</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {cart.map(item => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-6 group">
                        <div className="w-24 h-32 overflow-hidden bg-prestige-rose flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h4 className="font-serif text-lg text-prestige-dark">{item.product.name}</h4>
                            <p className="text-[9px] uppercase tracking-[2px] text-stone-400 mt-1">{item.product.category} • Talla {item.size}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-brand-gold">${item.product.price.toFixed(2)}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Cant: {item.quantity}</span>
                              <button 
                                onClick={() => removeFromCart(item.product.id, item.size)}
                                className="text-[10px] text-prestige-dark font-bold uppercase tracking-widest hover:text-red-800 transition-colors"
                              >
                                Quitar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-10 bg-prestige-rose border-t border-prestige-border">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] uppercase font-bold tracking-[3px] text-stone-400">Total Estimado</span>
                    <span className="text-2xl font-serif italic text-prestige-dark">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="luxury-button w-full flex justify-center"
                    >
                      Continuar al Pago
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Checkout Modal (Bank Info) --- */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative w-full max-w-xl bg-white shadow-2xl p-6 md:p-12 border border-prestige-border max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-8 md:mb-12">
                  <h3 className="text-2xl md:text-4xl font-serif italic text-prestige-dark font-light">Finalizar Pedido</h3>
                  <button onClick={() => setShowCheckout(false)} className="p-2 hover:text-brand-gold transition-colors"><X size={24} strokeWidth={1} /></button>
                </div>
                
                <div className="mb-8 md:mb-10">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[3px] md:tracking-[4px] text-prestige-dark mb-6 md:mb-8 block border-b border-prestige-border pb-4">1. Datos de Envío</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <input type="text" placeholder="Nombres y Apellidos" value={shippingInfo.names} onChange={e => setShippingInfo({...shippingInfo, names: e.target.value})} className="bg-white border border-prestige-border p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors w-full placeholder:text-stone-300 font-light" />
                    <input type="text" placeholder="Cédula / Pasaporte" value={shippingInfo.idCard} onChange={e => setShippingInfo({...shippingInfo, idCard: e.target.value})} className="bg-white border border-prestige-border p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors w-full placeholder:text-stone-300 font-light" />
                    <input type="tel" placeholder="Número de Teléfono" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} className="bg-white border border-prestige-border p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors w-full placeholder:text-stone-300 font-light" />
                    <input type="text" placeholder="País" value={shippingInfo.country} disabled className="bg-stone-50 border border-prestige-border p-4 text-sm text-stone-500 w-full font-light" />
                    <input type="text" placeholder="Región / Provincia" value={shippingInfo.region} onChange={e => setShippingInfo({...shippingInfo, region: e.target.value})} className="bg-white border border-prestige-border p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors w-full placeholder:text-stone-300 font-light" />
                    <input type="text" placeholder="Ciudad" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} className="bg-white border border-prestige-border p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors w-full placeholder:text-stone-300 font-light" />
                    <input type="text" placeholder="Dirección Exacta (Calle principal, intersección, num)" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} className="bg-white border border-prestige-border p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors w-full md:col-span-2 placeholder:text-stone-300 font-light" />
                  </div>
                </div>

                <div className="bg-prestige-rose p-6 md:p-10 mb-8 md:mb-10 border border-prestige-border">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[3px] md:tracking-[4px] text-brand-gold mb-6 md:mb-8 block">2. Transferencia Bancaria</span>
                  
                  <div className="grid grid-cols-1 gap-8 md:gap-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] md:text-[9px] uppercase tracking-[3px] text-stone-400 font-bold">Entidad Final</span>
                      <p className="text-base md:text-lg font-medium text-prestige-dark">{CONTACT_INFO.bank.name}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] md:text-[9px] uppercase tracking-[3px] text-stone-400 font-bold">Cuenta Privada</span>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg md:text-2xl font-serif text-prestige-dark tracking-wider italic font-light break-all">{CONTACT_INFO.bank.account}</p>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(CONTACT_INFO.bank.account);
                            alert('Número de cuenta copiado');
                          }}
                          className="text-[8px] md:text-[9px] text-brand-gold font-bold uppercase tracking-widest hover:underline whitespace-nowrap shrink-0"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] md:text-[9px] uppercase tracking-[3px] text-stone-400 font-bold">Beneficiario</span>
                      <p className="text-base md:text-lg font-medium text-prestige-dark">{CONTACT_INFO.bank.owner}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {CONTACT_INFO.phones.map((phone, i) => (
                    <button 
                      key={i}
                      onClick={() => handleWhatsAppCheckout(phone)}
                      className="luxury-button flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={14} /> Pagar y Confirmar (Asesor {i + 1})
                    </button>
                  ))}
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Product Detail Modal --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl flex flex-col md:flex-row border border-prestige-border"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-10 right-10 z-20 hover:text-brand-gold transition-colors"
              >
                <X size={32} strokeWidth={1} />
              </button>
              
              <div className="w-full md:w-3/5 relative aspect-square md:aspect-auto overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover grayscale-[10%]" />
              </div>
              
              <div className="w-full md:w-2/5 p-12 md:p-20 flex flex-col bg-white">
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold mb-8">{selectedProduct.category} • Luxury Series</div>
                <h3 className="text-5xl font-serif text-prestige-dark mb-6 italic">{selectedProduct.name}</h3>
                <p className="text-3xl font-serif text-brand-gold mb-12">${selectedProduct.price.toFixed(2)}</p>
                
                <div className="space-y-12 flex-1">
                  <div>
                    <h5 className="text-[10px] uppercase text-stone-400 font-bold mb-6 tracking-[3px]">Tallas Disponibles</h5>
                    <div className="flex flex-wrap gap-4">
                      {selectedProduct.sizes.map(s => (
                        <button 
                          key={s} 
                          onClick={() => setSelectedSizeForCart(s)}
                          className={`w-14 h-14 border flex items-center justify-center text-xs font-bold transition-all ${selectedSizeForCart === s ? 'border-brand-gold text-brand-gold bg-prestige-rose' : 'border-prestige-border hover:border-brand-gold hover:text-brand-gold hover:bg-prestige-rose'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-[10px] uppercase text-stone-400 font-bold mb-4 tracking-[3px]">Composición</h5>
                    <p className="text-stone-500 font-light leading-relaxed text-sm">
                      {selectedProduct.description || "Piel seleccionada y acabados artesanales. Un diseño atemporal que redefine el concepto de elegancia femenina."}
                    </p>
                  </div>
                </div>
                
                <div className="mt-16 flex flex-col gap-4">
                  <button 
                    onClick={() => { 
                      if (selectedSizeForCart !== null) {
                        addToCart(selectedProduct, selectedSizeForCart); 
                        setSelectedProduct(null); 
                      } else {
                        alert("Por favor selecciona una talla.");
                      }
                    }}
                    className="luxury-button w-full flex justify-center py-6"
                  >
                    Add to Collection
                  </button>
                  <button 
                    onClick={() => handleReserve(selectedProduct.name)}
                    className="text-[10px] uppercase tracking-[3px] font-bold text-stone-400 hover:text-prestige-dark transition-colors py-4"
                  >
                    Reserva tu Cita Personalizada
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Floating WhatsApp Button --- */}
      <a 
        href={getWhatsAppUrl(CONTACT_INFO.phones[0], "Hola Calzado Arelys, ¡quiero ver el catálogo!")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all z-40"
      >
        <MessageCircle size={32} />
        <span className="absolute -top-2 -left-2 bg-rose-500 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-bounce shadow-lg">9+</span>
      </a>
    </div>
  );
}

