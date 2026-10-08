type P = { className?: string };

export const Seta = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const SetaDiagonal = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Whats = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.79.58.7 5.67.7 11.93c0 2 .52 3.95 1.52 5.67L.6 23.47l6.01-1.58a11.3 11.3 0 0 0 5.43 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
);

export const Estrela = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
);

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconeRede = () => (
  <svg {...base}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="m6.7 7.2 3.5 3.3M17.3 7.2l-3.5 3.3M10.3 13.6 7.4 17.4M13.8 13.5l2.7 3.1" />
  </svg>
);

export const IconeMetodo = () => (
  <svg {...base}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M3 9h18M8 3v18M13 13h4M13 17h2" />
  </svg>
);

export const IconeGrafico = () => (
  <svg {...base}>
    <path d="M3 20h18M6 16v-4M11 16V8M16 16v-6M20 5l-4 3-5-2-5 4" />
  </svg>
);

export const IconeSala = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="3.5" r="1.5" />
    <circle cx="12" cy="20.5" r="1.5" />
    <circle cx="3.5" cy="12" r="1.5" />
    <circle cx="20.5" cy="12" r="1.5" />
  </svg>
);

export const IconeCerebro = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <ellipse cx="11" cy="15" rx="7" ry="12" />
    <ellipse cx="21" cy="15" rx="7" ry="12" />
  </svg>
);
