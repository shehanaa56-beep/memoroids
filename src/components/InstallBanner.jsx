import React, { useState, useEffect } from 'react';
import './InstallBanner.css';

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAndroidBanner, setShowAndroidBanner] = useState(false);
  const [showIOSBanner, setShowIOSBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // 1. Listen for Android/Desktop install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      const isDismissed = localStorage.getItem('memoroids-pwa-dismissed');
      if (!isDismissed) {
        setShowAndroidBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 2. Detect iOS Device & check if already in standalone mode
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const isDismissed = localStorage.getItem('memoroids-pwa-dismissed');

    if (isIOS && !isStandalone && !isDismissed) {
      setShowIOSBanner(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowAndroidBanner(false);
  };

  const handleIOSInstallClick = () => {
    setShowIOSModal(true);
  };

  const handleDismiss = () => {
    localStorage.setItem('memoroids-pwa-dismissed', 'true');
    setShowAndroidBanner(false);
    setShowIOSBanner(false);
  };

  if (!showAndroidBanner && !showIOSBanner) return null;

  return (
    <>
      {/* Floating Banner */}
      <div className="pwa-install-banner">
        <div className="pwa-banner-content">
          <div className="pwa-logo-container">
            <img src="/images/memlog.jpeg" alt="Memoroids Logo" className="pwa-logo-img" />
          </div>
          <div className="pwa-text-container">
            <h4>Install Memoroids App</h4>
            <p>Shop faster and customize gifts directly from your home screen.</p>
          </div>
        </div>

        <div className="pwa-actions-container">
          {showAndroidBanner && (
            <button className="pwa-install-btn" onClick={handleAndroidInstall}>
              INSTALL NOW
            </button>
          )}
          {showIOSBanner && (
            <button className="pwa-install-btn" onClick={handleIOSInstallClick}>
              INSTALL NOW
            </button>
          )}
          <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Close banner">
            &times;
          </button>
        </div>
      </div>

      {/* iOS Steps Walkthrough Modal */}
      {showIOSModal && (
        <div className="pwa-ios-modal-overlay" onClick={() => setShowIOSModal(false)}>
          <div className="pwa-ios-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pwa-ios-modal-header">
              <h3>Install on iPhone / iPad</h3>
              <button className="pwa-ios-modal-close" onClick={() => setShowIOSModal(false)}>
                &times;
              </button>
            </div>
            <div className="pwa-ios-modal-body">
              <img src="/images/memlog.jpeg" alt="Logo" className="pwa-ios-modal-logo" />
              <p className="pwa-ios-modal-desc">
                Follow these simple steps to add <strong>Memoroids</strong> to your home screen:
              </p>
              
              <ol className="pwa-ios-steps">
                <li>
                  Open this site in Safari browser.
                </li>
                <li>
                  Tap the <strong>Share</strong> button at the bottom of the screen (represented by a box with an arrow pointing up: <span className="share-icon-placeholder">⎋</span>).
                </li>
                <li>
                  Scroll down the share menu and select <strong>Add to Home Screen</strong> (<span className="plus-icon-placeholder">+</span>).
                </li>
                <li>
                  Tap <strong>Add</strong> in the top-right corner to finish.
                </li>
              </ol>
            </div>
            <button className="pwa-ios-modal-btn" onClick={() => setShowIOSModal(false)}>
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallBanner;
