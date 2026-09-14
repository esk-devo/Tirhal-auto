/**
 * Tirhal Auto — Tailwind theme.
 *
 * Values are taken from the Figma export (sampled directly from the delivered PNGs)
 * and reconciled with "ترحال للسيارات — Design System v1.0". Figma wins on any
 * conflict, because Figma is the page specification.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#17A3F4', // primary — CTAs, links, prices, active states
          deep: '#0C6FA8', // pressed / gradient start
          tint: '#E3F4FD', // icon beds, selected chips
        },
        sky: '#F0F9FF', // pale blue section background (الأسطول المميز)
        charcoal: '#302F32', // hero + footer dark surface
        ink: '#1A1A1C', // near-black — dark pills, year badge
        paper: '#F8F9FA', // page base
        hairline: '#E8EAED', // card + divider border on light
        line: 'rgba(255,255,255,.14)', // divider on dark
        muted: '#6B6E73', // secondary body text
      },
      fontFamily: {
        // Cairo carries all Arabic display and heading text.
        display: ['Cairo', 'system-ui', 'sans-serif'],
        // Barlow carries Latin text and every numeral (prices, specs, years).
        sans: ['Barlow', 'Cairo', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1200px',
      },
      borderRadius: {
        card: '16px',
        panel: '24px',
        pill: '100px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,19,22,.05)',
        lift: '0 24px 44px -26px rgba(20,19,22,.28)',
        cta: '0 8px 22px -10px rgba(23,163,244,.65)',
        float: '0 4px 12px -2px rgba(20,19,22,.16)',
        panel: '0 30px 70px -32px rgba(23,163,244,.5)',
      },
      transitionTimingFunction: {
        tirhal: 'cubic-bezier(.2,.8,.2,1)',
      },
      transitionDuration: {
        250: '250ms',
        600: '600ms',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1240px',
      },
      keyframes: {
        /*
          Marquee for an RTL document. Two identical blocks sit side by side, each at least
          as wide as its container; both slide one full block width to the RIGHT, so block
          B lands exactly where block A began and the loop has no seam. Translating a block
          by 100% of *itself* — rather than the pair by 50% — is what keeps the viewport
          covered when the container is wider than the natural content. In an LTR document
          this would need to be -100%.
        */
        /*
          Marquee for an RTL document.
          Two identical blocks sit side by side, each forced to at least the container's
          width, and each slides 100% of ITSELF to the right — so block B lands exactly
          where block A began. Sliding a pair by 50% looks equivalent but leaves the
          leading edge bare once the container is wider than one block; this does not.
          An LTR document would need -100%.
        */
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(100%)' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Hero car: drifts in from the end edge on arrival, then breathes very slowly.
        'car-in': {
          from: { opacity: '0', transform: 'translateX(-56px) scale(.985)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'car-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
        'fade-up': 'fade-up .45s cubic-bezier(.2,.8,.2,1) both',
        'car-in': 'car-in 1.1s cubic-bezier(.2,.8,.2,1) both',
        'car-float': 'car-float 7s ease-in-out 1.1s infinite',
      },
    },
  },
  plugins: [],
};
