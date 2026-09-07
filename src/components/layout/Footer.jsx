import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, Heart } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-red relative shadow-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-brand-dark-muted">
          {/* Column 1: Company Info & Social Icons */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-food bg-brand-red text-white flex items-center justify-center text-xl font-black shadow-md">
                🍕
              </div>
              <span className="font-display font-black text-2xl text-white">
                Slice<span className="text-brand-red">Craft</span>
              </span>
            </div>

            <p className="text-brand-gray-400 text-sm leading-relaxed">
              Crafting authentic stone-oven pizzas using 24-hour slow-fermented dough, vine-ripened tomatoes, and 100% whole-milk mozzarella cheese.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-brand-dark-muted hover:bg-brand-red text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-brand-dark-muted hover:bg-brand-red text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-brand-dark-muted hover:bg-brand-red text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-brand-dark-muted hover:bg-brand-red text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-brand-gold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-brand-gray-300">
              <li>
                <Link to="/menu" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span>Explore Full Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/menu?cat=specialty" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span>Specialty Deals & Offsets</span>
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span>Live Order Tracker</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span>Our Story & Mission</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-brand-red transition-colors flex items-center gap-1.5">
                  <span>Shopping Cart</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Menu Categories */}
          <div>
            <h4 className="font-display font-bold text-lg text-brand-gold mb-4">Menu Categories</h4>
            <ul className="space-y-2.5 text-sm text-brand-gray-300">
              <li>
                <Link to="/menu?cat=veg" className="hover:text-brand-red transition-colors">
                  Veg Artisan Pizzas
                </Link>
              </li>
              <li>
                <Link to="/menu?cat=non-veg" className="hover:text-brand-red transition-colors">
                  Meat Feast & Loaded
                </Link>
              </li>
              <li>
                <Link to="/menu?cat=specialty" className="hover:text-brand-red transition-colors">
                  Triple Cheese Stuffed Crust
                </Link>
              </li>
              <li>
                <Link to="/menu?cat=sides" className="hover:text-brand-red transition-colors">
                  Garlic Sticks & Buffalo Wings
                </Link>
              </li>
              <li>
                <Link to="/menu?cat=beverages" className="hover:text-brand-red transition-colors">
                  Craft Sodas & Beverages
                </Link>
              </li>
              <li>
                <Link to="/menu?cat=desserts" className="hover:text-brand-red transition-colors">
                  Molten Lava Cakes & Sweets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg text-brand-gold">VIP Pizza Club</h4>
            <p className="text-brand-gray-300 text-sm leading-relaxed">
              Subscribe to get secret promo codes, 15% off your first online order, and weekly pizza specials!
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-food text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! Check your inbox for your 15% discount code! 🍕</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-brand-dark-muted border border-brand-gray-700 text-white placeholder-brand-gray-400 rounded-food text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-food font-bold text-sm flex items-center justify-center gap-2 shadow-card transition-all active:scale-95"
                >
                  <span>Subscribe Now</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-gray-400 gap-4">
          <p>© {new Date().getFullYear()} SliceCraft Pizza Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
