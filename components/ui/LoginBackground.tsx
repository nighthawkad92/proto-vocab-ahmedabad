export const LoginBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Define colors with very low opacity */}
          <style>{`
            .shape-primary { fill: #02A959; opacity: 0.05; }
            .shape-secondary { fill: #F59E0B; opacity: 0.08; }
            .shape-tertiary { fill: #2E94F1; opacity: 0.05; }
            .shape-neutral { fill: #B7BDC7; opacity: 0.04; }
            .shape-peach { fill: #F8BF5D; opacity: 0.06; }
          `}</style>
        </defs>

        {/* Large background circles */}
        <circle cx="120" cy="150" r="180" className="shape-neutral" />
        <circle cx="1320" cy="120" r="220" className="shape-tertiary" />
        <circle cx="200" cy="750" r="160" className="shape-secondary" />
        <circle cx="1200" cy="800" r="200" className="shape-primary" />

        {/* Medium shapes */}
        <circle cx="720" cy="100" r="100" className="shape-peach" />
        <circle cx="400" cy="450" r="140" className="shape-tertiary" />
        <circle cx="1000" cy="500" r="120" className="shape-neutral" />

        {/* Triangular/Polygonal shapes */}
        <polygon
          points="800,200 950,350 650,380"
          className="shape-primary"
        />
        <polygon
          points="300,600 200,750 420,720"
          className="shape-tertiary"
        />
        <polygon
          points="1100,650 1200,700 1050,750"
          className="shape-secondary"
        />

        {/* Organic leaf-like shapes using paths */}
        <path
          d="M 600 700 Q 650 650, 700 700 Q 650 750, 600 700"
          className="shape-primary"
        />
        <path
          d="M 250 300 Q 300 250, 350 300 Q 300 350, 250 300"
          className="shape-peach"
        />
        <path
          d="M 1150 400 Q 1200 350, 1250 400 Q 1200 450, 1150 400"
          className="shape-tertiary"
        />

        {/* Small accent circles */}
        <circle cx="500" cy="200" r="30" className="shape-secondary" />
        <circle cx="900" cy="700" r="40" className="shape-primary" />
        <circle cx="350" cy="500" r="25" className="shape-peach" />
        <circle cx="1100" cy="250" r="35" className="shape-neutral" />
        <circle cx="750" cy="450" r="20" className="shape-tertiary" />
        <circle cx="600" cy="150" r="28" className="shape-primary" />

        {/* Very small dots */}
        <circle cx="450" cy="350" r="12" className="shape-secondary" />
        <circle cx="850" cy="550" r="15" className="shape-peach" />
        <circle cx="300" cy="180" r="10" className="shape-tertiary" />
        <circle cx="1050" cy="150" r="14" className="shape-neutral" />
        <circle cx="200" cy="450" r="11" className="shape-primary" />
        <circle cx="1300" cy="600" r="13" className="shape-secondary" />
      </svg>
    </div>
  )
}
