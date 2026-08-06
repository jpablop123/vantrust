// Motivo de escudo VanTrust — elemento de marca reutilizable (premium).
export default function ShieldMotif({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vt-shield-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D4B97A" />
          <stop offset="0.5" stopColor="#BFA15C" />
          <stop offset="1" stopColor="#9E8240" />
        </linearGradient>
      </defs>
      {/* Escudo */}
      <path
        d="M100 6l78 26v74c0 52-33 98-78 122-45-24-78-70-78-122V32L100 6z"
        stroke="url(#vt-shield-g)"
        strokeWidth="2.5"
        fill="url(#vt-shield-g)"
        fillOpacity="0.06"
      />
      {/* Check interior */}
      <path
        d="M66 118l24 24 46-52"
        stroke="url(#vt-shield-g)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
