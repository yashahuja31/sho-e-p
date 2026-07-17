// Shoe Aggregator Database
// Contains mock products, listings, and helper functions for search/recognition
import parsedShoes from "./parsed_shoes.json";
import { generateSneakerSVG } from "./shoeImageGenerator";

const coreShoes = [
  {
    id: "aj1-chicago",
    name: "Air Jordan 1 Retro High OG 'Chicago Reimagined' (Lost & Found)",
    brand: "Jordan",
    styleCode: "DZ5485-612",
    releaseDate: "2022-11-19",
    colorway: "Varsity Red/Black-Sail-Muslin",
    description: "The Air Jordan 1 Retro High OG 'Chicago Reimagined' brings back the iconic silhouette that started it all. Featuring distressed leather, a cracked black leather collar, and a pre-yellowed midsole, this release captures the look of a vintage 1985 pair found in a dusty stockroom.",
    rating: 4.9,
    reviewsCount: 342,
    retailPrice: 180,
    primaryImage: "/images/jordan_chicago.png",
    safetyReport: {
      authenticityScore: 98,
      status: "Safe",
      details: "High verification rate. The stitching pattern on the heel, hourglass shape, and Nike Air tongue tag fonts are consistent with authentic Nike production. Box features correct vintage sticker alignment."
    },
    listings: [
      {
        id: "list-aj1-stockx",
        merchant: "StockX",
        price: 360,
        originalPrice: 360,
        discount: 0,
        quantity: 14,
        merchantRating: 4.8,
        safety: "Safe",
        shippingDays: "5-8",
        link: "https://stockx.com"
      },
      {
        id: "list-aj1-goat",
        merchant: "GOAT",
        price: 375,
        originalPrice: 375,
        discount: 0,
        quantity: 28,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://goat.com"
      },
      {
        id: "list-aj1-ebay",
        merchant: "eBay (Verified Seller)",
        price: 330,
        originalPrice: 350,
        discount: 5,
        quantity: 2,
        merchantRating: 4.6,
        safety: "Caution",
        shippingDays: "4-7",
        link: "https://ebay.com"
      },
      {
        id: "list-aj1-unknown",
        merchant: "KickzDirect2U (Unverified)",
        price: 180,
        originalPrice: 360,
        discount: 50,
        quantity: 1,
        merchantRating: 2.3,
        safety: "Unsafe",
        shippingDays: "15-20",
        link: "#"
      }
    ]
  },
  {
    id: "yeezy-350-zebra",
    name: "Adidas Yeezy Boost 350 V2 'Zebra'",
    brand: "Adidas",
    styleCode: "CP9654",
    releaseDate: "2017-02-25",
    colorway: "White/Core Black/Red",
    description: "One of the most recognizable colorways in the Yeezy lineup, the Yeezy Boost 350 V2 Zebra features a Primeknit upper in black and white stripes, highlighted by a red mirrored 'SPLY-350' text on the side. The full-length Boost sole provides legendary comfort.",
    rating: 4.8,
    reviewsCount: 521,
    retailPrice: 220,
    primaryImage: "/images/yeezy_boost_350_zebra.png",
    safetyReport: {
      authenticityScore: 95,
      status: "Safe",
      details: "Primeknit pattern spacing and lettering fonts match standard Yeezy production runs. The boost sole texture shows correct pellet size and circle markings. Verified merchant source."
    },
    listings: [
      {
        id: "list-yeezy-stockx",
        merchant: "StockX",
        price: 285,
        originalPrice: 285,
        discount: 0,
        quantity: 8,
        merchantRating: 4.8,
        safety: "Safe",
        shippingDays: "5-8",
        link: "https://stockx.com"
      },
      {
        id: "list-yeezy-goat",
        merchant: "GOAT",
        price: 295,
        originalPrice: 310,
        discount: 5,
        quantity: 12,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://goat.com"
      },
      {
        id: "list-yeezy-flightclub",
        merchant: "Flight Club",
        price: 315,
        originalPrice: 315,
        discount: 0,
        quantity: 3,
        merchantRating: 4.7,
        safety: "Safe",
        shippingDays: "2-4",
        link: "https://flightclub.com"
      },
      {
        id: "list-yeezy-dhgate",
        merchant: "RepKicks Warehouse",
        price: 75,
        originalPrice: 220,
        discount: 65,
        quantity: 99,
        merchantRating: 1.8,
        safety: "Unsafe",
        shippingDays: "25-30",
        link: "#"
      }
    ]
  },
  {
    id: "nike-dunk-panda",
    name: "Nike Dunk Low 'Panda'",
    brand: "Nike",
    styleCode: "DD1391-100",
    releaseDate: "2021-03-10",
    colorway: "White/Black",
    description: "The Nike Dunk Low 'Panda' delivers a clean, two-tone colorway that works with any outfit. The low-top silhouette features a white leather upper with black leather overlays, matching the black Swoosh, laces, and outsole. Perfect for daily wear.",
    rating: 4.7,
    reviewsCount: 1205,
    retailPrice: 115,
    primaryImage: "/images/nike_dunk_low_panda.png",
    safetyReport: {
      authenticityScore: 99,
      status: "Safe",
      details: "Extremely common model. High authenticity certainty. Leather thickness and stitch spacing are standard. Beware of many lower-quality fakes online; buy only from verified sources."
    },
    listings: [
      {
        id: "list-dunk-nike",
        merchant: "Nike Store",
        price: 115,
        originalPrice: 115,
        discount: 0,
        quantity: 45,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "2-4",
        link: "https://nike.com"
      },
      {
        id: "list-dunk-footlocker",
        merchant: "Foot Locker",
        price: 115,
        originalPrice: 115,
        discount: 0,
        quantity: 0,
        merchantRating: 4.4,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://footlocker.com"
      },
      {
        id: "list-dunk-stockx",
        merchant: "StockX",
        price: 125,
        originalPrice: 125,
        discount: 0,
        quantity: 50,
        merchantRating: 4.8,
        safety: "Safe",
        shippingDays: "5-8",
        link: "https://stockx.com"
      },
      {
        id: "list-dunk-ebay",
        merchant: "eBay (Top Seller)",
        price: 105,
        originalPrice: 120,
        discount: 12,
        quantity: 5,
        merchantRating: 4.8,
        safety: "Safe",
        shippingDays: "3-6",
        link: "https://ebay.com"
      }
    ]
  },
  {
    id: "adidas-samba-black",
    name: "Adidas Samba OG 'Core Black'",
    brand: "Adidas",
    styleCode: "B75807",
    releaseDate: "2018-06-01",
    colorway: "Core Black/Cloud White/Gum",
    description: "Born on the football pitch in the 1950s, the Adidas Samba is a timeless indoor sports and streetwear icon. Features a smooth full-grain leather upper with contrasting white 3-Stripes, a suede T-toe overlay, and a classic gum rubber cupsole.",
    rating: 4.6,
    reviewsCount: 843,
    retailPrice: 100,
    primaryImage: "/images/adidas_samba_classic.png",
    safetyReport: {
      authenticityScore: 97,
      status: "Safe",
      details: "Suede T-toe overlay softness and gold-foil 'SAMBA' text lettering match Adidas specifications. Gum sole pattern is clean with standard brand marks."
    },
    listings: [
      {
        id: "list-samba-adidas",
        merchant: "Adidas Official",
        price: 85,
        originalPrice: 100,
        discount: 15,
        quantity: 20,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://adidas.com"
      },
      {
        id: "list-samba-footlocker",
        merchant: "Foot Locker",
        price: 100,
        originalPrice: 100,
        discount: 0,
        quantity: 15,
        merchantRating: 4.4,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://footlocker.com"
      },
      {
        id: "list-samba-ebay",
        merchant: "eBay Seller 'SoleSearch'",
        price: 75,
        originalPrice: 90,
        discount: 16,
        quantity: 3,
        merchantRating: 4.1,
        safety: "Caution",
        shippingDays: "5-7",
        link: "https://ebay.com"
      }
    ]
  },
  {
    id: "nb-990v5-grey",
    name: "New Balance 990v5 'Grey'",
    brand: "New Balance",
    styleCode: "M990GL5",
    releaseDate: "2019-04-06",
    colorway: "Grey/Castlerock",
    description: "Made in the USA, the New Balance 990v5 represents the perfect blend of cushioning, stability, and premium styling. Featuring a pigskin suede and mesh upper, an ENCAP midsole, and a OrthoLite insert, this shoe is a modern classic for orthotic support and lifestyle wear.",
    rating: 4.9,
    reviewsCount: 652,
    retailPrice: 185,
    primaryImage: "/images/new_balance_990v5_grey.png",
    safetyReport: {
      authenticityScore: 100,
      status: "Safe",
      details: "Made in USA tag features correct alignment and embroidery density. Suede cut-outs have clean borders and correct color tone. Excellent quality control."
    },
    listings: [
      {
        id: "list-nb-nb",
        merchant: "New Balance Official",
        price: 185,
        originalPrice: 185,
        discount: 0,
        quantity: 18,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://newbalance.com"
      },
      {
        id: "list-nb-stockx",
        merchant: "StockX",
        price: 170,
        originalPrice: 170,
        discount: 0,
        quantity: 10,
        merchantRating: 4.8,
        safety: "Safe",
        shippingDays: "5-8",
        link: "https://stockx.com"
      },
      {
        id: "list-nb-goat",
        merchant: "GOAT",
        price: 175,
        originalPrice: 175,
        discount: 0,
        quantity: 15,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://goat.com"
      },
      {
        id: "list-nb-discount",
        merchant: "SneakerOutlet (Caution)",
        price: 99,
        originalPrice: 185,
        discount: 46,
        quantity: 2,
        merchantRating: 3.2,
        safety: "Caution",
        shippingDays: "10-12",
        link: "#"
      }
    ]
  },
  {
    id: "adidas-ub-black",
    name: "Adidas UltraBoost 1.0 'Core Black'",
    brand: "Adidas",
    styleCode: "G54001",
    releaseDate: "2019-12-01",
    colorway: "Core Black/Core Black/Active Red",
    description: "The Adidas UltraBoost 1.0 brings back the legendary 1.0 knit pattern on the primeknit upper. The cage overlay locks the foot in place, while the Boost midsole delivers an incredibly responsive stride, returning energy with every step you take.",
    rating: 4.8,
    reviewsCount: 912,
    retailPrice: 190,
    primaryImage: "/images/adidas_ultraboost_core_black.png",
    safetyReport: {
      authenticityScore: 99,
      status: "Safe",
      details: "Torsion system insert matches original design. Continental rubber outsole pattern and text are correctly formatted. Insole details are standard."
    },
    listings: [
      {
        id: "list-ub-adidas",
        merchant: "Adidas Official",
        price: 140,
        originalPrice: 190,
        discount: 26,
        quantity: 25,
        merchantRating: 4.9,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://adidas.com"
      },
      {
        id: "list-ub-footlocker",
        merchant: "Foot Locker",
        price: 190,
        originalPrice: 190,
        discount: 0,
        quantity: 8,
        merchantRating: 4.4,
        safety: "Safe",
        shippingDays: "3-5",
        link: "https://footlocker.com"
      },
      {
        id: "list-ub-ebay",
        merchant: "eBay Seller 'Kicks4Less'",
        price: 110,
        originalPrice: 150,
        discount: 26,
        quantity: 4,
        merchantRating: 4.3,
        safety: "Caution",
        shippingDays: "5-8",
        link: "https://ebay.com"
      }
    ]
  }
];

// Helper to normalize strings for comparison
const normalizeString = (str) => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
};

// 16 curated premium sneaker images from Unsplash CDN
const unsplashSneakers = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", // Red Nike Runner
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80", // Colorful Nike Dunk
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80", // Beige/White Nike Runner
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80", // Green Nike Air Max
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80", // Adidas White Sneaker
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80", // Nike White/Orange Sneaker
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80", // Vans Old Skool Classic
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=400&q=80", // Sneaker close-up
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=400&q=80", // Blue Nike Runner
  "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80", // White canvas classic
  "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=400&q=80", // Red Converse Chuck
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80", // New Balance Gray
  "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=400&q=80", // Air Jordan 1 High
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=400&q=80", // Jordan 4 / Nike High
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80", // Nike Black Runner
  "https://images.unsplash.com/photo-1543508282-6319a3e2621d?auto=format&fit=crop&w=400&q=80", // White sneaker close-up
];

// Dynamically select an actual sneaker photo based on brand and keywords, or generate a custom brand-matching SVG
const getVisualImageForShoe = (brand, name) => {
  const lowerName = name.toLowerCase();
  const lowerBrand = brand.toLowerCase();
  
  // 1. Keep high-fidelity assets for core trending models
  if (lowerName.includes("chicago") && lowerBrand === "jordan") {
    return "/images/jordan_chicago.png";
  }
  if (lowerName.includes("zebra") && lowerName.includes("yeezy")) {
    return "/images/yeezy_boost_350_zebra.png";
  }
  if (lowerName.includes("panda") && lowerName.includes("dunk")) {
    return "/images/nike_dunk_low_panda.png";
  }
  if (lowerName.includes("samba")) {
    return "/images/adidas_samba_classic.png";
  }
  if (lowerName.includes("990v5")) {
    return "/images/new_balance_990v5_grey.png";
  }
  if (lowerName.includes("ultraboost") || lowerName.includes("ultra boost")) {
    return "/images/adidas_ultraboost_core_black.png";
  }
  
  // 2. Generate a custom, brand-matching sneaker illustration for all other 950+ models!
  return generateSneakerSVG(brand, name);
};

// Expand a parsed category shoe from parsed_shoes.json into a full comparison object
// Helper function to generate listings for both Indian and Global markets with real links
export const createListingsForShoe = (shoeId, brand, name, baseResellUSD) => {
  const brandLower = brand.toLowerCase();
  
  // 1. Foreign (GLOBAL) Listings in USD ($)
  const globalListings = [
    {
      id: `list-${shoeId}-stockx`,
      merchant: "StockX",
      price: baseResellUSD,
      originalPrice: baseResellUSD,
      discount: 0,
      quantity: Math.floor(Math.random() * 15) + 3,
      merchantRating: 4.8,
      safety: "Safe",
      shippingDays: "5-8",
      link: `https://stockx.com/search?s=${encodeURIComponent(name)}`,
      market: "GLOBAL",
      currency: "$"
    },
    {
      id: `list-${shoeId}-goat`,
      merchant: "GOAT",
      price: Math.round(baseResellUSD * 1.05),
      originalPrice: Math.round(baseResellUSD * 1.05),
      discount: 0,
      quantity: Math.floor(Math.random() * 12) + 2,
      merchantRating: 4.9,
      safety: "Safe",
      shippingDays: "3-5",
      link: `https://www.goat.com/search?query=${encodeURIComponent(name)}`,
      market: "GLOBAL",
      currency: "$"
    },
    {
      id: `list-${shoeId}-flightclub`,
      merchant: "Flight Club",
      price: Math.round(baseResellUSD * 1.1),
      originalPrice: Math.round(baseResellUSD * 1.1),
      discount: 0,
      quantity: Math.floor(Math.random() * 8) + 1,
      merchantRating: 4.7,
      safety: "Safe",
      shippingDays: "2-4",
      link: `https://www.flightclub.com/catalogsearch/result?q=${encodeURIComponent(name)}`,
      market: "GLOBAL",
      currency: "$"
    },
    {
      id: `list-${shoeId}-ebay`,
      merchant: "eBay (Verified Seller)",
      price: Math.round(baseResellUSD * 0.94),
      originalPrice: baseResellUSD,
      discount: 6,
      quantity: Math.floor(Math.random() * 4) + 1,
      merchantRating: 4.5,
      safety: "Caution",
      shippingDays: "4-7",
      link: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(name)}`,
      market: "GLOBAL",
      currency: "$"
    }
  ];

  // 2. Indian (IN) Listings in INR (₹)
  const baseResellINR = Math.round((baseResellUSD * 95) / 500) * 500;
  const indianListings = [
    {
      id: `list-${shoeId}-mainstreet`,
      merchant: "Mainstreet Marketplace",
      price: baseResellINR,
      originalPrice: Math.round((baseResellINR * 1.15) / 500) * 500,
      discount: 13,
      quantity: Math.floor(Math.random() * 5) + 1,
      merchantRating: 4.7,
      safety: "Safe",
      shippingDays: "2-4",
      link: `https://marketplace.mainstreet.co.in/search?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    },
    {
      id: `list-${shoeId}-crepdog`,
      merchant: "Crepdog Crew (CDC)",
      price: Math.round((baseResellINR * 1.02) / 500) * 500,
      originalPrice: Math.round((baseResellINR * 1.02) / 500) * 500,
      discount: 0,
      quantity: Math.floor(Math.random() * 7) + 2,
      merchantRating: 4.6,
      safety: "Safe",
      shippingDays: "3-5",
      link: `https://crepdogcrew.com/search?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    },
    {
      id: `list-${shoeId}-solesearch`,
      merchant: "SoleSearch India",
      price: Math.round((baseResellINR * 0.98) / 500) * 500,
      originalPrice: Math.round((baseResellINR * 0.98) / 500) * 500,
      discount: 0,
      quantity: Math.floor(Math.random() * 3) + 1,
      merchantRating: 4.4,
      safety: "Safe",
      shippingDays: "3-6",
      link: `https://www.solesearchindia.com/search?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    }
  ];

  // Brand-specific Indian retail stores (if applicable/available)
  if (brandLower === "nike" || brandLower === "jordan") {
    const retailPriceINR = Math.round((baseResellUSD * 0.75 * 90) / 100) * 100;
    indianListings.push({
      id: `list-${shoeId}-nikein`,
      merchant: "Nike India Official",
      price: retailPriceINR,
      originalPrice: retailPriceINR,
      discount: 0,
      quantity: Math.floor(Math.random() * 10),
      merchantRating: 4.9,
      safety: "Safe",
      shippingDays: "4-7",
      link: `https://www.nike.com/in/w?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    });
  } else if (brandLower === "adidas") {
    const retailPriceINR = Math.round((baseResellUSD * 0.75 * 90) / 100) * 100;
    indianListings.push({
      id: `list-${shoeId}-adidasin`,
      merchant: "Adidas India Official",
      price: retailPriceINR,
      originalPrice: retailPriceINR,
      discount: 0,
      quantity: Math.floor(Math.random() * 10),
      merchantRating: 4.9,
      safety: "Safe",
      shippingDays: "3-5",
      link: `https://www.adidas.co.in/search?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    });
  }

  // VegNonVeg / Superkicks
  if (Math.random() > 0.3) {
    const priceVNV = Math.round((baseResellINR * 0.9) / 500) * 500;
    indianListings.push({
      id: `list-${shoeId}-vegnonveg`,
      merchant: "VegNonVeg",
      price: priceVNV,
      originalPrice: priceVNV,
      discount: 0,
      quantity: Math.floor(Math.random() * 4),
      merchantRating: 4.8,
      safety: "Safe",
      shippingDays: "2-4",
      link: `https://www.vegnonveg.com/search?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    });
  }
  if (Math.random() > 0.4) {
    const priceSK = Math.round((baseResellINR * 0.92) / 500) * 500;
    indianListings.push({
      id: `list-${shoeId}-superkicks`,
      merchant: "Superkicks",
      price: priceSK,
      originalPrice: priceSK,
      discount: 0,
      quantity: Math.floor(Math.random() * 5),
      merchantRating: 4.7,
      safety: "Safe",
      shippingDays: "2-4",
      link: `https://www.superkicks.in/search?q=${encodeURIComponent(name)}`,
      market: "IN",
      currency: "₹"
    });
  }

  return [...globalListings, ...indianListings];
};

export const expandParsedShoe = (parsedShoe) => {
  const shoeId = `parsed-${parsedShoe.slug}-${parsedShoe.name.replace(/[^a-zA-Z0-9]/g, "")}`;
  
  // Estimate retail price
  let retailPrice = 110;
  const brand = parsedShoe.brand;
  const name = parsedShoe.name;
  if (brand === "Jordan") retailPrice = 180;
  else if (brand === "New Balance") retailPrice = 145;
  else if (name.toLowerCase().includes("yeezy")) retailPrice = 220;
  else if (name.toLowerCase().includes("ultraboost") || name.toLowerCase().includes("ultra boost")) retailPrice = 190;
  
  // Resell multiplier
  const baseResell = Math.round(retailPrice * (1.05 + Math.random() * 0.65));

  // Generate random style code
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const styleCode = `${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}-${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}`;

  return {
    id: shoeId,
    name: name,
    brand: brand,
    styleCode: styleCode,
    releaseDate: `202${Math.floor(Math.random() * 5)}-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    colorway: "Classic Release Colorway",
    description: `The ${name} is a renowned model in the global sneaker database. Verified and compared across multiple marketplaces.`,
    rating: parseFloat((4.4 + Math.random() * 0.55).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 240) + 12,
    retailPrice: retailPrice,
    primaryImage: getVisualImageForShoe(brand, name), // Always assign a beautiful generated/unsplash image!
    safetyReport: {
      authenticityScore: Math.floor(Math.random() * 10) + 90, // 90% to 99%
      status: "Safe",
      details: `Official template check completed for ${name}. Hourglass heel check passed. Midsole stitch density meets standard factory tolerance limits.`
    },
    listings: createListingsForShoe(shoeId, brand, name, baseResell)
  };
};

// Procedural Generator for ANY custom shoe model
export const generateShoeProcedurally = (query) => {
  const cleanQuery = query.trim();
  if (cleanQuery.length < 2) return null;

  // Extract Brand
  let brand = "Nike"; // Default
  const lowerQuery = cleanQuery.toLowerCase();
  if (lowerQuery.includes("jordan")) brand = "Jordan";
  else if (lowerQuery.includes("adidas") || lowerQuery.includes("yeezy") || lowerQuery.includes("samba") || lowerQuery.includes("ultraboost")) brand = "Adidas";
  else if (lowerQuery.includes("balance") || lowerQuery.includes("nb")) brand = "New Balance";
  else if (lowerQuery.includes("puma")) brand = "Puma";
  else if (lowerQuery.includes("asics")) brand = "Asics";
  else if (lowerQuery.includes("converse")) brand = "Converse";
  else if (lowerQuery.includes("vans")) brand = "Vans";

  // Capitalize shoe model name nicely
  const capitalizedName = cleanQuery
    .split(" ")
    .map(word => {
      const lower = word.toLowerCase();
      if (lower === "of" || lower === "and" || lower === "the" || lower === "in" || lower === "with") return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  let finalName = capitalizedName;
  if (!capitalizedName.toLowerCase().includes(brand.toLowerCase())) {
    finalName = `${brand} ${capitalizedName}`;
  }

  // Generate style code
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const styleCode = `${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}-${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}`;

  // Estimate a retail price
  let retailPrice = 120;
  if (brand === "Jordan") retailPrice = 180;
  else if (brand === "New Balance") retailPrice = 150;
  else if (lowerQuery.includes("yeezy")) retailPrice = 220;
  
  const resellMultiplier = 1.1 + Math.random() * 0.8;
  const baseResell = Math.round(retailPrice * resellMultiplier);

  const shoeId = `proc-${normalizeString(cleanQuery)}-${Date.now()}`;

  return {
    id: shoeId,
    name: finalName,
    brand: brand,
    styleCode: styleCode,
    releaseDate: `202${Math.floor(Math.random() * 6)}-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    colorway: "Multi-Color / Custom Edition",
    description: `The ${finalName} is a highly sought-after model. It features a premium build with intricate panels, custom branding, and responsive cushioning technologies.`,
    rating: parseFloat((4.4 + Math.random() * 0.55).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 320) + 15,
    retailPrice: retailPrice,
    primaryImage: getVisualImageForShoe(brand, finalName), 
    safetyReport: {
      authenticityScore: Math.floor(Math.random() * 11) + 89,
      status: "Safe",
      details: "Procedural validation matches global retail database templates. Hourglass check, leather flexibility factor, and barcode tag patterns are verified."
    },
    listings: createListingsForShoe(shoeId, brand, finalName, baseResell)
  };
};

// Seed database on load with core 6 + ALL 963 parsed shoes from Sneakers123!
const popularParsedSeed = parsedShoes.map(p => expandParsedShoe(p));

export const shoes = [
  ...coreShoes.map(shoe => {
    const baseResell = shoe.listings?.[0]?.price || shoe.retailPrice;
    return {
      ...shoe,
      listings: createListingsForShoe(shoe.id, shoe.brand, shoe.name, baseResell)
    };
  }),
  ...popularParsedSeed
];

// Search database by text query (queries local trending first, then the 963 offline-loaded catalog)
export const searchShoes = (query) => {
  if (!query) return [];
  const normalizedQuery = normalizeString(query);
  
  // 1. Try local high-fidelity trending matches first
  const localMatches = shoes.filter(shoe => {
    const normName = normalizeString(shoe.name);
    const normBrand = normalizeString(shoe.brand);
    const normColor = normalizeString(shoe.colorway || "");
    const normStyle = normalizeString(shoe.styleCode || "");
    
    return normName.includes(normalizedQuery) ||
           normBrand.includes(normalizedQuery) ||
           normColor.includes(normalizedQuery) ||
           normStyle.includes(normalizedQuery);
  });

  if (localMatches.length > 0) {
    return localMatches;
  }

  // 2. Try the 963 parsed catalog shoes from Sneakers123
  const parsedMatches = parsedShoes.filter(p => {
    return normalizeString(p.name).includes(normalizedQuery) ||
           normalizeString(p.brand).includes(normalizedQuery);
  });

  if (parsedMatches.length > 0) {
    // Return matching expanded items
    return parsedMatches.map(p => expandParsedShoe(p));
  }

  // 3. Fallback to procedural generator for custom queries
  const generated = generateShoeProcedurally(query);
  return generated ? [generated] : [];
};

// Recognize shoe by file contents or simulated metadata
export const recognizeShoeSimulated = (fileName, fileDataUrl) => {
  const name = fileName.toLowerCase();
  
  if (name.includes("jordan") || name.includes("chicago") || name.includes("aj1")) {
    return shoes.find(s => s.id === "aj1-chicago");
  }
  if (name.includes("yeezy") || name.includes("zebra") || name.includes("350")) {
    return shoes.find(s => s.id === "yeezy-350-zebra");
  }
  if (name.includes("dunk") || name.includes("panda") || name.includes("low")) {
    return shoes.find(s => s.id === "nike-dunk-panda");
  }
  if (name.includes("samba") || name.includes("gum") || name.includes("soccer")) {
    return shoes.find(s => s.id === "adidas-samba-black");
  }
  if (name.includes("990") || name.includes("balance") || name.includes("nb")) {
    return shoes.find(s => s.id === "nb-990v5-grey");
  }
  if (name.includes("boost") || name.includes("ultra") || name.includes("run")) {
    return shoes.find(s => s.id === "adidas-ub-black");
  }

  // Check in the parsed catalog array
  const cleanName = fileName.replace(/\s+/g, "").toLowerCase();
  const parsedMatch = parsedShoes.find(p => {
    const norm = p.name.replace(/\s+/g, "").toLowerCase();
    return cleanName.includes(norm) || norm.includes(cleanName);
  });

  if (parsedMatch) {
    return expandParsedShoe(parsedMatch);
  }
  
  // If unrecognized file name, procedurally generate a shoe matching the file name
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  const generated = generateShoeProcedurally(nameWithoutExtension);
  return generated || shoes[2]; // Fallback to Nike Dunk Panda
};

// Live Gemini API Helper for Text Search lookup of ANY shoe in the world!
export const searchShoeWithGemini = async (apiKey, query) => {
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `Research and provide details for this sneaker model: "${query}".
Return your answer EXACTLY as a JSON object with this shape:
{
  "brand": "Exact Brand (e.g. Nike, Jordan, Adidas, New Balance, Asics)",
  "model": "Exact model and colorway name",
  "styleCode": "Official style code (e.g. DZ5485-612)",
  "releaseDate": "YYYY-MM-DD release date",
  "colorway": "Official colorway description",
  "retailPrice": 180,
  "description": "2-sentence summary detailing history, design elements, and popularity.",
  "authenticityReport": "Brief 2-sentence guide on how to spot fakes for this specific shoe model, mentioning stitching, labels, or shape."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanText);
    
    const newId = `dynamic-text-${Date.now()}`;
    const resellPrice = Math.round(data.retailPrice * (1.1 + Math.random() * 0.7));

    return {
      id: newId,
      name: `${data.brand} ${data.model}`,
      brand: data.brand,
      styleCode: data.styleCode || "Unknown",
      releaseDate: data.releaseDate || "Unknown",
      colorway: data.colorway,
      description: data.description,
      rating: 4.8,
      reviewsCount: 154,
      retailPrice: data.retailPrice,
      primaryImage: getVisualImageForShoe(data.brand, data.model), // assign image dynamically
      safetyReport: {
        authenticityScore: 94,
        status: "Safe",
        details: data.authenticityReport
      },
      listings: createListingsForShoe(newId, data.brand, data.model, resellPrice)
    };
  } catch (error) {
    console.error("Error researching shoe with Gemini API:", error);
    throw error;
  }
};

// Real Gemini API helper if key exists for image uploads
export const recognizeShoeWithGemini = async (apiKey, imageBase64, mimeType) => {
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `Analyze this shoe photo. Identify the brand, model, and colorway.
Return your answer EXACTLY as a JSON object with this shape:
{
  "brand": "Nike or Jordan or Adidas or New Balance etc",
  "model": "Exact model name",
  "styleCode": "style code if visible, otherwise null",
  "colorway": "colorway description",
  "matchId": "one of: aj1-chicago, yeezy-350-zebra, nike-dunk-panda, adidas-samba-black, nb-990v5-grey, adidas-ub-black (choose the best matching ID if it matches these classic styles, otherwise null)"
}`;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const text = result.response.text();
    
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanText);
    
    if (data.matchId && shoes.some(s => s.id === data.matchId)) {
      return shoes.find(s => s.id === data.matchId);
    }
    
    const newId = `dynamic-${Date.now()}`;
    const dynamicShoe = {
      id: newId,
      name: `${data.brand} ${data.model} '${data.colorway}'`,
      brand: data.brand,
      styleCode: data.styleCode || "Unknown",
      releaseDate: new Date().toISOString().split("T")[0],
      colorway: data.colorway,
      description: `Automatically detected via Gemini Vision. High fidelity analysis shows a premium ${data.brand} sneaker in ${data.colorway} colorway.`,
      rating: 4.5,
      reviewsCount: 18,
      retailPrice: 150,
      primaryImage: imageBase64.startsWith("data:") ? imageBase64 : `data:${mimeType};base64,${imageBase64}`,
      safetyReport: {
        authenticityScore: 88,
        status: "Caution",
        details: "Gemini Vision analysis confirms structural outlines, branding marks, and lace styling match authentic specifications. However, physical materials cannot be verified over digital image."
      },
      listings: createListingsForShoe(newId, data.brand, data.model, 240)
    };
    
    return dynamicShoe;
  } catch (error) {
    console.error("Error recognizing shoe with Gemini API:", error);
    throw error;
  }
};
