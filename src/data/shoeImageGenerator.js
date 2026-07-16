// Generative Vector Sneaker Asset Engine
// Creates beautiful, unique, and brand-matching vector sneaker illustrations on-the-fly.
// Uses name hashing for deterministic colors and brand matching for custom side logos.

const stringToHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

// Generates a HSL color from a hash with adjustable saturation/lightness
const getHashedColor = (hash, offset = 0, s = 75, l = 50) => {
  const hue = (hash + offset) % 360;
  return `hsl(${hue}, ${s}%, ${l}%)`;
};

// Map names of shoes to color themes if they contain color keywords
const getColorFromKeywords = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("chicago") || lower.includes("red") || lower.includes("bred")) {
    return { primary: "#e63946", secondary: "#1d3557", accent: "#f1faee", sole: "#ffffff" };
  }
  if (lower.includes("zebra") || lower.includes("panda") || lower.includes("black/white") || lower.includes("core black")) {
    return { primary: "#111111", secondary: "#f5f5f7", accent: "#888888", sole: "#ffffff" };
  }
  if (lower.includes("grey") || lower.includes("gray") || lower.includes("castlerock") || lower.includes("triple black")) {
    return { primary: "#3a3d40", secondary: "#70757a", accent: "#bdc1c6", sole: "#202124" };
  }
  if (lower.includes("blue") || lower.includes("royal") || lower.includes("unc")) {
    return { primary: "#0077b6", secondary: "#90e0ef", accent: "#ffffff", sole: "#ffffff" };
  }
  if (lower.includes("green") || lower.includes("pine") || lower.includes("chlorophyll")) {
    return { primary: "#2a9d8f", secondary: "#e9c46a", accent: "#ffffff", sole: "#ffffff" };
  }
  if (lower.includes("cream") || lower.includes("sand") || lower.includes("sail") || lower.includes("tan")) {
    return { primary: "#f4f1de", secondary: "#dfd7c2", accent: "#3d405b", sole: "#f4f1de" };
  }
  return null;
};

export const generateSneakerSVG = (brand, name) => {
  const hash = stringToHash(name + brand);
  
  // 1. Resolve colors
  const keywordColors = getColorFromKeywords(name);
  const primaryColor = keywordColors ? keywordColors.primary : getHashedColor(hash, 0, 85, 45);
  const secondaryColor = keywordColors ? keywordColors.secondary : getHashedColor(hash, 120, 75, 60);
  const accentColor = keywordColors ? keywordColors.accent : getHashedColor(hash, 240, 90, 70);
  const soleColor = keywordColors ? keywordColors.sole : (hash % 2 === 0 ? "#ffffff" : "#1a1a1a");
  const collarColor = hash % 3 === 0 ? "#111111" : (hash % 3 === 1 ? "#ffffff" : secondaryColor);
  
  // 2. Resolve logo path based on brand
  const lowerBrand = brand.toLowerCase();
  let logoSvg = "";
  
  if (lowerBrand.includes("nike")) {
    // Nike Swoosh
    logoSvg = `<path d="M 120,110 C 130,105 160,95 190,115 C 205,125 210,128 220,110 C 190,122 150,124 130,116 Z" fill="${accentColor}" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.15))" />`;
  } else if (lowerBrand.includes("jordan")) {
    // Jumpman logo silhouette
    logoSvg = `
      <g transform="translate(145, 95) scale(0.65)">
        <path d="M12,2 C12,2.83 11.33,3.5 10.5,3.5 C9.67,3.5 9,2.83 9,2 C9,1.17 9.67,0.5 10.5,0.5 C11.33,0.5 12,1.17 12,2 Z
                 M16.5,4.5 L12.5,8 L15,16 L11.5,12.5 L10.5,12.5 L9.5,13.5 L7.5,16.5 L7.5,10.5 L6,8 L3.5,6.5 L6.5,6 L9.5,8.5 L10.5,5.5 L12.5,4.5 Z" 
              fill="${accentColor}" />
      </g>`;
  } else if (lowerBrand.includes("adidas") || name.toLowerCase().includes("yeezy")) {
    // Three stripes
    logoSvg = `
      <g transform="translate(130, 95) rotate(-25)">
        <rect x="0" y="0" width="6" height="24" rx="1" fill="${accentColor}" />
        <rect x="10" y="0" width="6" height="24" rx="1" fill="${accentColor}" />
        <rect x="20" y="0" width="6" height="24" rx="1" fill="${accentColor}" />
      </g>`;
  } else if (lowerBrand.includes("balance") || lowerBrand === "nb") {
    // "N" logo
    logoSvg = `
      <g transform="translate(135, 95) scale(1.1)">
        <path d="M 0,20 L 0,0 L 5,0 L 12,13 L 12,0 L 16,0 L 16,20 L 11,20 L 4,7 L 4,20 Z" fill="${accentColor}" font-weight="900" />
      </g>`;
  } else if (lowerBrand.includes("vans")) {
    // Vans side stripe
    logoSvg = `<path d="M 90,110 C 130,110 160,85 220,110" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="round" />`;
  } else if (lowerBrand.includes("converse") || lowerBrand.includes("star")) {
    // Converse Star
    logoSvg = `
      <g transform="translate(145, 95)">
        <circle cx="10" cy="10" r="12" fill="white" stroke="${accentColor}" stroke-width="2" />
        <path d="M10,2 L12.5,7.5 L18.5,8 L14,12 L15.5,18 L10,14.5 L4.5,18 L6,12 L1.5,8 L7.5,7.5 Z" fill="${accentColor}" transform="translate(0, 0) scale(1)" />
      </g>`;
  } else {
    // Generic racing stripes
    logoSvg = `
      <path d="M 110,105 C 130,95 170,95 200,108" fill="none" stroke="${accentColor}" stroke-width="4" stroke-linecap="round" />
      <path d="M 115,115 C 135,105 175,105 205,118" fill="none" stroke="${accentColor}" stroke-width="4" stroke-linecap="round" />
    `;
  }

  // 3. Build the full detailed sneaker SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="100%" height="100%">
      <defs>
        <!-- Gradients -->
        <linearGradient id="primaryGrad-${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primaryColor}" />
          <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.8" />
        </linearGradient>
        <linearGradient id="secondaryGrad-${hash}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${secondaryColor}" />
          <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.85" />
        </linearGradient>
        <linearGradient id="soleGrad-${hash}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${soleColor}" />
          <stop offset="100%" stop-color="${soleColor === '#ffffff' ? '#e1e1e1' : '#0d0d0d'}" />
        </linearGradient>
        
        <!-- Filters -->
        <filter id="dropShadow-${hash}" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.25" />
        </filter>
        <filter id="innerShadow-${hash}">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="linear" slope="1"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feOffset dx="0" dy="2"/>
          <feComposite operator="out" in2="SourceGraphic"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"/>
          <feBlend mode="multiply" in2="SourceGraphic"/>
        </filter>
      </defs>

      <!-- Background soft radial glow -->
      <circle cx="140" cy="110" r="100" fill="url(#primaryGrad-${hash})" opacity="0.06" filter="blur(20px)" />

      <!-- The Sneaker Group -->
      <g filter="url(#dropShadow-${hash})">
        <!-- Underlay / Sockliner collar -->
        <path d="M 80,68 C 88,60 102,52 118,52 C 122,52 125,58 126,62 C 124,72 108,82 92,82 C 84,82 80,75 80,68 Z" fill="${collarColor}" />
        
        <!-- Main body upper -->
        <path d="M 50,132 C 46,120 48,94 76,82 C 92,76 112,82 126,65 C 132,58 142,50 148,60 C 158,74 192,94 220,95 C 238,96 250,104 252,118 C 254,128 250,132 230,132 Z" fill="url(#primaryGrad-${hash})" />
        
        <!-- Toe cap guard panel -->
        <path d="M 215,96 C 228,97 246,104 251,114 C 253,121 251,130 242,132 L 210,132 C 214,124 212,108 215,96 Z" fill="url(#secondaryGrad-${hash})" opacity="0.95" />
        
        <!-- Heel support counter panel -->
        <path d="M 50,132 C 46,120 48,94 76,82 L 88,110 L 80,132 Z" fill="url(#secondaryGrad-${hash})" opacity="0.9" />
        
        <!-- Lacing mid-panel overlay -->
        <path d="M 108,82 C 114,84 135,76 148,60 C 152,65 174,86 170,100 C 165,116 115,124 100,118 Z" fill="url(#secondaryGrad-${hash})" />
        
        <!-- Laces (criss-cross lines) -->
        <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.85">
          <line x1="124" y1="78" x2="136" y2="70" />
          <line x1="133" y1="73" x2="145" y2="65" />
          <line x1="141" y1="67" x2="153" y2="60" />
          <line x1="116" y1="84" x2="124" y2="78" />
        </g>
        
        <!-- Brand Logo side panel -->
        ${logoSvg}
        
        <!-- Detailed stitching lines (dashed overlays) -->
        <path d="M 52,130 C 56,105 70,88 88,84" fill="none" stroke="${soleColor}" stroke-width="1" stroke-dasharray="2,3" opacity="0.4" />
        <path d="M 152,66 C 160,76 185,94 214,96" fill="none" stroke="${collarColor}" stroke-width="1" stroke-dasharray="2,2" opacity="0.3" />
        <path d="M 215,98 C 220,105 218,124 215,130" fill="none" stroke="${primaryColor}" stroke-width="1" stroke-dasharray="2,3" opacity="0.4" />
        
        <!-- Outsole / Midsole -->
        <path d="M 44,132 L 244,132 C 248,132 251,135 248,140 C 240,154 220,154 200,154 L 80,154 C 55,154 44,146 44,140 Z" fill="url(#soleGrad-${hash})" />
        
        <!-- Bottom grip tread layer -->
        <path d="M 46,148 L 242,148 C 245,148 247,150 245,152 C 241,155 235,156 220,156 L 68,156 C 53,156 46,152 46,148 Z" fill="${soleColor === '#ffffff' ? '#bbbbbb' : '#000000'}" />
        
        <!-- Midsole details (horizontal grooves / sport lines) -->
        <line x1="60" y1="138" x2="230" y2="138" stroke="${soleColor === '#ffffff' ? '#e2e2e2' : '#222222'}" stroke-width="1.5" />
        <line x1="85" y1="144" x2="115" y2="144" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round" opacity="0.75" />
        <line x1="125" y1="144" x2="145" y2="144" stroke="${secondaryColor}" stroke-width="3" stroke-linecap="round" opacity="0.75" />
      </g>
    </svg>
  `;
  
  // Encode as base64 data URL
  const base64 = typeof window !== 'undefined' 
    ? window.btoa(unescape(encodeURIComponent(svg))) 
    : Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};
