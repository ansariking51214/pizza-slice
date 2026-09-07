import React from 'react';

export const PriceTag = ({ price, originalPrice, size = 'md', className = '' }) => {
  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  const formattedOriginalPrice =
    typeof originalPrice === 'number' ? `$${originalPrice.toFixed(2)}` : originalPrice;

  const textSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold font-display',
    lg: 'text-2xl font-extrabold font-display',
  };

  return (
    <div className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={`text-brand-red ${textSizes[size] || textSizes.md}`}>
        {formattedPrice}
      </span>
      {originalPrice && (
        <span className="text-xs text-brand-gray-400 line-through">
          {formattedOriginalPrice}
        </span>
      )}
    </div>
  );
};

export default PriceTag;
