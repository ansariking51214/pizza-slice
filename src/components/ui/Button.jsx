import React from 'react';

const variants = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-hover shadow-md hover:shadow-card-hover focus-visible:ring-brand-red',
  secondary: 'bg-brand-dark text-white hover:bg-black shadow-md focus-visible:ring-brand-dark',
  gold: 'bg-brand-gold text-brand-dark hover:bg-brand-gold-hover shadow-md focus-visible:ring-brand-gold font-bold',
  outline: 'border-2 border-brand-red text-brand-red hover:bg-brand-red-light focus-visible:ring-brand-red',
  ghost: 'text-brand-dark hover:bg-brand-gray-100 focus-visible:ring-brand-gray-300',
  white: 'bg-white text-brand-dark hover:bg-brand-gray-50 shadow-soft focus-visible:ring-brand-gray-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-food-sm font-semibold',
  md: 'px-5 py-2.5 text-sm rounded-food font-semibold',
  lg: 'px-7 py-3.5 text-base rounded-food-lg font-bold',
  full: 'w-full py-3 text-base rounded-food font-bold',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-inherit hover:shadow-none' : 'active:scale-95'}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
