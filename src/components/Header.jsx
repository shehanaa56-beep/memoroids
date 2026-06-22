import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import NotificationBell from './NotificationBell';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check local storage status
    const checkAuthStatus = () => {
      const role = localStorage.getItem('role');
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');
      
      if (adminToken && role === 'admin') {
        setIsLoggedIn(true);
        setIsAdmin(true);
      } else if (userToken && role === 'user') {
        setIsLoggedIn(true);
        setIsAdmin(false);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    // Run initially
    checkAuthStatus();

    // Listen to Firebase auth changes to keep sync
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsAdmin(user.email === 'memoroidsbyshehana@gmail.com');
      } else {
        // If not authenticated in Firebase, double check localStorage (e.g. static admin login)
        const role = localStorage.getItem('role');
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken && role === 'admin') {
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      }
    });

    // Also listen to storage changes in case of multi-tab login/logout
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.warn('Firebase logout failed:', e);
    }
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = '/';
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-camera-icon">
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <path d="M7 13 C7 11, 9 9, 12 9 H14 C15 7, 16 6, 18 6 C20 6, 21 7, 22 9 H24 C27 9, 29 11, 29 13 V25 C29 27, 27 29, 24 29 H12 C9 29, 7 27, 7 25 Z" stroke="#9a5858" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="#fffaf8"/>
            <circle cx="18" cy="19" r="6" stroke="#9a5858" strokeWidth="2.2" fill="white"/>
            <path d="M18 21.5 C17.3 20.8, 15.2 19.1, 15.2 17.6 C15.2 16.4, 16.2 15.5, 17.3 15.5 C17.9 15.5, 18 15.8, 18 15.8 C18 15.8, 18.1 15.5, 18.7 15.5 C19.8 15.5, 20.8 16.4, 20.8 17.6 C20.8 19.1, 18.7 20.8, 18 21.5 Z" fill="#e3627d"/>
            <circle cx="12" cy="13" r="1.5" fill="#9a5858"/>
          </svg>
        </div>
        
        <div className="logo">
          <h1>Memoroids</h1>
          <span>BY SHEHANA</span>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {/* Desktop Nav Links */}
          <ul className="desktop-links" style={{ alignItems: 'center' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/invitations">Invitations</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/custom-orders">Custom Orders</Link></li>
            {isLoggedIn && (
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <NotificationBell />
              </li>
            )}
            {isLoggedIn && isAdmin && (
              <li><Link to="/admin-dashboard">Admin</Link></li>
            )}
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="header-logout-btn">
                  Logout
                </button>
              </li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>

          {/* Mobile Nav Cards */}
          <div className="mobile-links-container">
            <div className="mobile-menu-section">
              <span className="section-title">EXPLORE</span>
              <div className="section-divider">
                <span className="line"></span>
                <span className="diamond">✦</span>
                <span className="line"></span>
              </div>
            </div>

            <Link to="/" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="card-label">HOME</span>
            </Link>

            <Link to="/shop" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
              <span className="card-label">SHOP</span>
            </Link>

            <Link to="/invitations" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <i className="bi bi-envelope-heart" style={{ fontSize: '20px', color: '#fb6f92' }}></i>
              </span>
              <span className="card-label">INVITATIONS</span>
            </Link>

            <Link to="/gallery" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </span>
              <span className="card-label">GALLERY</span>
            </Link>

            <Link to="/about" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <span className="card-label">ABOUT US</span>
            </Link>

            <Link to="/reviews" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <span className="card-label">REVIEWS</span>
            </Link>

            <Link to="/custom-orders" onClick={closeMenu} className="mobile-menu-card">
              <span className="card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                  <path d="M9 10h6" />
                </svg>
              </span>
              <span className="card-label">CUSTOM ORDERS</span>
            </Link>

            <div className="mobile-menu-section" style={{ marginTop: '1.5rem' }}>
              <span className="section-title">ACCOUNT</span>
              <div className="section-divider">
                <span className="line"></span>
                <span className="diamond">✦</span>
                <span className="line"></span>
              </div>
            </div>

            {isLoggedIn && (
              <div className="mobile-notification-wrapper">
                <NotificationBell />
              </div>
            )}

            {isLoggedIn && isAdmin && (
              <Link to="/admin-dashboard" onClick={closeMenu} className="mobile-menu-card">
                <span className="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                    <line x1="15" y1="21" x2="15" y2="9" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                  </svg>
                </span>
                <span className="card-label">ADMIN DASHBOARD</span>
              </Link>
            )}

            {isLoggedIn ? (
              <button onClick={() => { handleLogout(); closeMenu(); }} className="mobile-menu-card mobile-logout-btn">
                <span className="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </span>
                <span className="card-label">LOGOUT</span>
              </button>
            ) : (
              <Link to="/login" onClick={closeMenu} className="mobile-menu-card">
                <span className="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span className="card-label">LOGIN</span>
              </Link>
            )}
          </div>
        </nav>

        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
