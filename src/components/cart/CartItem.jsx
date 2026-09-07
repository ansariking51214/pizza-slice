import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import PriceTag from '../ui/PriceTag';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-3 p-3 bg-white rounded-food border border-brand-gray-100 shadow-soft">
      {/* Item Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-food shadow-sm"
      />

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1">
            <h4 className="text-sm font-bold text-brand-dark font-display truncate">
              {item.name}
            </h4>
            <button
              onClick={() => removeItem(item.cartItemId)}
              className="text-brand-gray-400 hover:text-brand-red p-1 transition-colors"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Size & Topping summary */}
          <p className="text-xs text-brand-gray-500 mt-0.5">
            Size: <span className="font-semibold text-brand-dark">{item.selectedSize?.name}</span>
          </p>

          {item.selectedToppings && item.selectedToppings.length > 0 && (
            <p className="text-xs text-brand-gray-400 truncate">
              + {item.selectedToppings.map((t) => t.name).join(', ')}
            </p>
          )}
        </div>

        {/* Quantity Controls & Total */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-gray-100">
          <div className="flex items-center border border-brand-gray-200 rounded-food p-0.5 bg-brand-gray-50">
            <button
              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
              className="p-1 hover:bg-white rounded-food-sm text-brand-dark transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-bold text-brand-dark">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
              className="p-1 hover:bg-white rounded-food-sm text-brand-dark transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <PriceTag price={item.unitPrice * item.quantity} size="sm" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
