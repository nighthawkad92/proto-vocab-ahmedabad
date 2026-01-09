export const VocabPalLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        {/* Book shape */}
        <rect x="20" y="30" width="80" height="60" rx="4" fill="#02A959" />
        <rect x="25" y="35" width="70" height="50" rx="2" fill="#F6FEF7" />

        {/* Book spine */}
        <rect x="57" y="30" width="6" height="60" fill="#028E4B" />

        {/* Letter V */}
        <path
          d="M 40 45 L 47 65 L 54 45"
          stroke="#02A959"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Letter P */}
        <path
          d="M 70 45 L 70 65 M 70 45 L 80 45 Q 85 45 85 50 Q 85 55 80 55 L 70 55"
          stroke="#02A959"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Sparkle accent */}
        <circle cx="30" cy="25" r="3" fill="#F59E0B" />
        <circle cx="90" cy="25" r="3" fill="#F59E0B" />
        <circle cx="25" cy="95" r="2.5" fill="#2E94F1" />
        <circle cx="95" cy="95" r="2.5" fill="#2E94F1" />
      </svg>

      <h1 className="font-display text-4xl font-bold text-primary-600 tracking-wide">
        VocabPal
      </h1>
    </div>
  )
}
