import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Leaf,
  Drumstick,
  Flame,
  Utensils,
  Coffee,
  Cake,
  ChevronDown,
} from 'lucide-react';
import { mockMenuItems, categories } from '../data/mockMenu';
import PizzaCard from '../components/product/PizzaCard';
import Button from '../components/ui/Button';

// Skeleton Loading Card with Shimmer Effect
const SkeletonCard = () => (
  <div className="bg-white rounded-food-lg border border-brand-gray-100 overflow-hidden shadow-soft animate-pulse">
    <div className="h-48 bg-brand-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-brand-gray-200 rounded w-3/4" />
      <div className="h-3 bg-brand-gray-200 rounded w-full" />
      <div className="h-3 bg-brand-gray-200 rounded w-2/3" />
      <div className="pt-3 flex justify-between items-center border-t border-brand-gray-100">
        <div className="h-6 bg-brand-gray-200 rounded w-16" />
        <div className="h-8 bg-brand-gray-200 rounded w-20" />
      </div>
    </div>
  </div>
);

export const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    catParam ? [catParam] : ['all']
  );
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [maxPrice, setMaxPrice] = useState(25);
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'price-asc', 'price-desc', 'rating-desc'

  // Mobile Filter Drawer Toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Simulated Skeleton Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Sync category state when URL search param changes
  useEffect(() => {
    if (catParam) {
      setSelectedCategories([catParam]);
    }
  }, [catParam]);

  // Trigger simulated 400ms loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategories, dietaryFilter, maxPrice, sortBy]);

  // Category Checkbox Toggle Handler
  const handleCategoryCheckbox = (catId) => {
    if (catId === 'all') {
      setSelectedCategories(['all']);
      setSearchParams({});
    } else {
      let updated = selectedCategories.filter((c) => c !== 'all');
      if (updated.includes(catId)) {
        updated = updated.filter((c) => c !== catId);
      } else {
        updated.push(catId);
      }
      if (updated.length === 0) {
        updated = ['all'];
        setSearchParams({});
      } else {
        setSearchParams({ cat: updated[0] });
      }
      setSelectedCategories(updated);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories(['all']);
    setDietaryFilter('all');
    setMaxPrice(25);
    setSortBy('popularity');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    let result = mockMenuItems.filter((item) => {
      // 1. Search Query
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Checkboxes
      const matchesCategory =
        selectedCategories.includes('all') || selectedCategories.includes(item.category);

      // 3. Dietary Filter
      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'veg' && item.isVeg) ||
        (dietaryFilter === 'non-veg' && !item.isVeg);

      // 4. Max Price Slider
      const matchesPrice = item.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesDietary && matchesPrice;
    });

    // Sort Logic
    return result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      // Default: popularity / reviews
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [searchQuery, selectedCategories, dietaryFilter, maxPrice, sortBy]);

  // Group items by category when 'all' is selected and no search string
  const groupedCategories = useMemo(() => {
    if (!selectedCategories.includes('all') || searchQuery || dietaryFilter !== 'all' || maxPrice < 25) {
      return null;
    }

    const catMap = {
      specialty: { title: 'Specialty & Stuffed Crusts', icon: Flame, items: [] },
      veg: { title: 'Fresh Veg Artisan Pizzas', icon: Leaf, items: [] },
      'non-veg': { title: 'Meat & Loaded Pizzas', icon: Drumstick, items: [] },
      sides: { title: 'Sides, Wings & Appetizers', icon: Utensils, items: [] },
      beverages: { title: 'Chilled Craft Beverages', icon: Coffee, items: [] },
      desserts: { title: 'Decadent Desserts', icon: Cake, items: [] },
    };

    mockMenuItems.forEach((item) => {
      if (catMap[item.category]) {
        catMap[item.category].items.push(item);
      }
    });

    return Object.values(catMap).filter((cat) => cat.items.length > 0);
  }, [selectedCategories, searchQuery, dietaryFilter, maxPrice]);

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header Banner */}
      <div className="bg-brand-dark text-white p-6 sm:p-10 rounded-food-xl shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 border border-brand-dark-muted">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/20 border border-brand-red/30 rounded-food-full text-xs font-bold text-brand-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hand-Tossed & Oven Fresh</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            SliceCraft Pizza Menu 🍕
          </h1>
          <p className="text-brand-gray-300 text-xs sm:text-sm max-w-lg">
            Filter by dietary preference, price, or category to find your perfect pizza.
          </p>
        </div>

        {/* Real-time Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray-400" />
          <input
            type="text"
            placeholder="Search pizzas, wings, desserts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-brand-dark-muted border border-brand-gray-700 text-white rounded-food text-sm placeholder-brand-gray-400 focus:outline-none focus:border-brand-red"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT SIDEBAR (Desktop) ================= */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-food-xl border border-brand-gray-100 shadow-card space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-brand-gray-100 pb-3">
            <div className="flex items-center gap-2 font-display font-bold text-base text-brand-dark">
              <SlidersHorizontal className="w-4 h-4 text-brand-red" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-gray-400 hover:text-brand-red flex items-center gap-1 font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Filter 1: Dietary Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-brand-gray-400 tracking-wider">
              Dietary Preference
            </label>
            <div className="grid grid-cols-3 gap-1 bg-brand-gray-50 p-1 rounded-food border border-brand-gray-200">
              {[
                { id: 'all', label: 'All' },
                { id: 'veg', label: 'Veg' },
                { id: 'non-veg', label: 'Non-Veg' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDietaryFilter(opt.id)}
                  className={`py-1.5 text-xs font-bold rounded-food-sm transition-all ${
                    dietaryFilter === opt.id
                      ? 'bg-brand-red text-white shadow-soft'
                      : 'text-brand-dark hover:bg-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Category Checkboxes */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase text-brand-gray-400 tracking-wider">
              Categories
            </label>
            <div className="space-y-2 text-xs font-medium">
              {categories.map((cat) => {
                const isChecked = selectedCategories.includes(cat.id);
                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2.5 cursor-pointer text-brand-dark hover:text-brand-red transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryCheckbox(cat.id)}
                      className="w-4 h-4 accent-brand-red rounded border-brand-gray-300"
                    />
                    <span>{cat.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter 3: Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase text-brand-gray-400 tracking-wider">
                Max Price
              </span>
              <span className="font-bold font-display text-brand-red">${maxPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-red cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-brand-gray-400 font-semibold">
              <span>$5.00</span>
              <span>$25.00</span>
            </div>
          </div>

          {/* Filter 4: Sort Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-brand-gray-400 tracking-wider">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-xs font-bold text-brand-dark focus:outline-none focus:border-brand-red appearance-none pr-8 cursor-pointer"
              >
                <option value="popularity">Popularity / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Customer Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 text-brand-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Bar: Sticky Category Tabs & Mobile Filter Trigger */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-food-xl border border-brand-gray-100 shadow-soft sticky top-20 z-20">
            {/* Sticky Category Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 flex-1">
              {categories.map((cat) => {
                const isActive = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryCheckbox(cat.id)}
                    className={`
                      px-4 py-2 rounded-food-full font-bold text-xs whitespace-nowrap transition-all duration-200
                      ${
                        isActive
                          ? 'bg-brand-red text-white shadow-soft'
                          : 'bg-brand-gray-50 text-brand-dark hover:bg-brand-gray-100 border border-brand-gray-100'
                      }
                    `}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-brand-dark text-white rounded-food font-bold text-xs shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold" />
              <span>Filters</span>
            </button>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-brand-gray-500 px-1">
            <span>
              Showing <strong className="text-brand-dark font-bold">{filteredAndSortedItems.length}</strong> items
            </span>
            {searchQuery && (
              <span>
                Matching "<strong className="text-brand-red">{searchQuery}</strong>"
              </span>
            )}
          </div>

          {/* Skeleton Loading State (500ms loader) */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredAndSortedItems.length === 0 ? (
            /* Empty State Illustration */
            <div className="bg-white rounded-food-xl border border-brand-gray-100 p-12 text-center space-y-4 shadow-soft">
              <div className="w-20 h-20 bg-brand-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto">
                🔍
              </div>
              <h3 className="font-display font-bold text-xl text-brand-dark">No Pizza Items Found</h3>
              <p className="text-xs text-brand-gray-500 max-w-xs mx-auto">
                We couldn't find any items matching your filter settings or search query.
              </p>
              <Button variant="primary" size="sm" onClick={handleResetFilters} icon={RotateCcw}>
                Reset All Filters
              </Button>
            </div>
          ) : groupedCategories ? (
            /* Grouped View when 'All' category is active */
            <div className="space-y-10">
              {groupedCategories.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <section key={group.title} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-brand-gray-200 pb-2">
                      <div className="p-1.5 bg-brand-red-light text-brand-red rounded-food">
                        <GroupIcon className="w-4 h-4" />
                      </div>
                      <h2 className="font-display font-bold text-xl text-brand-dark">
                        {group.title}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.items.map((item) => (
                        <PizzaCard key={item.id} product={item} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* Filtered Flat Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedItems.map((item) => (
                <PizzaCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-drawer flex flex-col z-10 p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-brand-gray-100 pb-3">
                <div className="flex items-center gap-2 font-display font-bold text-lg text-brand-dark">
                  <SlidersHorizontal className="w-5 h-5 text-brand-red" />
                  <span>Filter Options</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-brand-gray-400 hover:text-brand-dark"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Filter Controls */}
              <div className="flex-1 overflow-y-auto space-y-6">
                {/* Dietary */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-brand-gray-400">Dietary</label>
                  <div className="grid grid-cols-3 gap-1 bg-brand-gray-50 p-1 rounded-food border border-brand-gray-200">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'veg', label: 'Veg' },
                      { id: 'non-veg', label: 'Non-Veg' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDietaryFilter(opt.id)}
                        className={`py-1.5 text-xs font-bold rounded-food-sm ${
                          dietaryFilter === opt.id ? 'bg-brand-red text-white' : 'text-brand-dark'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase text-brand-gray-400">Categories</label>
                  <div className="space-y-2 text-xs font-medium">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => handleCategoryCheckbox(cat.id)}
                          className="w-4 h-4 accent-brand-red rounded"
                        />
                        <span>{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Max Price</span>
                    <span className="text-brand-red">${maxPrice.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-brand-red"
                  />
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-brand-gray-400">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-gray-50 border border-brand-gray-200 rounded-food text-xs font-bold text-brand-dark"
                  >
                    <option value="popularity">Popularity / Bestsellers</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Rating</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-gray-100 flex gap-2">
                <Button variant="outline" size="md" className="flex-1" onClick={handleResetFilters}>
                  Reset
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
