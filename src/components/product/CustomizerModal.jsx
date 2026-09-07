import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import PriceTag from '../ui/PriceTag';
import Badge from '../ui/Badge';
import { useCart, calculateUnitPrice } from '../../context/CartContext';
import { defaultCrusts } from '../../data/mockMenu';
import { Plus, Minus, Check, Sparkles, CheckCircle2, Star } from 'lucide-react';

export const CustomizerModal = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();

  const crustOptions = product?.crusts || defaultCrusts;

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[1] || product?.sizes?.[0] || { id: 'std', name: 'Standard', priceMultiplier: 1.0 }
  );
  const [selectedCrust, setSelectedCrust] = useState(crustOptions[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  if (!product) return null;

  const unitPrice = calculateUnitPrice(product.price, selectedSize, selectedToppings, selectedCrust);
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedToppings, selectedCrust, quantity);
    setIsAddedSuccess(true);

    // Micro-animation timer before closing modal
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Customize Your ${product.name}`}>
      <div className="space-y-6">
        {/* Top Product Header Preview */}
        <div className="flex gap-4 items-center p-3 bg-brand-gray-50 rounded-food border border-brand-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-food shadow-soft shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant={product.isVeg ? 'veg' : 'non-veg'}>
                {product.isVeg ? 'Veg' : 'Non-Veg'}
              </Badge>
              {product.rating && (
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-white px-2 py-0.5 rounded-full border border-brand-gray-200">
                  <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                  {product.rating}
                </span>
              )}
            </div>
            <h4 className="font-bold text-brand-dark font-display text-base sm:text-lg">
              {product.name}
            </h4>
            <p className="text-xs text-brand-gray-500 line-clamp-2">{product.description}</p>
          </div>
        </div>

        {/* 1. Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h5 className="text-sm font-bold font-display text-brand-dark mb-2.5 flex items-center justify-between">
              <span>1. Select Size</span>
              <span className="text-xs font-normal text-brand-gray-500">Pick your portion</span>
            </h5>
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize.id === size.id;
                const sizePrice = product.price * size.priceMultiplier;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`
                      p-3 rounded-food text-center border transition-all duration-200
                      ${
                        isSelected
                          ? 'border-brand-red bg-brand-red-light text-brand-red font-bold shadow-soft'
                          : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark bg-white'
                      }
                    `}
                  >
                    <div className="text-xs sm:text-sm font-bold">{size.name}</div>
                    <div className="text-xs text-brand-gray-500 mt-1">${sizePrice.toFixed(2)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Crust Selection */}
        {crustOptions && crustOptions.length > 0 && (
          <div>
            <h5 className="text-sm font-bold font-display text-brand-dark mb-2.5 flex items-center justify-between">
              <span>2. Choose Crust Type</span>
              <span className="text-xs font-normal text-brand-gray-500">Oven-baked dough</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {crustOptions.map((crust) => {
                const isSelected = selectedCrust?.id === crust.id;
                return (
                  <button
                    key={crust.id}
                    type="button"
                    onClick={() => setSelectedCrust(crust)}
                    className={`
                      flex items-center justify-between p-3 rounded-food border text-xs sm:text-sm transition-all duration-200 text-left
                      ${
                        isSelected
                          ? 'border-brand-red bg-brand-red-light text-brand-red font-semibold'
                          : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark bg-white'
                      }
                    `}
                  >
                    <span className="font-medium">{crust.name}</span>
                    <span className="text-xs font-bold text-brand-gray-500">
                      {crust.price > 0 ? `+$${crust.price.toFixed(2)}` : 'Included'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Extra Toppings */}
        {product.toppings && product.toppings.length > 0 && (
          <div>
            <h5 className="text-sm font-bold font-display text-brand-dark mb-2.5 flex items-center justify-between">
              <span>3. Extra Toppings</span>
              <span className="text-xs font-normal text-brand-gray-500">Optional add-ons</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.toppings.map((topping) => {
                const isSelected = selectedToppings.some((t) => t.id === topping.id);
                return (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => toggleTopping(topping)}
                    className={`
                      flex items-center justify-between p-2.5 rounded-food border text-left text-xs sm:text-sm transition-all duration-200
                      ${
                        isSelected
                          ? 'border-brand-red bg-brand-red-light text-brand-red font-semibold'
                          : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-brand-red border-brand-red text-white' : 'border-brand-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{topping.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-brand-gray-500">+${topping.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-brand-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center border border-brand-gray-200 rounded-food p-1 bg-brand-gray-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-white rounded-food-sm text-brand-dark transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-brand-dark">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-white rounded-food-sm text-brand-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Morphing Add To Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddedSuccess}
            className={`
              flex-1 py-3.5 px-6 rounded-food font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-card transition-all duration-300 active:scale-95
              ${
                isAddedSuccess
                  ? 'bg-emerald-600 text-white scale-105'
                  : 'bg-brand-red hover:bg-brand-red-hover text-white'
              }
            `}
          >
            {isAddedSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <span>Add to Order</span>
                <span>•</span>
                <PriceTag price={totalPrice} className="text-white" />
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomizerModal;
