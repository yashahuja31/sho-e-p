# ShoeP | Sneaker Authenticator & Marketplace Aggregator

ShoeP is a premium, modern React + Vite web application built to serve as a sneaker marketplace aggregator and authenticity checker. Users can search for shoes by name or upload a photo of a shoe to instantly recognize it using AI. ShoeP aggregates listings from major online marketplaces (such as StockX, GOAT, eBay, and brand stores) to show prices, shipping details, and seller safety tiers, with interactive filtering capabilities.

---

## 🚀 Key Features

* **Visual AI Recognition Engine**: Supports drag-and-drop image uploads with analysis state animations. Automatically queries the **Google Gemini 3.5 Flash API** (using `@google/generative-ai`) via your backend environment keys, falling back to a local simulator.
* **Production Clerk & OAuth Authentication**: Integrated with Clerk using `@clerk/clerk-react` and wrapped with `<ClerkProvider>` to handle production login sessions. Features a developer sandbox fallback with strict email validation and simulated Google/GitHub OAuth login actions.
* **Generative Vector Sneaker Engine**: Generates custom, brand-appropriate (Swoosh, Jumpman, 3-stripes, "N") and name-hashed vector sneaker illustrations on the fly for all 963 models in the catalog, ensuring each shoe has its own individual visual styling.
* **Dynamic Merchant Aggregator**: Lists current available offers, discount indicators, and custom trust score badges ("Safe", "Caution", "Unsafe") based on merchant rating metrics.
* **Marketplace Filter & Sort System**: Allows users to filter offers by Brand, Maximum Price, Sale Status, and Seller Safety. Supports sorting by price, quantity in stock, and seller ratings.
* **Authenticity Scorecard**: Detailed validation metrics showing a circular confidence percentage and checklist results (e.g. heel shapes, stitching consistency, sole textures, box tags).
* **Price History Graphs**: Visual historical price charts built with pure CSS and hover value tooltips to display resell value fluctuations.

---

## 🛠️ Technology Stack

* **Build Tool**: Vite (v8.1.4)
* **Framework**: React (v19+)
* **Authentication**: Clerk React SDK (`@clerk/clerk-react`)
* **AI Package**: Google GenAI SDK (`@google/generative-ai` with `gemini-3.5-flash`)
* **Styling**: Vanilla CSS (CSS variables, dark mode styles, glassmorphic filters, transition micro-animations)
* **Icons**: Lucide React

---

## 📂 File Architecture

The project structure is organized as follows:

```text
/
├── index.html              # Main HTML template containing SEO title/description tags
├── package.json            # Scripts and package dependency definitions
├── README.md               # Project documentation (this file)
├── .env                    # Environment credentials (Clerk publishable keys, Gemini key)
└── src/
    ├── main.jsx            # Application mount point wrapped in ClerkProvider
    ├── App.jsx             # Core state coordinator (manages auth sessions, queries, and modals)
    ├── index.css           # Global design system (variables, layouts, glassmorphism, responsive grid)
    ├── data/
    │   ├── shoeDatabase.js # Mock shoe catalog database, search functions, and Gemini API handlers
    │   ├── shoeImageGenerator.js # Generative Vector Sneaker engine (SVG generator)
    │   └── parsed_shoes.json # 963 sneaker models parsed from Sneakers123
    └── components/
        ├── Auth.jsx        # Clerk auth wrapper and simulated developer sandbox forms
        ├── Navigation.jsx  # Top bar with user profile actions (Clerk UserButton) and theme toggles
        ├── SearchArea.jsx  # Search inputs, and visual drag-and-drop file dropzone
        ├── FilterPanel.jsx # Sidebar filters (price ranges, sorting, brands, toggles)
        ├── ResultsGrid.jsx # Aggregator offer cards, seller tables, and checkout links
        └── DetailModal.jsx # Specifications modal, circular authenticity score, and CSS pricing graphs
```

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v20.19+ or v22.12+ recommended).

### 2. Configure Environment Variables
Create a `.env` file at the root directory of the project:
```env
# Clerk Authentication Publishable Key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Installation
Navigate to the root directory and install dependencies:
```bash
npm install
```

*Note: If you run into native binding issues with `rolldown` on Windows, install the platform-specific package:*
```bash
npm install @rolldown/binding-win32-x64-msvc
```

### 4. Run Development Server
Start the local server:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

### 5. Build for Production
To compile and optimize the files for deployment:
```bash
npm run build
```
The build outputs will be saved to the `/dist` directory.

---

## 🧠 Setting Up Live Gemini API Recognition

By default, the application runs on a **high-fidelity local simulator** that maps uploaded images or keywords to corresponding shoes in the database. 

To enable real-time visual recognition using **Google Gemini 3.5 Flash**:
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Paste the key inside your `.env` file under `VITE_GEMINI_API_KEY`.
3. Restart your dev server. The app will automatically route image recognition and global shoe search through your Gemini model in the background with zero-configuration in the frontend!

---

## 👟 Database Schema

To add more shoes or modify resell listings, open `src/data/shoeDatabase.js`. Products must match the following schema:

```javascript
{
  id: "unique-shoe-id",
  name: "Shoe Model Name",
  brand: "Brand Name (e.g. Nike)",
  styleCode: "Product Style Code",
  releaseDate: "YYYY-MM-DD",
  colorway: "Color description",
  description: "Detailed description of materials, colors, and history.",
  rating: 4.8,            // Out of 5
  reviewsCount: 200,      // Number of user reviews
  retailPrice: 150,       // Original retail price
  primaryImage: "/images/your_image.png", // Assets served from /public or generative SVG data URL
  safetyReport: {
    authenticityScore: 95, // Percentage
    status: "Safe",       // "Safe", "Caution", "Unsafe"
    details: "Stitch patterns, labels, and heel shapes align with specs."
  },
  listings: [             // Array of merchant offers
    {
      id: "listing-id",
      merchant: "StockX",
      price: 210,         // Current resell price
      originalPrice: 210, // Original resell price (lower price triggers sale badges)
      discount: 0,        // Percent
      quantity: 5,        // Current stock available
      merchantRating: 4.8,
      safety: "Safe",     // Merchant verification status
      shippingDays: "3-5",
      link: "https://..."
    }
  ]
}
```
