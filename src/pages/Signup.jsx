import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

export const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.password || formData.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = 'Passwords do not match';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate account creation
      navigate('/menu');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl bg-white rounded-food-xl border border-brand-gray-100 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Left Side: Split-Screen Appetizing Brand Graphic (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-brand-dark via-brand-dark-card to-black text-white p-8 flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-9 h-9 rounded-food bg-brand-red text-white flex items-center justify-center text-lg font-black shadow-md">
              🍕
            </div>
            <span className="font-display font-extrabold text-xl text-white">
              Slice<span className="text-brand-red">Craft</span>
            </span>
          </div>

          {/* Hero Perks List */}
          <div className="relative z-10 space-y-4 my-auto py-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/20 border border-brand-red/40 rounded-food-full text-xs font-bold text-brand-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join SliceCraft Perks</span>
            </div>
            <h2 className="font-display font-black text-3xl text-white leading-snug">
              Unlock Exclusive Pizza Rewards & Deals
            </h2>
            <ul className="space-y-2.5 text-xs text-brand-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15% Off your first online pizza order</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-Tap quick reorder from order history</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Earn 10 points for every $1 spent</span>
              </li>
            </ul>
          </div>

          {/* Bottom Graphic */}
          <div className="relative z-10 rounded-food-lg overflow-hidden border border-brand-gray-800 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
              alt="Artisan Pizza"
              className="w-full h-32 object-cover"
            />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-dark">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-brand-gray-500">
              Get started with SliceCraft in under 60 seconds
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-brand-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2.5 bg-brand-gray-50 border rounded-food text-xs sm:text-sm text-brand-dark focus:outline-none ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
            </div>

            {/* Email & Phone grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 bg-brand-gray-50 border rounded-food text-xs sm:text-sm text-brand-dark focus:outline-none ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-gray-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 bg-brand-gray-50 border rounded-food text-xs sm:text-sm text-brand-dark focus:outline-none ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            {/* Password & Confirm Password grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 chars"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full pl-10 pr-9 py-2.5 bg-brand-gray-50 border rounded-food text-xs sm:text-sm text-brand-dark focus:outline-none ${
                      errors.password ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-brand-dark"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 mt-0.5">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-gray-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-10 pr-9 py-2.5 bg-brand-gray-50 border rounded-food text-xs sm:text-sm text-brand-dark focus:outline-none ${
                      errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-brand-dark"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-red-500 mt-0.5">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={UserPlus}>
              Create Account
            </Button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 pt-1">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-brand-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold uppercase text-brand-gray-400 absolute">
                Or Sign Up With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-gray-50 hover:bg-brand-gray-100 border border-brand-gray-200 rounded-food text-xs font-bold text-brand-dark transition-colors shadow-soft"
              >
                <FaGoogle className="w-4 h-4 text-red-500" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-gray-50 hover:bg-brand-gray-100 border border-brand-gray-200 rounded-food text-xs font-bold text-brand-dark transition-colors shadow-soft"
              >
                <FaFacebookF className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-brand-gray-500 pt-2 border-t border-brand-gray-100">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-red hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
