import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/cart/CartSummary';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Banknote,
  AlertCircle,
  Truck,
  Edit2,
} from 'lucide-react';

export const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Multi-step state (1: Delivery, 2: Payment, 3: Review)
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields State
  const [deliveryData, setDeliveryData] = useState({
    name: 'John Doe',
    phone: '(555) 234-5678',
    address: '124 Main Street',
    apt: 'Apt 4B',
    city: 'New York',
    zip: '10001',
    notes: 'Ring doorbell, leave on table',
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'
  const [cardData, setCardData] = useState({
    cardName: 'John Doe',
    cardNumber: '4532 8910 2345 6789',
    expiry: '12/28',
    cvv: '892',
  });
  const [upiId, setUpiId] = useState('johndoe@upi');

  // Form Validation Errors State
  const [errors, setErrors] = useState({});

  // Success modal overlay state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!deliveryData.name.trim()) errs.name = 'Full name is required';
    if (!deliveryData.phone.trim()) errs.phone = 'Phone number is required';
    if (!deliveryData.address.trim()) errs.address = 'Street address is required';
    if (!deliveryData.city.trim()) errs.city = 'City is required';
    if (!deliveryData.zip.trim()) errs.zip = 'Zip code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (paymentMethod === 'card') {
      if (!cardData.cardName.trim()) errs.cardName = 'Cardholder name required';
      if (!cardData.cardNumber.trim() || cardData.cardNumber.length < 15)
        errs.cardNumber = 'Valid 16-digit card number required';
      if (!cardData.expiry.trim()) errs.expiry = 'Expiry required';
      if (!cardData.cvv.trim() || cardData.cvv.length < 3) errs.cvv = '3-digit CVV required';
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim()) errs.upiId = 'UPI ID or mobile number required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      clearCart();
      setIsPlacingOrder(false);
      navigate('/order-tracking');
    }, 2200);
  };

  if (items.length === 0 && !isPlacingOrder) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-white p-8 rounded-food-xl border border-brand-gray-100 shadow-soft">
        <div className="w-20 h-20 bg-brand-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto">
          🍕
        </div>
        <h2 className="text-2xl font-bold font-display text-brand-dark">Your Cart is Empty</h2>
        <p className="text-brand-gray-500 text-sm">Add hot pizzas to your basket before checking out.</p>
        <Link to="/menu">
          <Button variant="primary">Explore Menu</Button>
        </Link>
      </div>
    );
  }

  const stepsList = [
    { id: 1, title: 'Delivery' },
    { id: 2, title: 'Payment' },
    { id: 3, title: 'Review & Place' },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-red">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-brand-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      {/* Multi-Step Progress Indicator Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-food-xl border border-brand-gray-100 shadow-soft">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          {/* Progress Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-brand-gray-200 -z-0" />
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-brand-red transition-all duration-500 -z-0"
            style={{
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
            }}
          />

          {stepsList.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-1.5">
                <button
                  disabled={step.id > currentStep}
                  onClick={() => setCurrentStep(step.id)}
                  className={`
                    w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-soft'
                        : isCurrent
                        ? 'bg-brand-red text-white ring-4 ring-brand-red-light scale-110 shadow-md'
                        : 'bg-brand-gray-200 text-brand-gray-500'
                    }
                  `}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                </button>
                <span
                  className={`text-xs font-bold font-display ${
                    isCurrent ? 'text-brand-red' : 'text-brand-gray-600'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Panel */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Delivery Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 sm:p-8 rounded-food-xl border border-brand-gray-100 shadow-card space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-brand-gray-100 pb-4">
                <MapPin className="w-6 h-6 text-brand-red" />
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">Step 1: Delivery Address</h2>
                  <p className="text-xs text-brand-gray-500">Where should we deliver your hot pizza?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={deliveryData.name}
                    onChange={(e) => setDeliveryData({ ...deliveryData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-brand-gray-50 border rounded-food text-sm focus:outline-none ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={deliveryData.phone}
                    onChange={(e) => setDeliveryData({ ...deliveryData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-brand-gray-50 border rounded-food text-sm focus:outline-none ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    value={deliveryData.address}
                    onChange={(e) => setDeliveryData({ ...deliveryData, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-brand-gray-50 border rounded-food text-sm focus:outline-none ${
                      errors.address ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">Apt / Suite / Floor</label>
                  <input
                    type="text"
                    value={deliveryData.apt}
                    onChange={(e) => setDeliveryData({ ...deliveryData, apt: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={deliveryData.city}
                    onChange={(e) => setDeliveryData({ ...deliveryData, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-brand-gray-50 border rounded-food text-sm focus:outline-none ${
                      errors.city ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">Zip Code *</label>
                  <input
                    type="text"
                    value={deliveryData.zip}
                    onChange={(e) => setDeliveryData({ ...deliveryData, zip: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-brand-gray-50 border rounded-food text-sm focus:outline-none ${
                      errors.zip ? 'border-red-500 bg-red-50' : 'border-brand-gray-200 focus:border-brand-red'
                    }`}
                  />
                  {errors.zip && <p className="text-[11px] text-red-500 mt-1">{errors.zip}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-brand-gray-700 mb-1">Delivery Instructions (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Ring doorbell, leave on table..."
                    value={deliveryData.notes}
                    onChange={(e) => setDeliveryData({ ...deliveryData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full" onClick={handleNextStep}>
                <span>Continue to Payment</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: Payment Method */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 sm:p-8 rounded-food-xl border border-brand-gray-100 shadow-card space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-brand-gray-100 pb-4">
                <CreditCard className="w-6 h-6 text-brand-red" />
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">Step 2: Select Payment Method</h2>
                  <p className="text-xs text-brand-gray-500">Fast, 100% secure payment</p>
                </div>
              </div>

              {/* Payment Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-food text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-red bg-brand-red-light text-brand-red font-bold shadow-soft'
                      : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-2 text-brand-red" />
                  <div className="text-sm font-bold">Credit / Debit Card</div>
                  <div className="text-[10px] text-brand-gray-500 mt-0.5">Visa, Mastercard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border rounded-food text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-brand-red bg-brand-red-light text-brand-red font-bold shadow-soft'
                      : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-2 text-brand-gold-hover" />
                  <div className="text-sm font-bold">UPI / Wallet</div>
                  <div className="text-[10px] text-brand-gray-500 mt-0.5">Google Pay, Apple Pay</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border rounded-food text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-brand-red bg-brand-red-light text-brand-red font-bold shadow-soft'
                      : 'border-brand-gray-200 hover:border-brand-gray-300 text-brand-dark'
                  }`}
                >
                  <Banknote className="w-5 h-5 mb-2 text-emerald-600" />
                  <div className="text-sm font-bold">Cash on Delivery</div>
                  <div className="text-[10px] text-brand-gray-500 mt-0.5">Pay at your doorstep</div>
                </button>
              </div>

              {/* Conditional Form: Credit Card */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-brand-gray-50 rounded-food border border-brand-gray-200 space-y-4">
                  <h4 className="font-bold text-xs uppercase text-brand-gray-500 tracking-wider">
                    Mock Credit Card Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardData.cardName}
                        onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-food text-sm ${
                          errors.cardName ? 'border-red-500' : 'border-brand-gray-300'
                        }`}
                      />
                      {errors.cardName && <p className="text-[11px] text-red-500 mt-1">{errors.cardName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-food text-sm font-mono ${
                          errors.cardNumber ? 'border-red-500' : 'border-brand-gray-300'
                        }`}
                      />
                      {errors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-brand-gray-700 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-food text-sm font-mono ${
                            errors.expiry ? 'border-red-500' : 'border-brand-gray-300'
                          }`}
                        />
                        {errors.expiry && <p className="text-[11px] text-red-500 mt-1">{errors.expiry}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-food text-sm font-mono ${
                            errors.cvv ? 'border-red-500' : 'border-brand-gray-300'
                          }`}
                        />
                        {errors.cvv && <p className="text-[11px] text-red-500 mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional Form: UPI */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-brand-gray-50 rounded-food border border-brand-gray-200 space-y-3">
                  <label className="block text-xs font-semibold text-brand-gray-700">Virtual Payment Address (VPA / Phone)</label>
                  <input
                    type="text"
                    placeholder="name@upi or phone number"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-brand-gray-300 rounded-food text-sm"
                  />
                  {errors.upiId && <p className="text-[11px] text-red-500">{errors.upiId}</p>}
                </div>
              )}

              {/* Conditional Form: COD */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-emerald-50 rounded-food border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <p className="font-bold">Cash on Delivery Selected</p>
                  <p>Please keep exact change ready for the delivery driver ($ {total.toFixed(2)}).</p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Button variant="outline" size="md" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" className="flex-1" onClick={handleNextStep}>
                  <span>Review Order</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Review & Place Order */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 sm:p-8 rounded-food-xl border border-brand-gray-100 shadow-card space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-brand-gray-100 pb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-red" />
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">Step 3: Review & Place Order</h2>
                  <p className="text-xs text-brand-gray-500">Double check your items & delivery information</p>
                </div>
              </div>

              {/* Address Review Box */}
              <div className="p-4 bg-brand-gray-50 rounded-food border border-brand-gray-200 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-brand-dark">
                    <MapPin className="w-4 h-4 text-brand-red" />
                    <span>Delivery Address</span>
                  </div>
                  <p className="text-xs text-brand-gray-600">
                    {deliveryData.name} • {deliveryData.phone}
                  </p>
                  <p className="text-xs text-brand-gray-600">
                    {deliveryData.address}, {deliveryData.apt && `${deliveryData.apt}, `}{deliveryData.city} {deliveryData.zip}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="p-1.5 text-brand-red hover:bg-brand-red-light rounded-food text-xs font-bold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Items List Review */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-brand-gray-400">Order Items ({items.length})</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <CartItem key={item.cartItemId} item={item} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="outline" size="md" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 text-base py-4"
                  onClick={handlePlaceOrder}
                >
                  Place Order Now (${total.toFixed(2)})
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 sticky top-28">
          <CartSummary />
        </div>
      </div>

      {/* Success Modal Checkmark Animation Overlay */}
      <AnimatePresence>
        {isPlacingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative bg-white rounded-food-xl p-8 max-w-sm w-full text-center space-y-4 shadow-modal z-10"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-black text-2xl text-brand-dark">Order Confirmed!</h3>
                <p className="text-xs text-brand-gray-500">Your order has been sent to the kitchen.</p>
              </div>

              <div className="p-3 bg-brand-gray-50 rounded-food text-xs font-semibold text-brand-dark border border-brand-gray-200">
                <span className="text-brand-gray-400 block text-[10px]">Order Number</span>
                <span className="text-brand-red font-mono text-base font-bold">#SCP-9842</span>
              </div>

              <p className="text-[11px] text-brand-gray-400 animate-pulse">Redirecting to live order tracker...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
