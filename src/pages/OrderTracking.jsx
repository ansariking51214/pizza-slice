import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ChefHat,
  Flame,
  Bike,
  Home as HomeIcon,
  ShoppingBag,
  Star,
  Navigation,
  ArrowLeft,
  Store,
} from 'lucide-react';
import Button from '../components/ui/Button';

export const OrderTracking = () => {
  // Current active step (1: Placed, 2: Preparing, 3: Out for Delivery, 4: Delivered)
  const [currentStep, setCurrentStep] = useState(3);
  const [etaMinutes, setEtaMinutes] = useState(18);

  // Simulate countdown ETA timer
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, title: 'Order Placed', time: '4:15 PM', desc: 'Ticket received by kitchen', icon: CheckCircle2 },
    { id: 2, title: 'Preparing in Oven', time: '4:22 PM', desc: 'Baked at 500°F to perfection', icon: Flame },
    { id: 3, title: 'Out for Delivery', time: '4:35 PM', desc: 'Driver Marco is on the route', icon: Bike },
    { id: 4, title: 'Delivered', time: 'Est. 4:48 PM', desc: 'Enjoy your hot pizza!', icon: HomeIcon },
  ];

  // Mock order items recap
  const orderItems = [
    {
      id: 1,
      name: 'Supreme Feast Pizza',
      details: 'Medium 10" • Hand-Tossed Classic • Extra Mozzarella',
      qty: 1,
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Golden Garlic Butter Breadsticks',
      details: 'Served with warm marinara dip',
      qty: 1,
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Craft Chilled Italian Soda',
      details: 'Blood Orange Sparkling 500ml',
      qty: 2,
      price: 6.98,
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-red">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>
        <span className="text-xs text-brand-gray-400 font-semibold">Live Order Updates • Auto-refreshing</span>
      </div>

      {/* 1. Order Summary Header Card */}
      <div className="bg-brand-dark text-white p-6 sm:p-8 rounded-food-xl shadow-card space-y-6 border border-brand-dark-muted">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-dark-muted pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                Live Order Tracker
              </span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                Active Order
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-white">
              Order #SCP-9842
            </h1>
            <p className="text-xs text-brand-gray-400">Placed Today at 4:15 PM • SliceCraft Downtown Store #104</p>
          </div>

          <div className="bg-brand-dark-card border border-brand-gray-700 p-4 rounded-food-lg flex items-center gap-3 shadow-soft self-start sm:self-auto">
            <div className="p-3 bg-brand-red text-white rounded-food animate-pulse">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-brand-gray-400 uppercase font-bold block">Estimated Arrival</span>
              <span className="font-display font-black text-xl text-brand-gold">{etaMinutes} Mins</span>
            </div>
          </div>
        </div>

        {/* Driver Info Quick Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-dark-card p-4 rounded-food-lg border border-brand-gray-800">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Driver Marco Rossi"
              className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold font-display text-sm text-white">Marco Rossi</span>
                <span className="bg-brand-gold/20 text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-brand-gold" /> 4.9
                </span>
              </div>
              <p className="text-xs text-brand-gray-400">Red Vespa Scooter • NY-892</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:5550001122"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-red hover:bg-brand-red-hover text-white rounded-food text-xs font-bold transition-all shadow-card"
            >
              <Phone className="w-4 h-4" />
              <span>Call Driver</span>
            </a>
            <button
              onClick={() => alert('Opening chat with driver...')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-dark-muted hover:bg-black text-white rounded-food text-xs font-bold border border-brand-gray-700 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-brand-gold" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Progress Stepper (Horizontal on Desktop, Vertical on Mobile) */}
      <div className="bg-white p-6 sm:p-8 rounded-food-xl border border-brand-gray-100 shadow-card space-y-6">
        <h2 className="font-display font-bold text-xl text-brand-dark">Order Status Timeline</h2>

        {/* Stepper Grid / Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex md:flex-col items-start gap-4 md:gap-3 relative">
                {/* Connecting Line (Desktop) */}
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden md:block absolute top-5 left-10 right-0 h-1 z-0 ${
                      isDone ? 'bg-emerald-500' : 'bg-brand-gray-200'
                    }`}
                  />
                )}

                {/* Step Circle Button */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-300 relative z-10
                    ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-soft'
                        : isCurrent
                        ? 'bg-brand-red text-white ring-4 ring-brand-red-light scale-110 shadow-md animate-pulse'
                        : 'bg-brand-gray-200 text-brand-gray-500'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-display font-bold text-sm ${
                        isDone || isCurrent ? 'text-brand-dark' : 'text-brand-gray-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span className="text-[10px] text-brand-gray-400 font-mono">{step.time}</span>
                  </div>
                  <p className="text-xs text-brand-gray-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Mock Live Map Placeholder Area */}
      <div className="bg-brand-dark rounded-food-xl overflow-hidden border border-brand-dark-muted shadow-card relative h-80 sm:h-96 flex items-center justify-center">
        {/* Dark Grid Background Styling */}
        <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

        {/* Map Route SVG Dashed Line Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path
            d="M 120 180 Q 280 100, 480 220 T 780 160"
            fill="none"
            stroke="#D62300"
            strokeWidth="4"
            strokeDasharray="8 8"
            className="animate-pulse"
          />
        </svg>

        {/* Map Pins */}
        {/* 1. Pizzeria Pin */}
        <div className="absolute top-1/3 left-16 z-10 flex flex-col items-center">
          <div className="bg-white p-2 rounded-full shadow-card border-2 border-brand-red">
            <Store className="w-5 h-5 text-brand-red" />
          </div>
          <span className="bg-brand-dark text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm mt-1 border border-brand-gray-700">
            SliceCraft Store #104
          </span>
        </div>

        {/* 2. Live Moving Driver Pin */}
        <motion.div
          animate={{ x: [0, 40, 20, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
        >
          <div className="bg-brand-gold text-brand-dark p-3 rounded-full shadow-glow border-2 border-white animate-bounce">
            <Bike className="w-6 h-6" />
          </div>
          <div className="bg-brand-dark text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-brand-gold flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Marco (On the way)</span>
          </div>
        </motion.div>

        {/* 3. Destination Home Pin */}
        <div className="absolute bottom-1/4 right-20 z-10 flex flex-col items-center">
          <div className="bg-emerald-600 text-white p-2 rounded-full shadow-card border-2 border-white">
            <HomeIcon className="w-5 h-5" />
          </div>
          <span className="bg-brand-dark text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm mt-1 border border-brand-gray-700">
            Your Home (Apt 4B)
          </span>
        </div>

        {/* Floating Map Overlay Label */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-food-full text-xs font-bold text-brand-dark shadow-soft flex items-center gap-2">
          <Navigation className="w-4 h-4 text-brand-red" />
          <span>Live GPS Driver Stream</span>
        </div>
      </div>

      {/* 4. Order Items Recap List */}
      <div className="bg-white p-6 sm:p-8 rounded-food-xl border border-brand-gray-100 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-brand-gray-100 pb-3">
          <h3 className="font-display font-bold text-lg text-brand-dark flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-red" />
            Order Items Recap
          </h3>
          <span className="text-xs text-brand-gray-400 font-semibold">3 Items</span>
        </div>

        <div className="divide-y divide-brand-gray-100">
          {orderItems.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-food shadow-soft"
                />
                <div>
                  <h4 className="font-bold font-display text-sm text-brand-dark">{item.name}</h4>
                  <p className="text-xs text-brand-gray-500">{item.details}</p>
                  <span className="text-xs font-semibold text-brand-red">Qty: {item.qty}</span>
                </div>
              </div>
              <span className="font-bold text-sm text-brand-dark">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Cost Recap */}
        <div className="pt-4 border-t border-brand-gray-200 space-y-1.5 text-xs text-brand-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-brand-dark">$30.95</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax (8%)</span>
            <span className="font-semibold text-brand-dark">$2.48</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Promo Discount (SLICE35)</span>
            <span>-$4.64</span>
          </div>
          <div className="pt-2 border-t border-brand-gray-100 flex justify-between items-baseline font-bold text-sm text-brand-dark">
            <span className="font-display">Total Amount Paid</span>
            <span className="text-lg text-brand-red font-display">$28.79</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
