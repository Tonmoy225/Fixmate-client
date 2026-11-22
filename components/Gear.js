// logo আর loader দুই জায়গায় এই gear-ই চলে। রঙ আসে text-color থেকে।
export default function Gear({ className = "", maskId = "gear-hole" }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <rect width="100" height="100" fill="white" />
          <circle cx="50" cy="50" r="13" fill="black" />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <circle cx="50" cy="50" r="30" />
        {[0, 45, 90, 135].map((angle) => (
          <rect
            key={angle}
            x="40"
            y="8"
            width="20"
            height="84"
            rx="4"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}