import React, { useState, useEffect } from "react";
import { ExternalLink, ShieldCheck, ShieldAlert, ShoppingCart, Info, Star, Tag } from "lucide-react";

export default function ResultsGrid({ shoes, filters, onSelectShoe }) {
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset page count when search result set changes
  useEffect(() => {
    setVisibleCount(12);
  }, [shoes]);

  if (shoes.length === 0) {
    return (
      <div className="no-results glass-panel fade-in">
        <ShieldAlert size={48} className="icon-caution" />
        <h3>No Matching Sneakers Found</h3>
        <p>Try searching for "Jordan", "Yeezy", "Samba", "Panda", or "Boost". Alternatively, drag in any shoe photo!</p>
      </div>
    );
  }

  // Filter and sort listings for a shoe based on filters
  const getFilteredListings = (listings) => {
    return listings
      .filter((item) => {
        // Market Filter
        if (item.market !== filters.market) return false;
        // Price Filter
        if (item.price > filters.maxPrice) return false;
        // Sale Filter
        if (filters.onlySale && item.discount === 0) return false;
        // Safety Filter
        if (filters.onlySafe && item.safety !== "Safe") return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "qty-desc") return b.quantity - a.quantity;
        if (filters.sortBy === "qty-asc") return a.quantity - b.quantity;
        if (filters.sortBy === "rating-desc") return b.merchantRating - a.merchantRating;
        return 0;
      });
  };

  const visibleShoes = shoes.slice(0, visibleCount);

  return (
    <div className="results-container">
      {visibleShoes.map((shoe) => {
        const filteredListings = getFilteredListings(shoe.listings);
        
        // Find best price available
        const prices = filteredListings.map(l => l.price);
        const bestPrice = prices.length > 0 ? Math.min(...prices) : null;
        
        const displayRetailPrice = filters.market === "IN" 
          ? Math.round((shoe.retailPrice * 90) / 100) * 100 
          : shoe.retailPrice;
        const retailDiff = bestPrice ? bestPrice - displayRetailPrice : 0;
        
        return (
          <div key={shoe.id} className="shoe-result-card glass-panel fade-in">
            <div className="shoe-card-main">
              {/* Product Info & Visuals */}
              <div className="shoe-image-wrapper">
                {shoe.primaryImage ? (
                  <img 
                    src={shoe.primaryImage} 
                    alt={shoe.name} 
                    className="shoe-product-img"
                    onError={(e) => {
                      // Fallback to dynamic silhouette illustration if local image is missing
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="shoe-fallback-img" style={{ display: 'none' }}>
                  <span>👟</span>
                </div>
                {bestPrice && retailDiff < 0 && (
                  <div className="discount-tag">
                    <Tag size={12} /> Below Retail
                  </div>
                )}
              </div>

              <div className="shoe-details-section">
                <div className="brand-header">
                  <span className="shoe-brand-badge">{shoe.brand}</span>
                  <span className="style-code-label">Style: {shoe.styleCode}</span>
                </div>
                <h3 className="shoe-name-title" onClick={() => onSelectShoe(shoe)}>
                  {shoe.name}
                </h3>
                
                <div className="rating-row">
                  <div className="stars-wrapper">
                    <Star size={14} className="star-icon fill-gold" />
                    <span className="rating-val">{shoe.rating}</span>
                  </div>
                  <span className="reviews-count">({shoe.reviewsCount} reviews)</span>
                  <div className="divider-dot"></div>
                  <span className="retail-price-label">
                    Retail: {filters.market === "IN" ? `₹${displayRetailPrice.toLocaleString('en-IN')}` : `$${shoe.retailPrice}`}
                  </span>
                </div>

                <p className="shoe-desc-preview">{shoe.description}</p>
                
                <div className="safety-summary-box" onClick={() => onSelectShoe(shoe)}>
                  <span className="safety-label">Authenticity Check:</span>
                  <span className={`badge badge-${shoe.safetyReport.status.toLowerCase()}`}>
                    {shoe.safetyReport.status} ({shoe.safetyReport.authenticityScore}%)
                  </span>
                  <button type="button" className="btn-view-report-link">
                    <Info size={14} /> Full Report
                  </button>
                </div>
              </div>
            </div>

            {/* Merchant Listings Aggregator */}
            <div className="merchant-aggregator-section">
              <div className="aggregator-header">
                <h4>Available Marketplace Offers ({filteredListings.length})</h4>
                {bestPrice && (
                  <p className="best-price-badge">
                    Best Offer: <span className="best-price-val">
                      {filters.market === "IN" ? "₹" : "$"}{bestPrice.toLocaleString(filters.market === "IN" ? 'en-IN' : 'en-US')}
                    </span>
                  </p>
                )}
              </div>

              {filteredListings.length === 0 ? (
                <div className="no-merchant-offers">
                  <p>No listings match your filter criteria. Try expanding the price range or checking other brands.</p>
                </div>
              ) : (
                <div className="listings-table-container">
                  <table className="listings-table">
                    <thead>
                      <tr>
                        <th>Seller / Retailer</th>
                        <th>Availability</th>
                        <th>Authenticity</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredListings.map((listing) => {
                        const isSale = listing.price < listing.originalPrice;
                        
                        return (
                          <tr key={listing.id} className={`listing-row ${listing.safety.toLowerCase()}`}>
                            <td>
                              <div className="merchant-info">
                                <span className="merchant-name-txt">{listing.merchant}</span>
                                <span className="merchant-rating-lbl">★ {listing.merchantRating}</span>
                              </div>
                            </td>
                            <td>
                              <div className="qty-info">
                                {listing.quantity > 0 ? (
                                  <span className="qty-in-stock">{listing.quantity} available</span>
                                ) : (
                                  <span className="qty-out-of-stock">Out of stock</span>
                                )}
                                <span className="shipping-time-txt">Ships in {listing.shippingDays} days</span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge badge-${listing.safety.toLowerCase()}`}>
                                {listing.safety}
                              </span>
                            </td>
                            <td>
                              <div className="price-info">
                                {isSale ? (
                                  <>
                                    <span className="slashed-price">
                                      {listing.currency || "$"}{listing.originalPrice.toLocaleString(listing.currency === "₹" ? 'en-IN' : 'en-US')}
                                    </span>
                                    <span className="discounted-price">
                                      {listing.currency || "$"}{listing.price.toLocaleString(listing.currency === "₹" ? 'en-IN' : 'en-US')}
                                    </span>
                                  </>
                                ) : (
                                  <span className="normal-price">
                                    {listing.currency || "$"}{listing.price.toLocaleString(listing.currency === "₹" ? 'en-IN' : 'en-US')}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              {listing.quantity > 0 ? (
                                <a 
                                  href={listing.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="btn btn-primary buy-btn"
                                >
                                  <ShoppingCart size={14} /> Buy <ExternalLink size={12} />
                                </a>
                              ) : (
                                <button className="btn btn-disabled buy-btn" disabled>
                                  Sold Out
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {shoes.length > visibleCount && (
        <div className="load-more-container fade-in">
          <button 
            type="button" 
            className="btn btn-secondary load-more-btn" 
            onClick={() => setVisibleCount(prev => prev + 24)}
          >
            Show More Sneakers (Showing {visibleCount} of {shoes.length})
          </button>
        </div>
      )}

      <style>{`
        .results-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 2rem;
          gap: 0.75rem;
        }

        .no-results h3 {
          font-size: 1.25rem;
        }

        .no-results p {
          color: var(--text-secondary);
          max-width: 500px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .icon-caution {
          color: var(--color-caution);
        }

        .shoe-result-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .shoe-card-main {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .shoe-card-main {
            grid-template-columns: 1fr;
          }
        }

        /* Image styling */
        .shoe-image-wrapper {
          position: relative;
          width: 100%;
          height: 160px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--border-glass);
        }

        .shoe-product-img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          transition: transform var(--transition-normal);
        }

        .shoe-result-card:hover .shoe-product-img {
          transform: scale(1.05) rotate(-3deg);
        }

        .shoe-fallback-img {
          font-size: 3rem;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
        }

        .discount-tag {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          background: var(--accent-purple-gradient);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-transform: uppercase;
        }

        /* Info Styling */
        .shoe-details-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .brand-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .shoe-brand-badge {
          background: var(--bg-tertiary);
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          border: 1px solid rgba(0, 242, 254, 0.2);
        }

        .style-code-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .shoe-name-title {
          font-size: 1.25rem;
          cursor: pointer;
          transition: color var(--transition-fast);
          line-height: 1.3;
        }

        .shoe-name-title:hover {
          color: var(--accent-primary);
        }

        .rating-row {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .stars-wrapper {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #f59e0b;
        }

        .star-icon {
          fill: #f59e0b;
        }

        .rating-val {
          font-weight: 700;
          color: var(--text-primary);
        }

        .reviews-count {
          margin-left: 0.25rem;
          color: var(--text-muted);
        }

        .divider-dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
          margin: 0 0.5rem;
        }

        .retail-price-label {
          font-weight: 500;
        }

        .shoe-desc-preview {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .safety-summary-box {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          width: fit-content;
          border: 1px solid var(--border-glass);
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-top: 0.25rem;
        }

        .safety-summary-box:hover {
          border-color: var(--accent-secondary);
          background: var(--bg-glass);
        }

        .safety-label {
          font-weight: 600;
          color: var(--text-secondary);
        }

        .btn-view-report-link {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-left: 0.5rem;
        }

        /* Aggregator Offers */
        .merchant-aggregator-section {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          padding: 1rem;
          border: 1px solid var(--border-glass);
        }

        .aggregator-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .aggregator-header h4 {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.03em;
        }

        .best-price-badge {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .best-price-val {
          color: var(--accent-primary);
          font-weight: 800;
          font-family: var(--font-mono);
        }

        .no-merchant-offers {
          text-align: center;
          padding: 1.5rem;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        /* Table Design */
        .listings-table-container {
          overflow-x: auto;
          width: 100%;
        }

        .listings-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }

        .listings-table th {
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--border-glass);
        }

        .listings-table td {
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          vertical-align: middle;
        }

        .listing-row:last-child td {
          border-bottom: none;
        }

        /* Row highlight depending on safety */
        .listing-row.unsafe {
          background: rgba(239, 68, 68, 0.02);
        }
        
        .merchant-info {
          display: flex;
          flex-direction: column;
        }

        .merchant-name-txt {
          font-weight: 600;
          color: var(--text-primary);
        }

        .merchant-rating-lbl {
          font-size: 0.75rem;
          color: var(--color-caution);
          font-weight: 600;
        }

        .qty-info {
          display: flex;
          flex-direction: column;
        }

        .qty-in-stock {
          color: var(--color-safe);
          font-weight: 600;
          font-size: 0.8rem;
        }

        .qty-out-of-stock {
          color: var(--color-unsafe);
          font-weight: 600;
          font-size: 0.8rem;
        }

        .shipping-time-txt {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .price-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .slashed-price {
          color: var(--text-muted);
          text-decoration: line-through;
          font-size: 0.8rem;
        }

        .discounted-price {
          color: var(--accent-primary);
          font-weight: 700;
          font-family: var(--font-mono);
          font-size: 0.95rem;
        }

        .normal-price {
          font-weight: 600;
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .buy-btn {
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          border-radius: 6px;
          width: fit-content;
        }

        .load-more-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
          margin-bottom: 2rem;
          width: 100%;
        }

        .load-more-btn {
          padding: 0.75rem 2.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          background: var(--bg-glass);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-normal);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .load-more-btn:hover {
          background: var(--accent-primary-gradient);
          color: #000;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.5);
          transform: translateY(-2px);
          border-color: transparent;
        }
      `}</style>
    </div>
  );
}
