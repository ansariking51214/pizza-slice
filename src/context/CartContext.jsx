import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const CART_STORAGE_KEY = 'slicecraft_cart_v1';

const initialState = {
  items: [],
  isCartOpen: false,
};

// Helper to compute unit price for a configured item
export const calculateUnitPrice = (basePrice, selectedSize, selectedToppings = [], selectedCrust = null) => {
  const multiplier = selectedSize?.priceMultiplier || 1.0;
  const toppingsTotal = (selectedToppings || []).reduce((sum, t) => sum + (t.price || 0), 0);
  const crustAddon = selectedCrust?.price || 0;
  return (basePrice * multiplier) + toppingsTotal + crustAddon;
};

// Helper to create unique cart key based on product + customizations
export const generateCartItemId = (productId, selectedSize, selectedToppings = [], selectedCrust = null) => {
  const sizeKey = selectedSize?.id || 'default';
  const crustKey = selectedCrust?.id || 'defaultCrust';
  const toppingKeys = (selectedToppings || []).map(t => t.id).sort().join('_');
  return `${productId}-${sizeKey}-${crustKey}-${toppingKeys}`;
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedSize, selectedToppings = [], selectedCrust = null, quantity = 1 } = action.payload;
      const cartItemId = generateCartItemId(product.id, selectedSize, selectedToppings, selectedCrust);
      const unitPrice = calculateUnitPrice(product.price, selectedSize, selectedToppings, selectedCrust);

      const existingIndex = state.items.findIndex(item => item.cartItemId === cartItemId);

      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) => {
          if (idx === existingIndex) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      } else {
        const newItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          isVeg: product.isVeg,
          basePrice: product.price,
          selectedSize: selectedSize || { id: 'standard', name: 'Standard', priceMultiplier: 1.0 },
          selectedCrust: selectedCrust || { id: 'classic', name: 'Hand-Tossed Classic', price: 0 },
          selectedToppings,
          unitPrice,
          quantity,
        };
        updatedItems = [...state.items, newItem];
      }

      return {
        ...state,
        items: updatedItems,
        isCartOpen: true, // Auto open drawer on add
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.cartItemId !== action.payload),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { cartItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.cartItemId !== cartItemId),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    }

    case 'SET_CART_OPEN': {
      return {
        ...state,
        isCartOpen: action.payload,
      };
    }

    case 'LOAD_SAVED_CART': {
      return {
        ...state,
        items: action.payload || [],
      };
    }

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'LOAD_SAVED_CART', payload: parsed });
        }
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [state.items]);

  // Computed values
  const rawSubtotal = state.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedPromo ? (rawSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);

  const tax = subtotal * 0.08; // 8% sales tax
  const deliveryFee = rawSubtotal > 0 ? (rawSubtotal >= 35 ? 0 : 3.99) : 0;
  const total = subtotal + tax + deliveryFee;
  const totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Action Helpers with Toast feedback
  const addItem = (product, selectedSize, selectedToppings = [], selectedCrust = null, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, selectedSize, selectedToppings, selectedCrust, quantity },
    });
    toast.success(`Added ${product.name} to order!`, {
      style: {
        borderRadius: '1rem',
        background: '#121212',
        color: '#fff',
      },
      icon: '🍕',
    });
  };

  const removeItem = (cartItemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartItemId });
    toast('Item removed from cart', {
      icon: '🗑️',
      style: {
        borderRadius: '1rem',
        background: '#121212',
        color: '#fff',
      },
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setAppliedPromo(null);
    toast('Cart cleared', {
      icon: '🧹',
      style: {
        borderRadius: '1rem',
        background: '#121212',
        color: '#fff',
      },
    });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const setCartOpen = (isOpen) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen });
  };

  // Promo code helper with Toast notifications
  const applyPromoCode = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    if (cleanCode === 'SLICE35') {
      setAppliedPromo({ code: 'SLICE35', discountPercent: 15, name: '15% Off Special' });
      toast.success('Promo SLICE35 Applied (15% OFF)! 🎉');
      return { success: true, message: '15% discount applied!' };
    } else if (cleanCode === 'GARLICMAGIC' || cleanCode === 'BOGO50') {
      setAppliedPromo({ code: cleanCode, discountPercent: 20, name: '20% Off Promo' });
      toast.success(`Promo ${cleanCode} Applied (20% OFF)! 🎉`);
      return { success: true, message: '20% discount applied!' };
    } else if (cleanCode === 'PIZZA50') {
      setAppliedPromo({ code: 'PIZZA50', discountPercent: 50, name: '50% Off First Order' });
      toast.success('Promo PIZZA50 Applied (50% OFF)! 🎉');
      return { success: true, message: '50% discount applied!' };
    } else {
      toast.error('Invalid promo code. Try SLICE35 or PIZZA50');
      return { success: false, message: 'Invalid promo code. Try SLICE35 or PIZZA50' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast('Promo code removed');
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isCartOpen: state.isCartOpen,
        rawSubtotal,
        discountAmount,
        subtotal,
        tax,
        deliveryFee,
        total,
        totalCount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
