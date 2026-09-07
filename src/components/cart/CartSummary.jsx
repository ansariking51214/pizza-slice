import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import PriceTag from '../ui/PriceTag';
import { ShoppingBag, Truck, Tag, CheckCircle2, X } from 'lucide-react';

export const CartSummary = ({ showCheckoutButton = false, onCheckout }) => {
  const {
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
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);

  const freeDeliveryThreshold = 35;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - rawSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="bg-white rounded-food-lg p-5 border border-brand-gray-100 shadow-soft space-y-4">
      <h3 className="font-bold text-lg font-display text-brand-dark flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-brand-red" />
        Order Summary
      </h3>

      {/* Free delivery progress bar */}
      {rawSubtotal > 0 && (
        <div className="bg-brand-gray-50 p-3 rounded-food text-xs space-y-1.5 border border-brand-gray-100">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5 text-brand-dark">
              <Truck className="w-4 h-4 text-brand-gold" />
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-600 font-bold">Free Delivery Unlocked! 🎉</span>
              ) : (
                <span>Add ${remainingForFreeDelivery.toFixed(2)} more for Free Delivery</span>
              )}
            </span>
          </div>
          <div className="w-full bg-brand-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-gold h-full transition-all duration-300 rounded-full"
              style={{
                width: `${Math.min(100, (rawSubtotal / freeDeliveryThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Promo Code Section */}
      <div className="space-y-2 pt-2 border-t border-brand-gray-100">
        <label className="block text-xs font-bold uppercase text-brand-gray-400">Promo / Coupon Code</label>
        {appliedPromo ? (
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-food text-xs text-emerald-800 font-semibold">
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>{appliedPromo.code} ({appliedPromo.discountPercent}% OFF)</span>
            </div>
            <button
              onClick={removePromoCode}
              className="text-emerald-700 hover:text-red-600 p-0.5"
              title="Remove promo code"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. SLICE35 or PIZZA50"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoFeedback(null);
              }}
              className="flex-1 px-3 py-2 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-xs text-brand-dark uppercase font-semibold focus:outline-none focus:border-brand-red"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-dark hover:bg-black text-white text-xs font-bold rounded-food shadow-soft transition-colors"
            >
              Apply
            </button>
          </form>
        )}

        {promoFeedback && (
          <p
            className={`text-[11px] font-semibold ${
              promoFeedback.success ? 'text-emerald-600' : 'text-brand-red'
            }`}
          >
            {promoFeedback.message}
          </p>
        )}
      </div>

      {/* Breakdown */}
      <div className="space-y-2 text-sm text-brand-gray-600 pt-3 border-t border-brand-gray-100">
        <div className="flex justify-between">
          <span>Subtotal ({totalCount} items)</span>
          <span className="font-semibold text-brand-dark">${rawSubtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Promo Discount</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-semibold text-brand-dark">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold text-brand-dark">
            {deliveryFee === 0 ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              `$${deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="pt-3 border-t border-brand-gray-200 flex justify-between items-baseline font-bold">
          <span className="text-base text-brand-dark font-display">Total Amount</span>
          <PriceTag price={total} size="lg" />
        </div>
      </div>

      {showCheckoutButton && (
        <button
          onClick={onCheckout}
          disabled={totalCount === 0}
          className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-food font-bold text-base shadow-card transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
