import React from 'react';
import { Star, IndianRupee, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, lowBandwidth, t, onAdd }) {
  const { name, price, rating, unit, category, image, nutrition } = product;
  return (
    <article className="group rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
      <div className="aspect-[4/3] bg-gray-100 dark:bg-neutral-800 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width="400"
          height="300"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ imageRendering: lowBandwidth ? 'pixelated' : 'auto' }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            {category}
          </span>
          <div className="flex items-center gap-1 text-amber-500" aria-label={`${rating} ${t('rating')}`}>
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-700 dark:text-gray-200">{rating}</span>
          </div>
        </div>
        <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-white line-clamp-2">{name}</h3>
        {nutrition ? (
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2" aria-live="polite">{nutrition}</p>
        ) : null}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1 text-gray-900 dark:text-gray-100">
            <IndianRupee className="w-4 h-4" aria-hidden />
            <span className="text-lg font-bold">{price}</span>
            <span className="text-xs text-gray-500">/{unit}</span>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            aria-label={t('addToCart')}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">{t('add')}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
