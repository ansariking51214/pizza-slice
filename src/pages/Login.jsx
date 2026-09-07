import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmailInput, setResetEmailInput] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    // Simulate successful login
    navigate('/menu');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (resetEmailInput.trim()) {
      setResetSubmitted(true);
      setTimeout(() => {
        setResetSubmitted(false);
        setIsForgotModalOpen(false);
        setResetEmailInput('');
      }, 3000);
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
          {/* Ambient Glow */}
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

          {/* Hero Content */}
          <div className="relative z-10 space-y-4 my-auto py-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/20 border border-brand-red/40 rounded-food-full text-xs font-bold text-brand-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIP Pizza Rewards</span>
            </div>
            <h2 className="font-display font-black text-3xl text-white leading-snug">
              Welcome Back to Your Favorite Slice.
            </h2>
            <p className="text-brand-gray-300 text-xs leading-relaxed">
              Log in to access 1-tap reordering, saved delivery addresses, and secret weekly deals.
            </p>
          </div>

          {/* Bottom Feature Graphic */}
          <div className="relative z-10 rounded-food-lg overflow-hidden border border-brand-gray-800 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
              alt="Delicious Pizza"
              className="w-full h-32 object-cover"
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-dark">
              Sign In to SliceCraft
            </h1>
            <p className="text-xs sm:text-sm text-brand-gray-500">
              Enter your credentials to manage your order
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-food text-xs text-red-600 font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-gray-700 mb-1">Email or Phone Number</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-sm text-brand-dark focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-brand-gray-700">Password</label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs font-bold text-brand-red hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-sm text-brand-dark focus:outline-none focus:border-brand-red"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-brand-dark"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={LogIn}>
              Sign In to Order
            </Button>
          </form>

          {/* Social Logins */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-brand-gray-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold uppercase text-brand-gray-400 absolute">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
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
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-bold text-brand-red hover:underline">
              Create a Free Account
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsForgotModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-food-xl p-6 max-w-sm w-full shadow-modal z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-brand-gray-100 pb-3">
                <h3 className="font-display font-bold text-lg text-brand-dark">Reset Password</h3>
                <button
                  onClick={() => setIsForgotModalOpen(false)}
                  className="p-1 text-brand-gray-400 hover:text-brand-dark"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {resetSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-food text-xs text-emerald-800 font-semibold text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p>Password reset link sent! Please check your inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-brand-gray-500">
                    Enter your account email and we'll send you a password reset link.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-brand-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmailInput}
                      onChange={(e) => setResetEmailInput(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-xs text-brand-dark focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full">
                    Send Reset Link
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
