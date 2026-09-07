import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockMenuItems } from '../data/mockMenu';
import { useCart, calculateUnitPrice } from '../context/CartContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PriceTag from '../components/ui/PriceTag';
import { Star, ArrowLeft, Plus, Minus, Check, ShieldCheck } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = mockMenuItems.find((p) => p.id === id) || mockMenuItems[0];

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[1] || product.sizes?.[0] || { id: 'std', name: 'Standard', priceMultiplier: 1.0 }
  );
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = calculateUnitPrice(product.price, selectedSize, selectedToppings);
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedToppings, quantity);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-red transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Menu</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-food-xl border border-brand-gray-100 shadow-card">
        {/* Product Image */}
        <div className="relative rounded-food-lg overflow-hidden bg-brand-gray-100 h-80 sm:h-96">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.badge && <Badge variant="bestseller">{product.badge}</Badge>}
            <Badge variant={product.isVeg ? 'veg' : 'non-veg'}>
              {product.isVeg ? 'Veg' : 'Non-Veg'}
            </Badge>
          </div>
        </div>

        {/* Product Details & Options */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
              <span className="font-bold text-sm text-brand-dark">{product.rating}</span>
              <span className="text-xs text-brand-gray-400">({product.reviewsCount} reviews)</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-dark mt-2">
              {product.name}
            </h1>

            <p className="text-brand-gray-600 text-sm mt-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-4">
              <PriceTag price={totalPrice} size="lg" />
            </div>
          </div>

          {/* Crust Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-brand-gray-100">
              <h3 className="font-bold text-sm font-display text-brand-dark">Choose Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  const price = product.price * size.priceMultiplier;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        p-3 rounded-food text-center border text-sm transition-all
                        ${
                          isSelected
                            ? 'border-brand-red bg-brand-red-light text-brand-red font-bold shadow-soft'
                            : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark'
                        }
                      `}
                    >
                      <div className="font-bold">{size.name}</div>
                      <div className="text-xs text-brand-gray-500 mt-1">${price.toFixed(2)}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {product.toppings && product.toppings.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm font-display text-brand-dark">Extra Toppings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.toppings.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping)}
                      className={`
                        flex items-center justify-between p-2.5 rounded-food border text-xs sm:text-sm transition-all
                        ${
                          isSelected
                            ? 'border-brand-red bg-brand-red-light text-brand-red font-semibold'
                            : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark'
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center ${
                            isSelected ? 'bg-brand-red text-white' : 'border border-brand-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        {topping.name}
                      </span>
                      <span className="text-xs text-brand-gray-500">+${topping.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-brand-gray-100 flex items-center gap-4">
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

            <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Order (${totalPrice.toFixed(2)})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
