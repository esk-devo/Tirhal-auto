/** Tiny class joiner — filters out falsy branches so conditional classes stay readable. */
export const cn = (...classes) => classes.filter(Boolean).join(' ');
