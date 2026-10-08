/** Equal Housing Opportunity logo, drawn inline so it costs no request. */
export default function EqualHousingLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Equal Housing Opportunity" className={className} fill="currentColor">
      <path d="M32 4 2 26v6h6v28h48V32h6v-6L32 4Zm18 50H14V29.4L32 16l18 13.4V54Z" />
      <rect x="21" y="32" width="22" height="5" />
      <rect x="21" y="41" width="22" height="5" />
    </svg>
  );
}
