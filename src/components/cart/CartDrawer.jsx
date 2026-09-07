import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '../ui/Button';

export const CartDrawer = () => {
  const { isCartOpen, setCartOpen, items, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-drawer flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 bg-brand-dark text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-gold" />
                  <h2 className="text-lg font-bold font-display">Your Pizza Order</h2>
                  <span className="bg-brand-red px-2 py-0.5 text-xs font-bold rounded-food-full">
                    {items.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="p-1.5 text-brand-gray-400 hover:text-white rounded-food transition-colors text-xs flex items-center gap-1"
                      title="Clear Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  )}
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-1 text-brand-gray-300 hover:text-white rounded-food hover:bg-brand-dark-muted transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-brand-gray-50">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 bg-brand-gray-200 text-brand-gray-400 rounded-full flex items-center justify-center text-3xl">
                      🍕
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-brand-dark font-display">Your cart is empty</h3>
                      <p className="text-sm text-brand-gray-500 mt-1">
                        Craving something delicious? Add hot pizzas and treats to your order!
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setCartOpen(false);
                        navigate('/menu');
                      }}
                    >
                      Explore Menu
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <CartItem key={item.cartItemId} item={item} />
                  ))
                )}
              </div>

              {/* Drawer Footer / Summary */}
              {items.length > 0 && (
                <div className="p-4 border-t border-brand-gray-200 bg-white space-y-3 shadow-top">
                  <CartSummary />

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button variant="outline" size="md" onClick={handleViewCartClick}>
                      View Full Cart
                    </Button>
                    <Button variant="primary" size="md" onClick={handleCheckoutClick}>
                      Checkout Now
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
