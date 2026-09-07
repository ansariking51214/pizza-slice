import React from 'react';
import { Heart, ShieldCheck, Flame, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export const About = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-brand-dark text-white p-8 sm:p-12 rounded-food-xl shadow-card text-center space-y-4">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Our Heritage & Passion</span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Crafting Happiness, <span className="text-brand-red">One Slice at a Time</span>
        </h1>
        <p className="text-brand-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Founded with a simple promise: 24-hour slow-fermented dough, vine-ripened tomatoes, and 100% whole-milk mozzarella baked in 500°F stone deck ovens.
        </p>
      </section>

      {/* Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-food-lg border border-brand-gray-100 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 bg-brand-red-light text-brand-red rounded-food flex items-center justify-center mx-auto">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-brand-dark">Stone Deck Baking</h3>
          <p className="text-xs text-brand-gray-500 leading-relaxed">
            Every pizza crust is hand-stretched and deck-baked for that golden crunch and airy interior texture.
          </p>
        </div>

        <div className="bg-white p-8 rounded-food-lg border border-brand-gray-100 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 bg-brand-gold-light text-brand-gold-hover rounded-food flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-brand-dark">100% Real Ingredients</h3>
          <p className="text-xs text-brand-gray-500 leading-relaxed">
            No artificial preservatives, no frozen dough. Fresh produce delivered daily from local farm partners.
          </p>
        </div>

        <div className="bg-white p-8 rounded-food-lg border border-brand-gray-100 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-food flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-brand-dark">Community First</h3>
          <p className="text-xs text-brand-gray-500 leading-relaxed">
            Over 1,000,000 pizzas delivered to happy homes, birthday parties, game nights, and family gatherings.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white p-8 rounded-food-xl border border-brand-gray-100 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-brand-dark">Ready for hot, fresh pizza?</h2>
          <p className="text-sm text-brand-gray-500 mt-1">Explore our full menu of pizzas, wings, and desserts.</p>
        </div>
        <Link to="/menu">
          <Button variant="primary" size="lg">
            Order Online Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default About;
