/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /**
         * PER-CLIENT BRAND COLOURS — the only place accent colours are defined.
         * Components use `accent` / `accent-dark` / `accent-soft`, never a raw
         * hex, so a rebrand is these three values plus the matching CSS vars in
         * index.css (used by the legacy .brick-orange helper classes).
         *
         * accent      — buttons, links, active nav, wordmark middle word
         * accent-dark — hover state, ~10% darker than accent
         * accent-soft — tinted section backgrounds, near-white wash of accent
         */
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'accent-soft': 'var(--accent-soft)',
        'accent-ink': 'var(--accent-ink)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
