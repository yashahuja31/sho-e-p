import React, { useState } from "react";
import { LogOut, Sun, Moon, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

export default function Navigation({ user, onLogout, isClerkActive }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
    setIsDark(!isDark);
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <ShieldCheck size={20} />
          </div>
          <span className="logo-text">
            SHOE<span className="gradient-text">P</span>
          </span>
        </div>

        <div className="nav-actions">
          {/* Theme Toggle */}
          <button 
            type="button" 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Section (Clerk Button style) */}
          {user && (
            isClerkActive ? (
              <div className="user-profile-menu" style={{ display: 'flex', alignItems: 'center' }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="user-profile-menu">
                <button 
                  type="button" 
                  className="user-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="user-avatar"
                  />
                  <span className="user-name-label">{user.name}</span>
                </button>

                {showDropdown && (
                  <>
                    <div 
                      className="dropdown-overlay" 
                      onClick={() => setShowDropdown(false)}
                    ></div>
                    <div className="dropdown-menu glass-panel fade-in">
                      <div className="dropdown-header">
                        <p className="dropdown-username">{user.name}</p>
                        <p className="dropdown-email">{user.email}</p>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button 
                        type="button" 
                        className="dropdown-item danger"
                        onClick={() => {
                          setShowDropdown(false);
                          onLogout();
                        }}
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 1rem;
          margin: 1rem 1.5rem 0 1.5rem;
          padding: 0.75rem 1.5rem;
          z-index: 100;
          border-radius: 14px !important;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
        }

        .logo-text {
          font-family: var(--font-mono);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle-btn {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          background: var(--bg-glass);
          border-color: var(--text-muted);
          transform: translateY(-1px);
        }

        .user-profile-menu {
          position: relative;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-glass);
          padding: 0.25rem 0.75rem 0.25rem 0.25rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all var(--transition-fast);
          color: var(--text-primary);
        }

        .user-btn:hover {
          border-color: var(--accent-secondary);
          background: var(--bg-glass);
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 1px solid var(--border-glass);
        }

        .user-name-label {
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (max-width: 576px) {
          .user-name-label {
            display: none;
          }
          .user-btn {
            padding: 0.25rem;
          }
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 110;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 0.5rem);
          width: 220px;
          padding: 0.75rem 0;
          z-index: 120;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border-radius: 12px !important;
        }

        .dropdown-header {
          padding: 0.5rem 1rem;
        }

        .dropdown-username {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .dropdown-email {
          font-size: 0.75rem;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-glass);
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.6rem 1rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .dropdown-item:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .dropdown-item.danger {
          color: var(--color-unsafe);
        }

        .dropdown-item.danger:hover {
          background: var(--color-unsafe-bg);
          color: var(--color-unsafe);
        }
      `}</style>
    </nav>
  );
}
