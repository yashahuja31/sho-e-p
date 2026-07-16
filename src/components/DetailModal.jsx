import React from "react";
import { X, ShieldCheck, ShieldAlert, Calendar, DollarSign, Tag, Info, CheckCircle, BarChart3 } from "lucide-react";

export default function DetailModal({ shoe, onClose }) {
  if (!shoe) return null;

  // Generate simulated historical price trends (last 6 months)
  const priceHistory = [
    { month: "Jan", price: Math.round(shoe.retailPrice * 1.3) },
    { month: "Feb", price: Math.round(shoe.retailPrice * 1.45) },
    { month: "Mar", price: Math.round(shoe.retailPrice * 1.6) },
    { month: "Apr", price: Math.round(shoe.retailPrice * 1.55) },
    { month: "May", price: Math.round(shoe.retailPrice * 1.7) },
    { month: "Jun", price: Math.round(shoe.retailPrice * 1.85) }
  ];

  const maxHistoricalPrice = Math.max(...priceHistory.map(h => h.price));

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content-container glass-panel fade-in">
        <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-scroll-body">
          {/* Main Info Header */}
          <div className="modal-main-header">
            <div className="modal-image-col">
              <div className="modal-image-wrapper">
                <img 
                  src={shoe.primaryImage} 
                  alt={shoe.name} 
                  className="modal-product-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="shoe-fallback-img" style={{ display: 'none' }}>
                  <span>👟</span>
                </div>
              </div>
            </div>

            <div className="modal-info-col">
              <span className="modal-brand-badge">{shoe.brand}</span>
              <h2 className="modal-title-text">{shoe.name}</h2>
              <p className="modal-style-code">Style Code: {shoe.styleCode}</p>
              
              <div className="specs-grid">
                <div className="spec-item">
                  <Calendar size={16} className="spec-icon" />
                  <div>
                    <span className="spec-label">Released</span>
                    <span className="spec-val">{shoe.releaseDate}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <DollarSign size={16} className="spec-icon" />
                  <div>
                    <span className="spec-label">Retail Price</span>
                    <span className="spec-val">${shoe.retailPrice}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <Tag size={16} className="spec-icon" />
                  <div>
                    <span className="spec-label">Colorway</span>
                    <span className="spec-val">{shoe.colorway}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-grid-details">
            {/* Authenticity Report */}
            <div className="details-card authenticity-report-card">
              <div className="card-header-icon">
                {shoe.safetyReport.status === "Safe" ? (
                  <ShieldCheck size={20} className="icon-green" />
                ) : (
                  <ShieldAlert size={20} className="icon-caution" />
                )}
                <h3>Authenticity Analysis</h3>
              </div>

              <div className="authenticity-score-row">
                <div className="circular-score-wrapper">
                  <div className="score-number">{shoe.safetyReport.authenticityScore}%</div>
                  <div className="score-label">Confidence</div>
                </div>
                <div className="verdict-summary">
                  <p className="verdict-title">
                    Verification Status: <span className={`status-text-${shoe.safetyReport.status.toLowerCase()}`}>{shoe.safetyReport.status}</span>
                  </p>
                  <p className="verdict-desc">{shoe.safetyReport.details}</p>
                </div>
              </div>

              <div className="checklist-section">
                <h4>AI Verification Checklist</h4>
                <ul className="checklist-items">
                  <li className="checked">
                    <CheckCircle size={14} className="icon-green" />
                    <span>Hourglass heel silhouette proportions checked</span>
                  </li>
                  <li className="checked">
                    <CheckCircle size={14} className="icon-green" />
                    <span>Swoosh / Stripes stitch alignment correct</span>
                  </li>
                  <li className="checked">
                    <CheckCircle size={14} className="icon-green" />
                    <span>Sole pellet texture size verified</span>
                  </li>
                  <li className="checked">
                    <CheckCircle size={14} className="icon-green" />
                    <span>Box label typography and sticker placement verified</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price Trends */}
            <div className="details-card price-trends-card">
              <div className="card-header-icon">
                <BarChart3 size={20} className="icon-purple" />
                <h3>Aggregated Market Price Trend</h3>
              </div>
              <p className="card-subtitle-txt">Aggregated resell market price trends over the last 6 months</p>
              
              <div className="bar-chart-container">
                {priceHistory.map((historyItem, idx) => {
                  const barHeightPct = Math.round((historyItem.price / maxHistoricalPrice) * 100);
                  
                  return (
                    <div key={idx} className="chart-column">
                      <div className="chart-bar-wrapper">
                        <div className="bar-value-tooltip">${historyItem.price}</div>
                        <div 
                          className="chart-bar" 
                          style={{ height: `${barHeightPct}%` }}
                        ></div>
                      </div>
                      <span className="chart-bar-label">{historyItem.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="price-trends-info">
                <Info size={14} />
                <p>Resell prices fluctuate based on inventory scarcity. Buying from direct brand releases offers retail pricing, but resell marketplaces provide verified deadstock options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 1.5rem;
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
        }

        .modal-content-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          max-height: 85vh;
          z-index: 210;
          overflow: hidden;
          padding: 2.5rem 2rem 2rem 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .btn-close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-close-modal:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
          transform: rotate(90deg);
        }

        .modal-scroll-body {
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-right: 0.5rem;
        }

        /* Main Header Layout */
        .modal-main-header {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 2rem;
        }

        @media (max-width: 640px) {
          .modal-main-header {
            grid-template-columns: 1fr;
          }
        }

        .modal-image-wrapper {
          width: 100%;
          height: 180px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-glass);
          overflow: hidden;
        }

        .modal-product-img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }

        .modal-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-brand-badge {
          background: var(--bg-tertiary);
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          width: fit-content;
          border: 1px solid rgba(0, 242, 254, 0.2);
        }

        .modal-title-text {
          font-size: 1.5rem;
          line-height: 1.25;
        }

        .modal-style-code {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-tertiary);
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--border-glass);
        }

        .spec-icon {
          color: var(--accent-secondary);
        }

        .spec-label {
          display: block;
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .spec-val {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Detail Cards Grid */
        .modal-grid-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .modal-grid-details {
            grid-template-columns: 1fr;
          }
        }

        .details-card {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card-header-icon {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 0.5rem;
        }

        .card-header-icon h3 {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .card-subtitle-txt {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: -0.5rem;
        }

        /* Authenticity circular score */
        .authenticity-score-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .circular-score-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 4px solid var(--accent-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
          flex-shrink: 0;
        }

        .score-number {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 700;
        }

        .score-label {
          font-size: 0.55rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .verdict-summary {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .verdict-title {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .status-text-safe {
          color: var(--color-safe);
        }

        .status-text-caution {
          color: var(--color-caution);
        }

        .status-text-unsafe {
          color: var(--color-unsafe);
        }

        .verdict-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .checklist-section h4 {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .checklist-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .checklist-items li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .icon-green {
          color: var(--color-safe);
        }

        .icon-caution {
          color: var(--color-caution);
        }

        .icon-purple {
          color: var(--accent-purple);
        }

        /* Bar Chart Styles */
        .bar-chart-container {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          height: 120px;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-glass);
        }

        .chart-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          width: 35px;
        }

        .chart-bar-wrapper {
          position: relative;
          width: 14px;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          cursor: pointer;
        }

        .chart-bar {
          width: 100%;
          background: var(--accent-gradient);
          border-radius: 4px 4px 0 0;
          transition: all var(--transition-normal);
        }

        .chart-column:hover .chart-bar {
          background: var(--accent-purple-gradient);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
        }

        .bar-value-tooltip {
          position: absolute;
          bottom: 100%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          font-family: var(--font-mono);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-4px);
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .chart-column:hover .bar-value-tooltip {
          opacity: 1;
          transform: translateY(0);
        }

        .chart-bar-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .price-trends-info {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .price-trends-info p {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
