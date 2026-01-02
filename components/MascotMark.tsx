export default function MascotMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-pink-300 to-brand-400 shadow-lg shadow-brand-900/20"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="white" opacity="0.9" />
        <circle cx="32" cy="32" r="14" fill="#1f2937" />
        <circle cx="38" cy="26" r="4" fill="#fef3c7" />
        <path
          d="M14 32c6-8 12-12 18-12s12 4 18 12c-6 8-12 12-18 12s-12-4-18-12z"
          stroke="#0ea5e9"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
