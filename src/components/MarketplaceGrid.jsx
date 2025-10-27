import React, { useMemo, useState } from 'react';
import { Search, Mic } from 'lucide-react';
import ProductCard from './ProductCard';

export default function MarketplaceGrid({ products, lowBandwidth, t }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.category].some((field) => field.toLowerCase().includes(q))
    );
  }, [products, query]);

  const onVoiceSearch = async () => {
    try {
      const hasWebkit = 'webkitSpeechRecognition' in window;
      const hasStandard = 'SpeechRecognition' in window;
      if (!hasWebkit && !hasStandard) {
        alert(t('voiceNotSupported'));
        return;
      }
      const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new Ctor();
      rec.lang = 'en-IN';
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setQuery(text);
      };
      rec.onerror = () => alert(t('voiceError'));
      rec.start();
    } catch (e) {
      alert(t('voiceError'));
    }
  };

  return (
    <section aria-labelledby="marketplace-heading" className="mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <h2 id="marketplace-heading" className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('marketplace')}
        </h2>
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-24 py-2 rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={onVoiceSearch}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700"
                aria-label={t('voiceSearch')}
              >
                <Mic className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">{t('voice')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            lowBandwidth={lowBandwidth}
            t={t}
            onAdd={() => alert(t('addedToCart'))}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400" role="status">
          {t('noResults')}
        </p>
      )}
    </section>
  );
}
