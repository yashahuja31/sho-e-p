import React from "react";
import { SlidersHorizontal, ArrowUpDown, ShieldCheck, Percent, DollarSign, RefreshCw } from "lucide-react";

export default function FilterPanel({ filters, setFilters, onReset }) {
  const brands = ["All", "Nike", "Jordan", "Adidas", "New Balance"];

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  const handleBrandChange = (brand) => {
    setFilters({ ...filters, selectedBrand: brand });
  };

  const handleCheckboxToggle = (field) => {
    setFilters({ ...filters, [field]: !filters[field] });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: parseInt(e.target.value, 10) });
  };

  return (
    <div className="filter-sidebar glass-panel fade-in">
      <div className="filter-header">
        <div className="filter-title">
          <SlidersHorizontal size={18} className="icon-cyan" />
          <h3>Search Filters</h3>
        </div>
        <button 
          type="button" 
          className="btn-reset-filters"
          onClick={onReset}
          title="Reset all filters"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      <div className="filter-section">
        <label className="filter-label">
          <ArrowUpDown size={14} /> Sort Merchant Listings
        </label>
        <select 
          className="form-input filter-select"
          value={filters.sortBy}
          onChange={handleSortChange}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="qty-desc">Quantity: High to Low</option>
          <option value="qty-asc">Quantity: Low to High</option>
          <option value="rating-desc">Seller Rating: High to Low</option>
        </select>
      </div>

      <div className="filter-divider"></div>

      <div className="filter-section">
        <label className="filter-label">Brands</label>
        <div className="brand-pill-grid">
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              className={`brand-pill ${filters.selectedBrand === brand ? "active" : ""}`}
              onClick={() => handleBrandChange(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-divider"></div>

      <div className="filter-section">
        <label className="filter-label">
          <DollarSign size={14} /> Max Merchant Price (${filters.maxPrice})
        </label>
        <div className="price-slider-wrapper">
          <input
            type="range"
            min="50"
            max="600"
            step="10"
            className="price-slider"
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
          <div className="slider-labels">
            <span>$50</span>
            <span>$600</span>
          </div>
        </div>
      </div>

      <div className="filter-divider"></div>

      <div className="filter-section toggle-filters">
        <label className="checkbox-filter-label">
          <input
            type="checkbox"
            checked={filters.onlySale}
            onChange={() => handleCheckboxToggle("onlySale")}
          />
          <span className="checkbox-text-wrapper">
            <Percent size={14} className="icon-purple" />
            <span>On Sale Only</span>
          </span>
        </label>

        <label className="checkbox-filter-label">
          <input
            type="checkbox"
            checked={filters.onlySafe}
            onChange={() => handleCheckboxToggle("onlySafe")}
          />
          <span className="checkbox-text-wrapper">
            <ShieldCheck size={14} className="icon-green" />
            <span>Safe Sellers Only</span>
          </span>
        </label>
      </div>

      <style>{`
        .filter-sidebar {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: sticky;
          top: 6rem;
        }

        .filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 0.75rem;
        }

        .filter-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-title h3 {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .icon-cyan {
          color: var(--accent-primary);
        }

        .btn-reset-filters {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color var(--transition-fast);
        }

        .btn-reset-filters:hover {
          color: var(--accent-primary);
        }

        .filter-section {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .filter-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .filter-select {
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          border-radius: 8px;
        }

        .filter-divider {
          height: 1px;
          background: var(--border-glass);
        }

        /* Brand Pills */
        .brand-pill-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .brand-pill {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .brand-pill:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }

        .brand-pill.active {
          background: var(--accent-gradient);
          color: #000;
          border-color: transparent;
          font-weight: 700;
        }

        /* Price Slider */
        .price-slider-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .price-slider {
          width: 100%;
          accent-color: var(--accent-primary);
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          margin: 0.5rem 0;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Checkbox Toggles */
        .toggle-filters {
          gap: 0.75rem;
        }

        .checkbox-filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .checkbox-filter-label:hover {
          color: var(--text-primary);
        }

        .checkbox-filter-label input {
          width: 15px;
          height: 15px;
          accent-color: var(--accent-primary);
        }

        .checkbox-text-wrapper {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .icon-purple {
          color: var(--accent-purple);
        }

        .icon-green {
          color: var(--color-safe);
        }
      `}</style>
    </div>
  );
}
