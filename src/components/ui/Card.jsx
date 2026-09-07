import React from 'react';

export const Card = ({ children, className = '', hover = true, onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-food-lg border border-brand-gray-100 shadow-card overflow-hidden transition-all duration-300
        ${hover ? 'hover:shadow-card-hover hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
