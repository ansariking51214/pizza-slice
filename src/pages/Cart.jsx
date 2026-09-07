import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-3xl text-brand-dark">Your Order Basket</h1>
          <p className="text-sm text-brand-gray-500 mt-1">Review your pizzas before proceeding to checkout</p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-brand-gray-500 hover:text-brand-red font-semibold flex items-center gap-1.5 p-2 rounded-food hover:bg-brand-red-light transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-food-xl border border-brand-gray-100 p-12 text-center space-y-4 shadow-soft">
          <div className="w-24 h-24 bg-brand-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto">
            🍕
          </div>
          <h2 className="font-display font-bold text-2xl text-brand-dark">Your Cart is Empty</h2>
          <p className="text-brand-gray-500 max-w-sm mx-auto text-sm">
            Looks like you haven't added any pizzas or treats to your order yet!
          </p>
          <div className="pt-2">
            <Link to="/menu">
              <Button variant="primary" size="lg">
                Browse Full Menu
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}

            <div className="pt-4 flex justify-between items-center">
              <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-red">
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Pizzas</span>
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="sticky top-28">
            <CartSummary showCheckoutButton onCheckout={() => navigate('/checkout')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
