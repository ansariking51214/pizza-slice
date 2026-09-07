import React from 'react';

const badgeVariants = {
  veg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'non-veg': 'bg-red-100 text-red-800 border-red-300',
  bestseller: 'bg-brand-gold text-brand-dark font-bold border-brand-gold-hover',
  spicy: 'bg-orange-100 text-orange-800 border-orange-300',
  gold: 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold border-amber-300',
  neutral: 'bg-brand-gray-100 text-brand-gray-700 border-brand-gray-200',
};

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-food-full border shadow-sm
        ${badgeVariants[variant] || badgeVariants.neutral}
        ${className}
      `}
    >
      {variant === 'veg' && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
      {variant === 'non-veg' && <span className="w-2 h-2 rounded-full bg-red-600"></span>}
      {children}
    </span>
  );
};

export default Badge;
