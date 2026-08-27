import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleAuthNavigation = (targetRole?: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (targetRole) {
      if (userRole === targetRole) {
        navigate(`/${targetRole.toLowerCase()}`);
      } else {
        navigate(`/${userRole?.toLowerCase() || "admin"}`);
      }
    } else {
      if (userRole === "Admin") navigate("/admin");
      else if (userRole === "Reviewer") navigate("/reviewer");
      else if (userRole === "Candidate") navigate("/candidate");
      else navigate("/login");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page-root">
      {/* ============================================================ */}
      {/* 1. NAVBAR */}
      {/* ============================================================ */}
      <header className="landing-navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="brand-shield-icon">
              <svg viewBox="0 0 24 24" fill="none" className="brand-svg">
                <path
                  d="M12 2L3 7V12C3 17.523 7.03 21.74 12 23C16.97 21.74 21 17.523 21 12V7L12 2Z"
                  fill="url(#brandGradLanding)"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="brandGradLanding" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#00f0ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text-block">
              <span className="brand-main-title">BGV System</span>
              <span className="brand-tagline">VERIFICATION PLATFORM</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <button className="nav-link active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Home
            </button>
            <button className="nav-link" onClick={() => scrollToSection("why-teams-switch")}>
              About Us
            </button>
            <button className="nav-link" onClick={() => scrollToSection("why-teams-switch")}>
              Services
            </button>
            <button className="nav-link" onClick={() => scrollToSection("stakeholders")}>
              How It Works
            </button>
            <button className="nav-link" onClick={() => scrollToSection("metrics-bar")}>
              Resources
            </button>

            {/* Dark & White Mode Toggle Button */}
            <div className="nav-theme-toggle-wrap">
              <DarkModeToggle />
            </div>
          </nav>

          {/* Right Action Button */}
          <div className="nav-actions">
            <button className="btn-signin-nav" onClick={() => handleAuthNavigation()}>
              <span>{isLoggedIn ? "Go to Dashboard" : "Sign In"}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="signin-btn-icon">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION */}
      {/* ============================================================ */}
      <section className="hero-section" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        {/* Interactive Spotlight & Grid Mesh */}
        <div className="hero-grid-pattern"></div>
        <div className="hero-cursor-spotlight"></div>

        {/* Glow Effects */}
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <div className="hero-content-grid">
          {/* Left Column Text */}
          <div className="hero-text-col">
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" className="badge-shield-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#38bdf8" strokeWidth="2" />
                <path d="M9 12l2 2 4-4" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Enterprise-ready security • Automated document verification</span>
            </div>

            <h1 className="hero-title">
              Hire on <span className="text-highlight-blue">verified</span> truth, not paperwork.
            </h1>

            <p className="hero-description">
              BGV System runs identity, employment, education and criminal checks through one verification engine — so your offer letters are backed by evidence, not assumptions.
            </p>

            <div className="hero-cta-group">
              <button className="btn-primary-hero" onClick={() => handleAuthNavigation()}>
                <span>Start Verifying</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button className="btn-secondary-hero" onClick={() => scrollToSection("stakeholders")}>
                <span>See How It Works</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            </div>

            {/* Social Proof */}
            <div className="social-proof-row">
              <div className="avatar-group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User 1"
                  className="avatar-img"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="User 2"
                  className="avatar-img"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="User 3"
                  className="avatar-img"
                />
              </div>
              <p className="social-proof-text">
                <strong>Built for modern hiring teams</strong> to verify candidates on this platform
              </p>
            </div>
          </div>

          {/* Right Column: Live Verification Card Preview */}
          <div className="hero-card-col">
            <div className="candidate-live-card">
              {/* Card Top */}
              <div className="card-top-bar">
                <div className="candidate-id-wrap">
                  <span className="id-label">CANDIDATE ID</span>
                  <span className="id-dot">•</span>
                  <span className="id-value">#DEMO-SAMPLE</span>
                </div>
                <div className="live-status-pill">
                  <span className="pulse-dot"></span>
                  <span>DEMO VERIFICATION</span>
                </div>
              </div>

              {/* Checks List */}
              <div className="checks-list">
                {/* Check 1 */}
                <div className="check-item-row">
                  <div className="check-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="check-details">
                    <h4 className="check-title">Identity Check</h4>
                    <p className="check-sub">Aadhaar • PAN cross-match</p>
                  </div>
                  <div className="check-badge badge-verified">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>

                {/* Check 2 */}
                <div className="check-item-row">
                  <div className="check-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div className="check-details">
                    <h4 className="check-title">Education Verification</h4>
                    <p className="check-sub">Degree • University registry</p>
                  </div>
                  <div className="check-badge badge-verified">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>

                {/* Check 3 */}
                <div className="check-item-row">
                  <div className="check-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="check-details">
                    <h4 className="check-title">Employment History</h4>
                    <p className="check-sub">Prior employer • UAN match</p>
                  </div>
                  <div className="check-badge badge-verified">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>

                {/* Check 4 */}
                <div className="check-item-row">
                  <div className="check-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="check-details">
                    <h4 className="check-title">Criminal Record Check</h4>
                    <p className="check-sub">District court records</p>
                  </div>
                  <div className="check-badge badge-review">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>In Review</span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="card-metrics-footer">
                <div className="metric-col">
                  <span className="metric-lbl">METRIC</span>
                  <span className="metric-val text-white">Verification Progress</span>
                </div>
                <div className="metric-col">
                  <span className="metric-lbl">TRACKING</span>
                  <span className="metric-val text-white">Workflow tracking</span>
                </div>
                <div className="metric-col">
                  <span className="metric-lbl">STATUS</span>
                  <span className="metric-val text-emerald">Verification in Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MARQUEE TICKER BANNER */}
      {/* ============================================================ */}
      <div className="ticker-banner">
        <div className="ticker-track">
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Identity Verification</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Education Verification</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Employment Verification</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Document Review</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">BGV Workflow</span>
          </div>
          <div className="ticker-divider">•</div>
          {/* Duplicate set for smooth infinite marquee */}
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Identity Verification</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Education Verification</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Employment Verification</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">Document Review</span>
          </div>
          <div className="ticker-divider">•</div>
          <div className="ticker-item">
            <span className="item-id">DEMO</span>
            <span className="item-txt">BGV Workflow</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. WHY TEAMS SWITCH SECTION */}
      {/* ============================================================ */}
      <section id="why-teams-switch" className="why-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-kicker">WHY TEAMS SWITCH</span>
            <h2 className="section-title">
              Verification built for people who make hiring decisions
            </h2>
            <p className="section-subtitle">
              Every check on the platform is auditable, sourced, and timestamped — so nothing in your hiring life is a guess.
            </p>
          </div>

          <div className="why-grid">
            {/* Card 1 */}
            <div className="why-card">
              <div className="why-card-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="why-card-title">Compliant by Design</h3>
              <p className="why-card-desc">
                Data handling aligned to DPDP Act requirements, with role-based access and full audit trails on every record.
              </p>
            </div>

            {/* Card 2 */}
            <div className="why-card">
              <div className="why-card-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="22" y1="12" x2="18" y2="12" />
                  <line x1="6" y1="12" x2="2" y2="12" />
                  <line x1="12" y1="6" x2="12" y2="2" />
                  <line x1="12" y1="22" x2="12" y2="18" />
                </svg>
              </div>
              <h3 className="why-card-title">Source-Verified Results</h3>
              <p className="why-card-desc">
                Every result traces back to a primary source — registrar, employer, or court record — not a self-reported claim.
              </p>
            </div>

            {/* Card 3 */}
            <div className="why-card">
              <div className="why-card-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="why-card-title">Streamlined Verification Workflow</h3>
              <p className="why-card-desc">
                Parallelized checks and real-time status updates mean most cases close before your next interview round.
              </p>
            </div>

            {/* Card 4 */}
            <div className="why-card">
              <div className="why-card-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3 className="why-card-title">One Dashboard, Three Views</h3>
              <p className="why-card-desc">
                Admins, reviewers, and candidates each get a purpose-built workspace instead of one cluttered screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BUILT FOR EVERY STAKEHOLDER SECTION */}
      {/* ============================================================ */}
      <section id="stakeholders" className="stakeholders-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-kicker">BUILT FOR EVERY STAKEHOLDER</span>
            <h2 className="section-title">A workspace for whoever's looking</h2>
            <p className="section-subtitle">Same verification data, three different jobs to do.</p>
          </div>

          <div className="stakeholders-grid">
            {/* Card 01 - Admin */}
            <div className="stakeholder-card">
              <div className="stakeholder-card-top">
                <div className="stakeholder-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="card-number">01</span>
              </div>
              <h3 className="stakeholder-title">Admin</h3>
              <p className="stakeholder-desc">
                Manage organizations, assign reviewers, configure verification packages, and monitor SLA compliance across every case.
              </p>
              <button className="stakeholder-link-btn" onClick={() => handleAuthNavigation("Admin")}>
                <span>Explore Dashboard</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Card 02 - Reviewer */}
            <div className="stakeholder-card">
              <div className="stakeholder-card-top">
                <div className="stakeholder-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <span className="card-number">02</span>
              </div>
              <h3 className="stakeholder-title">Reviewer</h3>
              <p className="stakeholder-desc">
                Work assigned cases, cross-check documents against source records, flag discrepancies, and issue final verification reports.
              </p>
              <button className="stakeholder-link-btn" onClick={() => handleAuthNavigation("Reviewer")}>
                <span>Explore Dashboard</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Card 03 - Candidate */}
            <div className="stakeholder-card">
              <div className="stakeholder-card-top">
                <div className="stakeholder-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="card-number">03</span>
              </div>
              <h3 className="stakeholder-title">Candidate</h3>
              <p className="stakeholder-desc">
                Upload documents once, track each check's progress live, and get notified the moment your verification clears.
              </p>
              <button className="stakeholder-link-btn" onClick={() => handleAuthNavigation("Candidate")}>
                <span>Explore Dashboard</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. METRICS STATS BAR */}
      {/* ============================================================ */}
      <section id="metrics-bar" className="metrics-bar-section">
        <div className="metrics-container">
          {/* Item 1 */}
          <div className="metric-item">
            <div className="metric-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5m-4 0h4" />
              </svg>
            </div>
            <div className="metric-text-group">
              <span className="metric-number">Enterprise</span>
              <span className="metric-label">Built for modern hiring teams</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="metric-item">
            <div className="metric-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className="metric-text-group">
              <span className="metric-number">End-to-End</span>
              <span className="metric-label">End-to-end BGV workflow</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="metric-item">
            <div className="metric-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="metric-text-group">
              <span className="metric-number">Streamlined</span>
              <span className="metric-label">Streamlined verification workflow</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="metric-item">
            <div className="metric-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div className="metric-text-group">
              <span className="metric-number">Automated</span>
              <span className="metric-label">Automated document verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="cta-banner-section">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-left">
              <h2 className="cta-heading">Ready to verify with confidence?</h2>
              <p className="cta-subheading">Get your organization onboarded in under a day.</p>
              {/* Primary Action Button (Sign In / Start Verifying instead of Request Demo) */}
              <button className="btn-cta-action" onClick={() => handleAuthNavigation()}>
                <span>Start Verifying</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Right Graphic 3D Shield */}
            <div className="cta-right-graphic">
              <div className="cta-shield-3d">
                <svg viewBox="0 0 200 240" fill="none" className="cta-shield-svg">
                  <defs>
                    <linearGradient id="ctaShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M100 15 L180 50 V130 C180 185 100 220 100 220 C100 220 20 185 20 130 V50 Z"
                    fill="url(#ctaShieldGrad)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="4"
                  />
                  <path
                    d="M70 120 L90 140 L130 95"
                    stroke="#FFFFFF"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FOOTER */}
      {/* ============================================================ */}
      <footer className="landing-footer">
        <div className="footer-container">
          <p>© 2026 BGV System. Background Verification Platform.</p>
          <p>Thanjavur, Tamil Nadu • Built on trust and evidence.</p>
        </div>
      </footer>
    </div>
  );
}
