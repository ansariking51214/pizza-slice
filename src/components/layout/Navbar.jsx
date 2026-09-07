import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Flame,
  MapPin,
  ChevronDown,
  Sparkles,
  Navigation,
  Check,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const { totalCount, toggleCart } = useCart();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Address Selector state
  const [deliveryLocation, setDeliveryLocation] = useState('124 Main St, NY');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [customAddressInput, setCustomAddressInput] = useState('');

  const sampleLocations = [
    '124 Main St, Apt 4B, NY',
    '742 Evergreen Terrace, NY',
    '350 Fifth Ave, Manhattan, NY',
    'Current GPS Location (Detect)',
  ];

  // Handle scroll detection for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Center Navigation links definition
  const centerNavLinks = [
    { label: 'Menu', path: '/menu' },
    { label: 'Deals', path: '/menu?cat=specialty' },
    { label: 'Track Order', path: '/order-tracking' },
    { label: 'About', path: '/about' },
  ];

  const handleSelectLocation = (loc) => {
    setDeliveryLocation(loc);
    setIsLocationModalOpen(false);
  };

  const handleCustomLocationSubmit = (e) => {
    e.preventDefault();
    if (customAddressInput.trim()) {
      setDeliveryLocation(customAddressInput.trim());
      setCustomAddressInput('');
      setIsLocationModalOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-brand-gray-200 py-2'
            : 'bg-white border-b border-brand-gray-100 py-3'
        }`}
      >
        {/* Top Promo Bar */}
        <div className="bg-brand-dark text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <Flame className="w-3.5 h-3.5 text-brand-gold fill-brand-gold animate-bounce" />
          <span>
            Hot Deal: Free Garlic Dip with any Large Pizza! Use code{' '}
            <strong className="text-brand-gold">GARLICMAGIC</strong>
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* 1. Left: Mobile Hamburger + Logo/Wordmark */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-brand-dark hover:text-brand-red rounded-food transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo / Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-food-lg bg-brand-red text-white flex items-center justify-center text-xl font-black shadow-md group-hover:scale-105 transition-transform">
                🍕
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl leading-none text-brand-dark tracking-tight">
                  Slice<span className="text-brand-red">Craft</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                  Artisanal Pizzeria
                </span>
              </div>
            </Link>
          </div>

          {/* 2. Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 relative">
            {centerNavLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path.includes('?') &&
                  location.pathname + location.search === link.path);

              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={`relative text-sm font-semibold py-1 transition-colors duration-200 ${
                    isActive ? 'text-brand-red font-bold' : 'text-brand-dark hover:text-brand-red'
                  }`}
                >
                  {link.label}

                  {/* Smooth Active Link Underline Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* 3. Right Side: Location Selector + Cart Icon + Login Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Location / Delivery-Address Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-brand-gray-100 hover:bg-brand-gray-200 text-brand-dark rounded-food text-xs sm:text-sm font-medium transition-colors max-w-[140px] sm:max-w-[210px] truncate"
              title="Change Delivery Location"
            >
              <MapPin className="w-4 h-4 text-brand-red shrink-0" />
              <span className="truncate hidden sm:inline text-brand-gray-500">Deliver to:</span>
              <span className="font-bold truncate">{deliveryLocation}</span>
              <ChevronDown className="w-3.5 h-3.5 text-brand-gray-400 shrink-0" />
            </button>

            {/* Cart Icon with Animated Badge */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-brand-red hover:bg-brand-red-hover text-white rounded-food-lg font-bold text-sm shadow-card hover:shadow-card-hover transition-all active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden md:inline">Order</span>

              {/* Animated Item Count Badge */}
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key={totalCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.4, 1], opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-brand-gold text-brand-dark px-2 py-0.5 rounded-food-full text-xs font-black shadow-sm"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Account / Login Button */}
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-brand-dark hover:text-brand-red rounded-food transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Hamburger Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-in Menu Panel (Left side) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-drawer flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-5 bg-brand-dark text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-food bg-brand-red text-white flex items-center justify-center font-bold">
                    🍕
                  </div>
                  <span className="font-display font-extrabold text-lg text-white">
                    Slice<span className="text-brand-red">Craft</span>
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-brand-gray-400 hover:text-white rounded-food transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-gray-400 px-3 mb-2">
                    Navigation
                  </p>
                  {centerNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 text-base font-semibold text-brand-dark hover:bg-brand-red-light hover:text-brand-red rounded-food transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-brand-gray-100 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-gray-400 px-3">
                    Delivery Address
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsLocationModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 p-3 bg-brand-gray-50 text-left rounded-food text-xs font-semibold text-brand-dark border border-brand-gray-200"
                  >
                    <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                    <span className="truncate">{deliveryLocation}</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-brand-gray-100 space-y-2 bg-brand-gray-50">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-sm font-bold text-brand-dark bg-white border border-brand-gray-200 rounded-food shadow-soft"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 text-center text-sm font-bold text-white bg-brand-red rounded-food shadow-card"
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Location Selector Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white rounded-food-xl p-6 w-full max-w-md shadow-modal z-10 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-brand-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-brand-red" />
                  <h3 className="font-display font-bold text-lg text-brand-dark">
                    Select Delivery Address
                  </h3>
                </div>
                <button
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-1 text-brand-gray-400 hover:text-brand-dark rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preset Addresses */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-brand-gray-400">Saved Addresses</p>
                {sampleLocations.map((loc) => {
                  const isSelected = deliveryLocation === loc;
                  return (
                    <button
                      key={loc}
                      onClick={() => handleSelectLocation(loc)}
                      className={`w-full flex items-center justify-between p-3 rounded-food text-xs font-semibold border text-left transition-colors ${
                        isSelected
                          ? 'border-brand-red bg-brand-red-light text-brand-red'
                          : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <MapPin className="w-4 h-4 shrink-0 text-brand-red" />
                        <span className="truncate">{loc}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <form onSubmit={handleCustomLocationSubmit} className="space-y-2 pt-2 border-t border-brand-gray-100">
                <p className="text-xs font-bold uppercase text-brand-gray-400">Or Enter New Address</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter street, city, zip..."
                    value={customAddressInput}
                    onChange={(e) => setCustomAddressInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-xs text-brand-dark focus:outline-none focus:border-brand-red"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-food"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
