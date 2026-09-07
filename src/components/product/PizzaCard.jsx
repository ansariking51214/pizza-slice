import React, { useState } from 'react';
import { Star, Plus, Minus, Settings2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import PriceTag from '../ui/PriceTag';
import CustomizerModal from './CustomizerModal';
import { useCart } from '../../context/CartContext';

export const PizzaCard = ({ product }) => {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if product is in cart and get total count for this product ID
  const cartItemsForProduct = items.filter((item) => item.productId === product.id);
  const totalCartQuantity = cartItemsForProduct.reduce((sum, i) => sum + i.quantity, 0);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize =
      product.sizes?.[1] || product.sizes?.[0] || { id: 'std', name: 'Standard', priceMultiplier: 1.0 };
    addItem(product, defaultSize, [], 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (cartItemsForProduct.length > 0) {
      const firstItem = cartItemsForProduct[0];
      updateQuantity(firstItem.cartItemId, firstItem.quantity + 1);
    } else {
      handleQuickAdd(e);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (cartItemsForProduct.length > 0) {
      const lastItem = cartItemsForProduct[cartItemsForProduct.length - 1];
      if (lastItem.quantity === 1) {
        removeItem(lastItem.cartItemId);
      } else {
        updateQuantity(lastItem.cartItemId, lastItem.quantity - 1);
      }
    }
  };

  return (
    <>
      <Card className="flex flex-col h-full group">
        {/* Image Container */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-brand-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.badge && <Badge variant="bestseller">{product.badge}</Badge>}
            <Badge variant={product.isVeg ? 'veg' : 'non-veg'}>
              {product.isVeg ? 'Veg' : 'Non-Veg'}
            </Badge>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-food-full text-xs font-bold flex items-center gap-1 shadow-soft">
              <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold font-display text-brand-dark group-hover:text-brand-red transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs sm:text-sm text-brand-gray-500 mt-1 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Footer Actions */}
          <div className="mt-4 pt-3 border-t border-brand-gray-100 flex items-center justify-between gap-2">
            <PriceTag price={product.price} size="md" />

            <div className="flex items-center gap-1.5">
              {product.sizes && product.sizes.length > 0 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 text-brand-gray-600 hover:text-brand-red hover:bg-brand-red-light rounded-food transition-colors"
                  title="Customize Pizza"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              )}

              {totalCartQuantity > 0 ? (
                /* Stepper when item is in cart */
                <div className="flex items-center bg-brand-red text-white rounded-food p-0.5 shadow-sm">
                  <button
                    onClick={handleDecrement}
                    className="p-1 hover:bg-black/20 rounded-food-sm transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold">{totalCartQuantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-1 hover:bg-black/20 rounded-food-sm transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Add button when not in cart */
                <Button variant="primary" size="sm" onClick={handleQuickAdd} icon={Plus}>
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Customize Modal */}
      {isModalOpen && (
        <CustomizerModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PizzaCard;
