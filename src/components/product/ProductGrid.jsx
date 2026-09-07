import React from 'react';
import PizzaCard from './PizzaCard';

export const ProductGrid = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-food-xl border border-brand-gray-100 p-8 shadow-soft">
        <p className="text-lg font-semibold text-brand-gray-600">No items found in this category.</p>
        <p className="text-sm text-brand-gray-400 mt-1">Try selecting another menu filter above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <PizzaCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductGrid;
