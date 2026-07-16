import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Navigation from "./components/Navigation";
import SearchArea from "./components/SearchArea";
import FilterPanel from "./components/FilterPanel";
import ResultsGrid from "./components/ResultsGrid";
import DetailModal from "./components/DetailModal";
import { shoes as initialShoes, searchShoes, recognizeShoeSimulated, recognizeShoeWithGemini, searchShoeWithGemini } from "./data/shoeDatabase";
import { ShieldCheck, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";

const DEFAULT_FILTERS = {
  sortBy: "price-asc",
  selectedBrand: "All",
  maxPrice: 600,
  onlySale: false,
  onlySafe: false
};

export default function App({ isClerkActive }) {
  const clerk = isClerkActive ? useClerk() : null;
  const { isLoaded, isSignedIn, user: currentClerkUser } = isClerkActive 
    ? useUser() 
    : { isLoaded: true, isSignedIn: false, user: null };

  const [localUser, setLocalUser] = useState(null);
  const [shoes, setShoes] = useState(initialShoes);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTitle, setSearchTitle] = useState("Trending Sneakers");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Load user session on mount (only for fallback mode)
  useEffect(() => {
    if (!isClerkActive) {
      const savedUser = localStorage.getItem("shoep_user");
      if (savedUser) {
        try {
          setLocalUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem("shoep_user");
        }
      }
    }
  }, [isClerkActive]);

  // Derive final user state
  const user = isClerkActive
    ? (isSignedIn && currentClerkUser ? {
        name: currentClerkUser.fullName || currentClerkUser.primaryEmailAddress?.emailAddress.split("@")[0] || "User",
        email: currentClerkUser.primaryEmailAddress?.emailAddress || "",
        avatarUrl: currentClerkUser.imageUrl,
        isClerk: true
      } : null)
    : localUser;

  const handleLogin = (userData) => {
    if (!isClerkActive) {
      localStorage.setItem("shoep_user", JSON.stringify(userData));
      setLocalUser(userData);
    }
  };

  const handleLogout = () => {
    if (isClerkActive) {
      clerk.signOut();
    } else {
      localStorage.removeItem("shoep_user");
      setLocalUser(null);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    // Check if it's in our local static database first (to avoid unnecessary API calls)
    const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "");
    const localMatches = initialShoes.filter(shoe => {
      return shoe.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalizedQuery) ||
             shoe.brand.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalizedQuery);
    });

    if (localMatches.length > 0) {
      setShoes(localMatches);
      setSearchTitle(`Search Results for "${query}" (${localMatches.length})`);
      return;
    }

    // Check if Gemini API Key is configured in environment
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const isApiKeyValid = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim() !== "";

    if (isApiKeyValid) {
      setIsAnalyzing(true);
      setSearchTitle(`AI Searching Global Databases for "${query}"...`);
      
      try {
        const result = await searchShoeWithGemini(apiKey.trim(), query);
        if (result) {
          setShoes([result]);
          setSearchTitle(`AI Discovered: ${result.name}`);
          setSelectedShoe(result); // Auto-open details modal for high-impact visual
        } else {
          setShoes([]);
          setSearchTitle(`No results found for "${query}"`);
        }
      } catch (err) {
        console.error("Gemini text search failed, falling back to procedural generator", err);
        // Fallback to local procedural generator
        const fallback = searchShoes(query);
        setShoes(fallback);
        setSearchTitle(`Search Results for "${query}" (Simulated)`);
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      // No API key, use local procedural generator
      const results = searchShoes(query);
      setShoes(results);
      setSearchTitle(`Search Results for "${query}" (Simulated)`);
    }
  };

  const handleRecognize = async (imageDetails) => {
    setIsAnalyzing(true);
    setSearchTitle("Analyzing uploaded image...");
    
    // Check if Gemini API Key is configured in environment
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const isApiKeyValid = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim() !== "";

    // Simulate AI model analysis delay (2.5s for realistic feel)
    setTimeout(async () => {
      try {
        let detectedShoe;
        if (isApiKeyValid) {
          detectedShoe = await recognizeShoeWithGemini(
            apiKey.trim(),
            imageDetails.base64,
            imageDetails.mimeType
          );
        } else {
          detectedShoe = recognizeShoeSimulated(imageDetails.fileName, imageDetails.fileDataUrl);
        }

        if (detectedShoe) {
          // If it's a dynamically generated shoe from Gemini, prepend it
          setShoes([detectedShoe]);
          setSearchTitle(`AI Recognized: ${detectedShoe.name}`);
          // Open detail modal automatically on recognition for high-impact UX
          setSelectedShoe(detectedShoe);
        }
      } catch (err) {
        alert("Gemini API Error. Falling back to local image recognition.\nDetail: " + err.message);
        const fallback = recognizeShoeSimulated(imageDetails.fileName, imageDetails.fileDataUrl);
        setShoes([fallback]);
        setSearchTitle(`Recognized (Fallback): ${fallback.name}`);
        setSelectedShoe(fallback);
      } finally {
        setIsAnalyzing(false);
      }
    }, 2500);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Filter products by brand at high-level
  const displayedShoes = shoes.filter(shoe => {
    if (filters.selectedBrand === "All") return true;
    return shoe.brand.toLowerCase() === filters.selectedBrand.toLowerCase();
  });

  // If user is not authenticated, show Auth Page
  if (!user) {
    return (
      <div className="app-container">
        <main className="main-content" style={{ justifyContent: "center" }}>
          <Auth onLogin={handleLogin} isClerkActive={isClerkActive} />
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navigation user={user} onLogout={handleLogout} isClerkActive={isClerkActive} />

      <main className="main-content">
        {/* Search & AI Dropzone Section */}
        <SearchArea 
          onSearch={handleSearch} 
          onRecognize={handleRecognize} 
          isAnalyzing={isAnalyzing} 
        />

        {/* Aggregator Title / Banner */}
        <div className="trending-section-header fade-in">
          <div className="section-title-left">
            {isAnalyzing ? (
              <Loader2 size={20} className="icon-cyan animate-spin" />
            ) : searchTitle.startsWith("Trending") ? (
              <TrendingUp size={20} className="icon-purple" />
            ) : searchTitle.startsWith("AI Discovered") || searchTitle.startsWith("AI Recognized") ? (
              <Sparkles size={20} className="icon-cyan" />
            ) : (
              <ShieldCheck size={20} className="icon-cyan" />
            )}
            <h3>{searchTitle}</h3>
          </div>
          {shoes.length !== initialShoes.length && (
            <button 
              type="button" 
              className="btn btn-secondary btn-clear-search"
              onClick={() => {
                setShoes(initialShoes);
                setSearchTitle("Trending Sneakers");
              }}
            >
              Reset Search & View All
            </button>
          )}
        </div>

        {/* Marketplace Filter + Grid Layout */}
        <div className="marketplace-layout">
          <FilterPanel 
            filters={filters} 
            setFilters={setFilters} 
            onReset={handleResetFilters} 
          />

          <div style={{ flex: 1, position: "relative" }}>
            {isAnalyzing && (
              <div className="search-loading-overlay glass-panel fade-in">
                <Loader2 size={36} className="icon-cyan animate-spin" />
                <p>AI Engine is fetching market listings and verifying authenticity...</p>
              </div>
            )}
            <ResultsGrid 
              shoes={displayedShoes} 
              filters={filters} 
              onSelectShoe={setSelectedShoe} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-bar glass-panel">
        <p>© 2026 SHOEP Aggregator Services. All merchant listings and product details are simulated for development demonstration.</p>
      </footer>

      {/* Detail Modal Overlay */}
      {selectedShoe && (
        <DetailModal 
          shoe={selectedShoe} 
          onClose={() => setSelectedShoe(null)} 
        />
      )}

      <style>{`
        .trending-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
        }

        .section-title-left h3 {
          font-size: 1.15rem;
          font-family: var(--font-mono);
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .btn-clear-search {
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
        }

        .footer-bar {
          margin: 3rem 1.5rem 1.5rem 1.5rem;
          padding: 1.25rem;
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-radius: 12px !important;
        }

        .search-loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 12, 20, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          z-index: 50;
          border-radius: 16px;
          min-height: 300px;
          text-align: center;
          padding: 2rem;
        }

        .search-loading-overlay p {
          font-family: var(--font-mono);
          color: var(--accent-primary);
          font-size: 0.95rem;
          font-weight: 600;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
