# 🍕 SliceCraft Pizza - Artisanal Food Ordering Web App

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**SliceCraft Pizza** is a modern, high-performance, and visually captivating pizza ordering web application built with React 18, Vite, and Tailwind CSS. Designed with a custom food-app design system, it delivers an immersive user experience featuring interactive customizer modals, real-time menu filtering, persistent cart state, a multi-step checkout flow, live order tracking, and mobile responsiveness.

---

## 🌟 Key Features

### 🎨 1. Custom Food-App Design System
- **Curated Palette**: Primary Rich Red (`#D62300`), Deep Charcoal (`#121212`), Warm Gold (`#FFB800`), and clean neutral grays.
- **Typography Pairing**: `Poppins` display font for bold headlines and `Inter` for crisp body copy.
- **Custom Elevation & Radii**: Custom card elevation scale (`shadow-soft`, `shadow-card`, `shadow-card-hover`, `shadow-modal`) and food-app rounded border radii (`0.5rem`, `1rem`, `1.5rem`, `2rem`).

### 🛒 2. Cart Context & State Management
- **Persistent Storage**: Cart state automatically syncs with `localStorage`.
- **Promo Coupon Engine**: Interactive code validation (`SLICE35` for 15% off, `GARLICMAGIC` for 20% off, `PIZZA50` for 50% off).
- **Free Delivery Progress Indicator**: Visual progress bar tracking subtotal toward the $35.00 free delivery threshold.
- **Micro-Animations & Toasts**: Instant feedback via `react-hot-toast` for item additions, removals, and coupon updates.

### ⚙️ 3. Pizza Customizer Modal
- **Dynamic Configuration**: Select crust sizes (Personal 7", Medium 10", Large 13") and specialty crusts (*Hand-Tossed Classic*, *Stuffed Cheese Crust*, *Golden Deep Pan*).
- **Toppings Checklist**: Multi-select extra toppings with per-item pricing.
- **Live Price Computation**: Real-time price formula calculation `(basePrice * sizeMultiplier + crustAddon + toppings) * quantity`.
- **Morphing Button Feedback**: *"Add to Order"* button transforms into an emerald checkmark reading *"Added to Order!"* upon selection.

### 🔍 4. Interactive Menu & Real-Time Filtering
- **Multi-Filter System**: Filter by search query, dietary preference (*All / Veg Only / Non-Veg Only*), category checkboxes, price range slider ($5 - $25), and sorting (*Bestsellers, Price Low-High, Price High-Low, Rating*).
- **Simulated Shimmer Skeletons**: 400ms shimmer loading cards whenever filter criteria update.
- **Empty State Feedback**: Friendly fallback illustrations with quick filter resets.

### 📦 5. Multi-Step Checkout Flow
- **Step 1: Delivery Address**: Full delivery form with real-time validation states (error borders & helper text).
- **Step 2: Payment Methods**: Selectable options for Credit/Debit Card (mock card details form), Digital Wallet / UPI, and Cash on Delivery (COD).
- **Step 3: Order Review & Confirmation**: Order recap with quantity modifiers, item removal, address review, and an animated checkmark confirmation modal overlay.

### 📍 6. Live Order Tracking & Driver Stream
- **Order Timeline**: 4-stage interactive status indicator (*Order Placed* ➔ *Preparing in Oven* ➔ *Out for Delivery* ➔ *Delivered*).
- **Mock GPS Live Map**: Visual map placeholder showing store location, animated delivery driver route movement, and destination home pin.
- **Driver Card**: Delivery partner details (*Marco Rossi*, `4.9 ★` rating, vehicle info) with functional *"Call Driver"* and *"Message Driver"* triggers.

### 🔑 7. Split-Screen Auth & 404 Pages
- **Login & Signup**: Split-screen design on desktop featuring brand graphics and perk highlights, password visibility eye toggles, forgot password modal, and social login placeholders.
- **404 Not Found Page**: Custom error page matching the site's brand theme with a 🍕 error badge and quick navigation links.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling & CSS Engine**: [Tailwind CSS 3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Routing**: [React Router DOM 6](https://reactrouter.com/)
- **Animations**: [Framer Motion 11](https://www.framer.com/motion/)
- **Icon Libraries**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started & Local Setup

### Prerequisites
Make sure you have **Node.js** (v18.0 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/ansariking51214/pizza-slice.git
cd pizza-slice
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
> **Note for Windows PowerShell Users:** If PowerShell blocks script execution, run with `npm.cmd`:
> ```powershell
> npm.cmd run dev
> ```
> Or temporarily unblock script execution for the terminal session:
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> npm run dev
> ```

Open [http://localhost:3000/](http://localhost:3000/) in your browser to view the application.

---

## 📁 Folder Structure

```
slicecraft-pizza/
├── public/
├── src/
│   ├── components/
│   │   ├── cart/         # CartDrawer, CartItem, CartSummary
│   │   ├── layout/       # Navbar, Footer
│   │   ├── product/      # PizzaCard, ProductGrid, CustomizerModal
│   │   └── ui/           # Button, Badge, Card, Modal, Spinner, PriceTag
│   ├── context/          # CartContext.jsx (Reducer, LocalStorage & Toast state)
│   ├── data/             # mockMenu.js (Pizzas, Sides, Drinks, Desserts & Toppings)
│   ├── pages/            # Home, Menu, ProductDetail, Cart, Checkout, Login, Signup, OrderTracking, About, NotFound
│   ├── App.jsx           # Animated Router & Context Provider setup
│   ├── index.css         # Tailwind CSS directives & scrollbar styling
│   └── main.jsx          # React DOM mounting entry point
├── index.html            # Entry HTML & Google Fonts (Poppins + Inter)
├── tailwind.config.js    # Custom brand tokens, radii & shadow definitions
├── vite.config.js        # Vite build configuration
└── package.json
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server on port 3000 |
| `npm run build` | Compiles production bundle to the `dist/` directory |
| `npm run preview` | Previews the production build locally |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

<p center="text-center">Made with ❤️ for pizza lovers.</p>
