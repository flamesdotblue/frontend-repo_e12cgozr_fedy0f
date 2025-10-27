import React from 'react';
import { Leaf, Moon, Sun, Signal } from 'lucide-react';

function Toggle({ label, checked, onChange, id }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        aria-label={label}
      />
      <span
        aria-hidden
        className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${
          checked ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </span>
    </label>
  );
}

export default function Header({ darkMode, setDarkMode, lowBandwidth, setLowBandwidth, title, subtitle }) {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/70 border-b border-gray-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
            <Leaf className="w-6 h-6" aria-hidden />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-xs text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="text-sm hidden sm:inline">{darkMode ? 'Dark' : 'Light'}</span>
          </button>
          <div className="hidden sm:block">
            <Toggle
              id="low-bandwidth-toggle"
              label={
                <span className="inline-flex items-center gap-1">
                  <Signal className="w-3.5 h-3.5" />
                  <span>Low bandwidth</span>
                </span>
              }
              checked={lowBandwidth}
              onChange={setLowBandwidth}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
