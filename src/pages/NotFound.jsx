import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Home as HomeIcon, Utensils, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white p-8 sm:p-10 rounded-food-xl border border-brand-gray-100 shadow-card text-center space-y-6"
      >
        {/* Animated Pizza 404 Badge */}
        <div className="relative w-28 h-28 mx-auto">
          <div className="w-full h-full bg-brand-red-light rounded-full flex items-center justify-center text-5xl shadow-inner border border-brand-red/20 animate-pulse">
            🍕
          </div>
          <span className="absolute -bottom-2 -right-2 bg-brand-dark text-white font-display font-black text-xs px-3 py-1 rounded-food-full shadow-md border border-brand-gold">
            ERROR 404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-dark tracking-tight">
            Oops! Page Slice Not Found
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray-500 leading-relaxed">
            The page you are looking for might have been eaten by our delivery team or moved to a new address.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => navigate('/')} icon={HomeIcon}>
            Back to Home
          </Button>
          <Button variant="gold" size="md" className="w-full sm:w-auto" onClick={() => navigate('/menu')} icon={Utensils}>
            Browse Menu
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
