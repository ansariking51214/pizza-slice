import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  ArrowRight,
  Truck,
  Sparkles,
  Sliders,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Gift,
  Smartphone,
  CheckCircle2,
  Leaf,
  Utensils,
  Coffee,
  Cake,
  Drumstick,
} from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { mockMenuItems } from '../data/mockMenu';
import Button from '../components/ui/Button';

export const Home = () => {
  const navigate = useNavigate();

  // 1. Featured Pizzas filter (first 4 top items)
  const featuredPizzas = mockMenuItems.filter(
    (item) => item.badge || item.category === 'specialty' || item.category === 'non-veg'
  ).slice(0, 4);

  // 2. Countdown Timer State for Deals Banner
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Testimonials State & Data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Verified Pizza Lover',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'The crust at SliceCraft is unreal! Crispy on the outside, light and airy inside. The Truffle Mushroom pizza is now my weekly Friday tradition!',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'Arrived piping hot in 22 minutes! The Buffalo Wings are crispy, the garlic butter sauce is out of this world, and live tracking kept me posted.',
    },
    {
      id: 3,
      name: 'Amanda Rivera',
      role: 'Family Order',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'The Triple Cheese Stuffed Crust is 10/10. My kids ask for SliceCraft every weekend. Fast service, friendly drivers, and incredible flavor!',
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 4. Category showcase definitions
  const categoryTiles = [
    {
      id: 'veg',
      title: 'Veg Artisan',
      desc: 'Fresh garden produce & mozzarella',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      icon: Leaf,
      badge: '100% Fresh',
    },
    {
      id: 'non-veg',
      title: 'Meat & Loaded',
      desc: 'Pepperoni, bacon, sausage & chicken',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
      icon: Drumstick,
      badge: 'Popular',
    },
    {
      id: 'specialty',
      title: 'Stuffed Crusts',
      desc: 'Molten cheese stuffed golden crusts',
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
      icon: Flame,
      badge: 'Chef Choice',
    },
    {
      id: 'sides',
      title: 'Sides & Wings',
      desc: 'Garlic sticks, buffalo wings & dips',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
      icon: Utensils,
      badge: 'Crispy',
    },
    {
      id: 'beverages',
      title: 'Craft Sodas',
      desc: 'Chilled sodas & botanical drinks',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
      icon: Coffee,
      badge: 'Refreshing',
    },
    {
      id: 'desserts',
      title: 'Sweet Desserts',
      desc: 'Molten lava cakes & sweet treats',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      icon: Cake,
      badge: 'Indulgent',
    },
  ];

  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark-card to-black text-white rounded-food-xl p-8 sm:p-12 lg:p-16 shadow-modal overflow-hidden border border-brand-dark-muted">
        {/* Background Ambient Glow Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Hero Content with Framer Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-red/20 border border-brand-red/40 rounded-food-full text-xs sm:text-sm font-bold text-brand-gold">
              <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold" />
              <span>Artisanal Hand-Tossed Stone Oven Pizzas</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none text-white">
              Hot, Fresh & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-brand-gold">
                Delivered Fast
              </span>
            </h1>

            <p className="text-brand-gray-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
              Crafted with 24-hour slow-fermented crusts, vine-ripened tomato sauce, and 100% whole-milk mozzarella cheese. Baked at 500°F to golden perfection.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={Flame}
                onClick={() => navigate('/menu')}
                className="text-base py-4 px-8 shadow-glow hover:scale-105"
              >
                Order Online Now
              </Button>
              <Button
                variant="gold"
                size="lg"
                icon={ArrowRight}
                onClick={() => navigate('/menu?cat=specialty')}
                className="text-base py-4 px-8 hover:scale-105"
              >
                View Today's Deals
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-brand-dark-muted grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="font-display font-black text-2xl text-brand-gold">25 Mins</span>
                <p className="text-xs text-brand-gray-400">Avg. Delivery</p>
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white">4.9 ★</span>
                <p className="text-xs text-brand-gray-400">10k+ Reviews</p>
              </div>
              <div>
                <span className="font-display font-black text-2xl text-brand-red">100%</span>
                <p className="text-xs text-brand-gray-400">Fresh Ingredients</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Graphic with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                alt="Appetizing Supreme Pizza"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-brand-gold/30 hover:rotate-6 transition-transform duration-700"
              />

              {/* Floating Badge 1: Hot Promo */}
              <div className="absolute -top-3 -left-3 bg-white text-brand-dark px-4 py-2 rounded-food-lg shadow-card border border-brand-gray-100 flex items-center gap-2.5 animate-bounce">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-red">Special Offer</p>
                  <p className="text-xs font-black font-display">50% OFF First Order</p>
                </div>
              </div>

              {/* Floating Badge 2: Baked Fresh */}
              <div className="absolute -bottom-3 -right-3 bg-brand-dark text-white px-4 py-2.5 rounded-food-lg shadow-card border border-brand-dark-muted flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-brand-gold fill-brand-gold" />
                <div>
                  <p className="text-xs font-bold font-display">500°F Stone Oven</p>
                  <p className="text-[10px] text-brand-gray-400">Crispy Gold Crust</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. USP STRIP ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 bg-white rounded-food-lg border border-brand-gray-100 shadow-soft flex items-center gap-4 group transition-all"
        >
          <div className="p-3.5 bg-brand-red-light text-brand-red rounded-food group-hover:scale-110 transition-transform">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold font-display text-brand-dark group-hover:text-brand-red transition-colors">
              30-Min Delivery
            </h3>
            <p className="text-xs text-brand-gray-500 mt-0.5">Piping hot or it's free.</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 bg-white rounded-food-lg border border-brand-gray-100 shadow-soft flex items-center gap-4 group transition-all"
        >
          <div className="p-3.5 bg-brand-gold-light text-brand-gold-hover rounded-food group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold font-display text-brand-dark group-hover:text-brand-gold-hover transition-colors">
              Fresh Ingredients
            </h3>
            <p className="text-xs text-brand-gray-500 mt-0.5">100% natural & local produce.</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 bg-white rounded-food-lg border border-brand-gray-100 shadow-soft flex items-center gap-4 group transition-all"
        >
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-food group-hover:scale-110 transition-transform">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold font-display text-brand-dark group-hover:text-emerald-600 transition-colors">
              Easy Customization
            </h3>
            <p className="text-xs text-brand-gray-500 mt-0.5">Pick crust, cheese & toppings.</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 bg-white rounded-food-lg border border-brand-gray-100 shadow-soft flex items-center gap-4 group transition-all"
        >
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-food group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold font-display text-brand-dark group-hover:text-blue-600 transition-colors">
              Live Order Tracking
            </h3>
            <p className="text-xs text-brand-gray-500 mt-0.5">Watch your pizza bake live.</p>
          </div>
        </motion.div>
      </section>

      {/* ================= 3. FEATURED / POPULAR PIZZAS ================= */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-brand-red" />
              Hot Picks
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-dark mt-1">
              Customer Favorites
            </h2>
            <p className="text-sm text-brand-gray-500 mt-1">
              Hand-crafted best sellers voted #1 by pizza lovers
            </p>
          </div>

          <Link
            to="/menu"
            className="text-brand-red font-bold text-sm hover:underline flex items-center gap-1 group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid items={featuredPizzas} />
      </section>

      {/* ================= 4. CATEGORY SHOWCASE ================= */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">
            Explore Flavors
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-dark mt-1">
            Browse Menu Categories
          </h2>
          <p className="text-sm text-brand-gray-500 mt-1">
            From crispy artisan pizzas to spicy buffalo wings and molten chocolate cakes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTiles.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/menu?cat=${cat.id}`}
                className="group relative h-64 rounded-food-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-end p-6 border border-brand-gray-100"
              >
                {/* Image Background */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent group-hover:from-black transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-dark text-xs font-bold rounded-food-full shadow-soft">
                    {cat.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-brand-red text-white rounded-food">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-gold transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-gray-300 pl-1">{cat.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= 5. DEALS / OFFERS BANNER ================= */}
      <section className="relative bg-gradient-to-r from-brand-red via-red-600 to-brand-red-dark text-white rounded-food-xl p-8 sm:p-12 shadow-card overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-brand-gold/20 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-food-full text-xs font-bold">
              <Gift className="w-4 h-4 text-brand-gold" />
              <span>LIMITED TIME PROMO</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
              Buy 1 Large Pizza, Get <br className="hidden sm:inline" />
              <span className="text-brand-gold">50% OFF the Second!</span>
            </h2>

            <p className="text-brand-red-light text-sm sm:text-base max-w-lg">
              Order any specialty or non-veg large pizza and double the happiness with 50% off your second pizza. Use code <strong className="text-white bg-black/30 px-2 py-0.5 rounded font-mono">BOGO50</strong> at checkout!
            </p>

            {/* Live Countdown Timer Element */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs uppercase font-bold text-brand-gold tracking-wider">Offer Expires In:</span>
              <div className="flex items-center gap-2 font-mono font-bold text-sm">
                <div className="bg-brand-dark text-white px-3 py-1.5 rounded-food shadow-sm">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </div>
                <span>:</span>
                <div className="bg-brand-dark text-white px-3 py-1.5 rounded-food shadow-sm">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </div>
                <span>:</span>
                <div className="bg-brand-dark text-white px-3 py-1.5 rounded-food shadow-sm text-brand-gold">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Button
              variant="gold"
              size="lg"
              onClick={() => navigate('/menu?cat=specialty')}
              className="text-base py-4 px-8 shadow-card hover:scale-105"
            >
              Claim Deal Now
            </Button>
          </div>
        </div>
      </section>

      {/* ================= 6. TESTIMONIALS CAROUSEL ================= */}
      <section className="bg-white rounded-food-xl p-8 sm:p-12 border border-brand-gray-100 shadow-card space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-bold text-brand-red uppercase tracking-wider">
              Real Reviews
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-dark mt-1">
              Loved by Hungry Customers
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-food border border-brand-gray-200 hover:border-brand-red text-brand-dark hover:text-brand-red transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-food border border-brand-gray-200 hover:border-brand-red text-brand-dark hover:text-brand-red transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Container */}
        <div className="relative overflow-hidden min-h-[200px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-brand-gray-50 p-6 sm:p-8 rounded-food-lg border border-brand-gray-100 shadow-soft flex flex-col md:flex-row items-center gap-6"
            >
              <img
                src={testimonials[activeTestimonial].avatar}
                alt={testimonials[activeTestimonial].name}
                className="w-20 h-20 rounded-full object-cover shadow-card border-2 border-brand-gold shrink-0"
              />

              <div className="space-y-2 flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <p className="text-brand-dark font-medium italic text-base sm:text-lg leading-relaxed">
                  "{testimonials[activeTestimonial].quote}"
                </p>

                <div>
                  <h4 className="font-display font-bold text-sm text-brand-dark">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <span className="text-xs text-brand-gray-500">
                    {testimonials[activeTestimonial].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`h-2.5 rounded-full transition-all ${
                activeTestimonial === idx ? 'w-8 bg-brand-red' : 'w-2.5 bg-brand-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= 7. APP DOWNLOAD / CTA BAND ================= */}
      <section className="bg-brand-dark text-white rounded-food-xl p-8 sm:p-12 border border-brand-dark-muted shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/20 text-brand-gold rounded-food-full text-xs font-bold">
              <Smartphone className="w-4 h-4" />
              <span>SUPER FAST MOBILE ORDERING</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              Get the SliceCraft Mobile App
            </h2>

            <p className="text-brand-gray-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Order your favorite pizzas with 1-tap reordering, track your delivery driver live on the map, and earn exclusive rewards points.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button className="flex items-center gap-3 px-5 py-3 bg-brand-dark-muted hover:bg-black text-white rounded-food border border-brand-gray-700 transition-all hover:scale-105">
                <span className="text-2xl">🍏</span>
                <div className="text-left">
                  <p className="text-[10px] text-brand-gray-400">Download on the</p>
                  <p className="text-sm font-bold font-display">App Store</p>
                </div>
              </button>

              <button className="flex items-center gap-3 px-5 py-3 bg-brand-dark-muted hover:bg-black text-white rounded-food border border-brand-gray-700 transition-all hover:scale-105">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <p className="text-[10px] text-brand-gray-400">GET IT ON</p>
                  <p className="text-sm font-bold font-display">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-brand-dark-card p-6 rounded-food-xl border border-brand-gray-800 text-center space-y-3 max-w-xs shadow-soft">
              <div className="w-12 h-12 bg-brand-red text-white rounded-food flex items-center justify-center text-xl font-bold mx-auto">
                🍕
              </div>
              <h3 className="font-display font-bold text-lg text-white">Quick Order Status</h3>
              <p className="text-xs text-brand-gray-400">Already placed an order? Track its progress in real-time.</p>
              <Button
                variant="gold"
                size="md"
                className="w-full"
                onClick={() => navigate('/order-tracking')}
              >
                Track My Order
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
