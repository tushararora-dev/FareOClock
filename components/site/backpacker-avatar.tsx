import { cn } from "@/lib/utils";

export function BackpackerAvatar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 145"
      className={cn("size-full", className)}
      aria-label="Backpacker Traveller Avatar"
    >
      <defs>
        {/* Soft studio passport photo backdrop */}
        <linearGradient id="passport-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f4eb" />
          <stop offset="100%" stopColor="#ebe1cf" />
        </linearGradient>

        {/* Vintage canvas backpack */}
        <linearGradient id="pack-canvas" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4a373" />
          <stop offset="100%" stopColor="#b07d4f" />
        </linearGradient>

        {/* Adventure roll on pack top */}
        <linearGradient id="pack-roll" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c2410c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>

        {/* Denim / navy traveller jacket (replaces all the heavy green!) */}
        <linearGradient id="travel-jacket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c4c6e" />
          <stop offset="100%" stopColor="#1a3149" />
        </linearGradient>

        {/* Natural healthy skin tone */}
        <linearGradient id="skin-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fad4bd" />
          <stop offset="100%" stopColor="#e8b699" />
        </linearGradient>

        {/* Hair shading */}
        <linearGradient id="hair-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#382d26" />
          <stop offset="100%" stopColor="#1c1613" />
        </linearGradient>

        {/* Leather strap gradient */}
        <linearGradient id="leather-strap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#542c16" />
          <stop offset="100%" stopColor="#331709" />
        </linearGradient>
      </defs>

      {/* 1. Passport Studio Background */}
      <rect width="120" height="145" fill="url(#passport-bg)" />

      {/* Biometric subtle concentric target rings */}
      <circle
        cx="60"
        cy="65"
        r="54"
        fill="none"
        stroke="#1f5a45"
        strokeWidth="0.6"
        strokeDasharray="3 3"
        opacity="0.18"
      />
      <circle
        cx="60"
        cy="65"
        r="42"
        fill="none"
        stroke="#1f5a45"
        strokeWidth="0.6"
        opacity="0.12"
      />
      <circle cx="60" cy="65" r="1.8" fill="#1f5a45" opacity="0.25" />

      {/* 2. THE BACKPACK (Rucksack behind head & shoulders) */}
      {/* Orange/terracotta sleeping pad roll strapped to pack top */}
      <rect
        x="30"
        y="18"
        width="60"
        height="13"
        rx="6.5"
        fill="url(#pack-roll)"
        filter="drop-shadow(0 2px 2px rgba(0,0,0,0.12))"
      />
      {/* Nylon pack straps holding the roll */}
      <rect x="42" y="18" width="3.5" height="13" fill="#1c1917" rx="1" />
      <rect x="74" y="18" width="3.5" height="13" fill="#1c1917" rx="1" />

      {/* Canvas backpack body rising behind neck */}
      <path
        d="M 27 30 C 27 26, 93 26, 93 30 L 99 88 C 99 92, 21 92, 21 88 Z"
        fill="url(#pack-canvas)"
        filter="drop-shadow(0 2px 3px rgba(0,0,0,0.12))"
      />
      {/* Leather backpack top handle */}
      <path
        d="M 52 19 C 52 13, 68 13, 68 19"
        fill="none"
        stroke="#542c16"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Water bottle in left side mesh */}
      <rect x="18" y="52" width="9" height="24" rx="3.5" fill="#78716c" />
      <rect x="20" y="46" width="5" height="8" rx="2" fill="#38bdf8" />

      {/* Gold brass carabiner on right pack loop */}
      <rect
        x="93"
        y="50"
        width="7"
        height="13"
        rx="3.5"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.8"
      />

      {/* 3. TORSO / SHOULDERS (Navy Denim Travel Jacket) */}
      <path
        d="M 10 145 C 10 110, 32 94, 60 94 C 88 94, 110 110, 110 145 Z"
        fill="url(#travel-jacket)"
      />

      {/* White inner T-shirt V-neck */}
      <path d="M 46 94 L 60 112 L 74 94 Z" fill="#ffffff" />
      <path d="M 50 94 L 60 105 L 70 94 Z" fill="#e2e8f0" />

      {/* 4. LEATHER BACKPACK HARNESS STRAPS (Rich Saddle Brown) */}
      {/* Left shoulder strap */}
      <path
        d="M 31 94 L 37 145"
        stroke="url(#leather-strap)"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <path
        d="M 31 94 L 37 145"
        stroke="#78350f"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Right shoulder strap */}
      <path
        d="M 89 94 L 83 145"
        stroke="url(#leather-strap)"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <path
        d="M 89 94 L 83 145"
        stroke="#78350f"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Chest cross-strap & buckle */}
      <line
        x1="34"
        y1="118"
        x2="86"
        y2="118"
        stroke="#271810"
        strokeWidth="3.5"
      />
      <rect x="54" y="115" width="12" height="6" rx="1.5" fill="#f59e0b" />

      {/* Brass D-rings on straps */}
      <rect
        x="33"
        y="128"
        width="5"
        height="5"
        rx="1.5"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <rect
        x="82"
        y="128"
        width="5"
        height="5"
        rx="1.5"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />

      {/* 5. RETRO TRAVEL CAMERA (Hanging on thin leather neck strap) */}
      {/* Camera strap */}
      <path
        d="M 48 94 Q 60 114 60 118"
        fill="none"
        stroke="#78350f"
        strokeWidth="1.8"
      />
      <path
        d="M 72 94 Q 60 114 60 118"
        fill="none"
        stroke="#78350f"
        strokeWidth="1.8"
      />
      {/* Camera body */}
      <rect
        x="50"
        y="117"
        width="20"
        height="14"
        rx="2.5"
        fill="#1e293b"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      {/* Silver camera top plate */}
      <rect x="50" y="117" width="20" height="3" rx="1" fill="#cbd5e1" />
      {/* Camera lens */}
      <circle cx="60" cy="125" r="4.5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="60" cy="125" r="2.2" fill="#38bdf8" opacity="0.8" />
      {/* Red Leica-style dot */}
      <circle cx="53" cy="122" r="1" fill="#ef4444" />

      {/* 6. NECK & HEAD */}
      {/* Neck */}
      <path
        d="M 52 78 L 52 98 C 52 102, 68 102, 68 98 L 68 78 Z"
        fill="url(#skin-base)"
      />

      {/* Ears */}
      <circle cx="41" cy="65" r="4.5" fill="#e8b699" />
      <circle cx="79" cy="65" r="4.5" fill="#e8b699" />

      {/* Head shape */}
      <path
        d="M 43 54 C 43 40, 77 40, 77 54 C 77 74, 43 74, 43 54 Z"
        fill="url(#skin-base)"
      />

      {/* Friendly subtle adventurer smile */}
      <path
        d="M 55 74 Q 60 77 65 74"
        fill="none"
        stroke="#9a3412"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* 7. SUNGLASSES (Classic Black Wayfarers with sun glints) */}
      <path
        d="M 44 56 L 57 56 L 55 67 C 55 69, 46 69, 45 67 Z"
        fill="#0f172a"
      />
      <path
        d="M 63 56 L 76 56 L 75 67 C 75 69, 65 69, 64 67 Z"
        fill="#0f172a"
      />
      {/* Bridge */}
      <path
        d="M 56 58 Q 60 56 64 58"
        fill="none"
        stroke="#0f172a"
        strokeWidth="2.4"
      />
      {/* Sky reflection glints */}
      <line
        x1="46"
        y1="58"
        x2="52"
        y2="65"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="65"
        y1="58"
        x2="71"
        y2="65"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* 8. MODERN STYLED TRAVELLER HAIR */}
      {/* Textured wavy traveller hair */}
      <path
        d="M 40 50 C 39 36, 48 30, 60 30 C 72 30, 81 36, 80 50 C 77 42, 73 38, 64 36 C 54 34, 46 38, 40 50 Z"
        fill="url(#hair-grad)"
      />
      {/* Front fringe / side burns */}
      <path
        d="M 41 46 C 44 42, 52 40, 56 42 C 50 44, 44 48, 41 53 Z"
        fill="#2c221d"
      />
      <path
        d="M 79 46 C 76 42, 68 40, 64 42 C 70 44, 76 48, 79 53 Z"
        fill="#2c221d"
      />
    </svg>
  );
}