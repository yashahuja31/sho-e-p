import React, { useState } from "react";
import { LogIn, UserPlus, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { SignIn, SignUp } from "@clerk/clerk-react";

export default function Auth({ onLogin, isClerkActive }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const validateEmail = (emailStr) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || (isSignUp && !fullName)) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // Simulate Network Request
    setTimeout(() => {
      try {
        const mockUserData = {
          email,
          name: isSignUp ? fullName : email.split("@")[0],
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
          joinedAt: new Date().toISOString()
        };

        localStorage.setItem("shoep_user", JSON.stringify(mockUserData));
        onLogin(mockUserData);
      } catch (err) {
        setError("Authentication failed. Try again.");
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      const mockEmail = `verified.${provider}@example.com`;
      const mockUserData = {
        email: mockEmail,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${provider}`,
        joinedAt: new Date().toISOString()
      };
      localStorage.setItem("shoep_user", JSON.stringify(mockUserData));
      onLogin(mockUserData);
      setLoading(false);
    }, 1000);
  };

  // If real Clerk is active, render official Clerk Sign In / Sign Up widgets
  if (isClerkActive) {
    return (
      <div className="auth-wrapper fade-in">
        <div className="clerk-container">
          <div className="clerk-brand">
            <div className="logo-icon-container">
              <ShieldCheck size={32} className="logo-glow" />
            </div>
            <h2>SHOE<span className="gradient-text">P</span> Secure Authentication</h2>
            <p className="clerk-subtitle">Real-time Clerk session is active</p>
          </div>
          {isSignUp ? (
            <SignUp routing="virtual" signInUrl="#" />
          ) : (
            <SignIn routing="virtual" signUpUrl="#" />
          )}
          <button 
            type="button" 
            className="clerk-toggle-btn"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
        <style>{`
          .auth-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 4rem);
            padding: 1.5rem;
          }
          .clerk-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            width: 100%;
            max-width: 480px;
          }
          .clerk-brand {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .clerk-brand h2 {
            font-size: 1.5rem;
            margin-top: 0.5rem;
            margin-bottom: 0.25rem;
          }
          .clerk-subtitle {
            font-size: 0.8rem;
            color: var(--color-safe);
            font-family: var(--font-mono);
          }
          .clerk-toggle-btn {
            background: none;
            border: none;
            color: var(--accent-primary);
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: color var(--transition-fast);
          }
          .clerk-toggle-btn:hover {
            color: var(--text-primary);
          }
        `}</style>
      </div>
    );
  }

  // keyless mode simulated Auth
  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-container glass-panel">
        <div className="auth-brand">
          <div className="logo-icon-container">
            <ShieldCheck size={32} className="logo-glow" />
          </div>
          <h1>
            SHOE<span className="gradient-text">P</span>
          </h1>
          <p className="auth-subtitle">Verify, Compare & Purchase Authentic Sneakers</p>
        </div>

        {/* Sandbox mode info box */}
        <div className="clerk-info-box">
          <strong>💡 Developer Sandbox Active</strong>
          <p>Strict email validation is active. To connect production Clerk Auth & OAuth providers, add your <code>VITE_CLERK_PUBLISHABLE_KEY</code> in the <code>.env</code> file.</p>
        </div>

        {/* OAuth Buttons */}
        <div className="oauth-providers">
          <button 
            type="button" 
            className="btn btn-secondary oauth-btn"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="oauth-icon">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>
          <button 
            type="button" 
            className="btn btn-secondary oauth-btn"
            onClick={() => handleOAuthLogin("github")}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="oauth-icon fill-white">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="auth-divider-row">
          <span className="auth-divider-line"></span>
          <span className="auth-divider-text">or</span>
          <span className="auth-divider-line"></span>
        </div>

        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab ${!isSignUp ? "active" : ""}`}
            onClick={() => { setIsSignUp(false); setError(""); }}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`auth-tab ${isSignUp ? "active" : ""}`}
            onClick={() => { setIsSignUp(true); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error-alert">{error}</div>}

          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="e.g., Yash Ahuja"
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group password-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : isSignUp ? (
              <>
                <UserPlus size={18} /> Sign Up
              </>
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Protected by secure authentication validations.</p>
        </div>
      </div>

      <style>{`
        .auth-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 4rem);
          padding: 1.5rem;
        }

        .auth-container {
          width: 100%;
          max-width: 440px;
          padding: 2.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }

        .auth-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .logo-icon-container {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: #000;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
        }

        .logo-glow {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .auth-brand h1 {
          font-size: 2rem;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .auth-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .clerk-info-box {
          background: rgba(0, 242, 254, 0.05);
          border: 1px solid rgba(0, 242, 254, 0.15);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.4;
        }

        .clerk-info-box strong {
          color: var(--accent-primary);
          display: block;
          margin-bottom: 0.25rem;
        }

        .clerk-info-box code {
          background: rgba(255, 255, 255, 0.08);
          padding: 0.1rem 0.3rem;
          border-radius: 4px;
          font-family: var(--font-mono);
          color: #fff;
        }

        /* OAuth Provider styles */
        .oauth-providers {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.7rem;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 10px;
          border-color: var(--border-glass);
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .oauth-btn:hover {
          border-color: var(--text-muted);
          background: var(--bg-glass);
        }

        .oauth-icon {
          flex-shrink: 0;
        }
        
        .fill-white {
          fill: #fff;
        }

        .auth-divider-row {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1.25rem 0;
          gap: 1rem;
          width: 100%;
        }

        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border-glass);
        }

        .auth-divider-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }

        .auth-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-glass);
          margin-bottom: 1.25rem;
        }

        .auth-tab {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-muted);
          padding: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          border-bottom: 2px solid transparent;
        }

        .auth-tab.active {
          color: var(--accent-primary);
          border-bottom-color: var(--accent-primary);
        }

        .auth-tab:hover {
          color: var(--text-primary);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
        }

        .auth-error-alert {
          background-color: var(--color-unsafe-bg);
          color: var(--color-unsafe);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
          text-align: center;
        }

        .password-group {
          position: relative;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .password-input-wrapper .form-input {
          padding-right: 3rem;
        }

        .password-toggle-btn {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          transition: color var(--transition-fast);
        }

        .password-toggle-btn:hover {
          color: var(--text-primary);
        }

        .auth-submit-btn {
          margin-top: 1rem;
          width: 100%;
        }

        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: #000;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
