import React from 'react';
import { Home, ShoppingCart, MapPin, User } from 'lucide-react';

const Item = ({ icon: Icon, label }) => (
  <button
    type="button"
    className="flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none"
  >
    <Icon className="w-5 h-5" aria-hidden />
    <span className="text-xs">{label}</span>
  </button>
);

export default function BottomNav({ t }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-2 grid grid-cols-4">
        <Item icon={Home} label={t('home')} />
        <Item icon={ShoppingCart} label={t('cart')} />
        <Item icon={MapPin} label={t('nearby')} />
        <Item icon={User} label={t('account')} />
      </div>
    </nav>
  );
}
