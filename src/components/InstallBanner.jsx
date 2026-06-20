import React, { useState, useEffect, useRef } from 'react';
import './InstallBanner.css';

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const deferredPromptRef = useRef(null);

  useEffect(() => {
    // Don't show if already dismissed or running as installed PWA
    const isDismissed = localStorage.getItem('memoroids-pwa-dismissed');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (isDismissed || isStandalone) return;

    // Show the banner for all users
    setShowBanner(true);

    // Capture the native install prompt if available (Chrome/Android/Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };

  const handleInstallClick = async () => {
    // If the native install prompt is available (Android/Chrome/Edge), use it
    if (deferredPromptRef.current) {
      deferredPromptRef.current.prompt();
      const { outcome } = await deferredPromptRef.current.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      deferredPromptRef.current = null;
      setShowBanner(false);
      return;
    }

    // If on iOS, show the instruction modal
    if (isIOS()) {
      setShowIOSModal(true);
      return;
    }

    // Fallback for desktop browsers that don't support beforeinstallprompt
    // Show the iOS-style instructions adapted for desktop
    setShowIOSModal(true);
  };

  const handleDismiss = () => {
    localStorage.setItem('memoroids-pwa-dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

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
            <p>Get the app for a better experience.</p>
          </div>
        </div>

        <div className="pwa-actions-container">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            INSTALL
          </button>
          <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Close banner">
            &times;
          </button>
        </div>
      </div>

      {/* iOS / Fallback Steps Walkthrough Modal */}
      {showIOSModal && (
        <div className="pwa-ios-modal-overlay" onClick={() => setShowIOSModal(false)}>
          <div className="pwa-ios-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pwa-ios-modal-header">
              <h3>{isIOS() ? 'Install on iPhone / iPad' : 'Install Memoroids App'}</h3>
              <button className="pwa-ios-modal-close" onClick={() => setShowIOSModal(false)}>
                &times;
              </button>
            </div>
            <div className="pwa-ios-modal-body">
              <img src="/images/memlog.jpeg" alt="Logo" className="pwa-ios-modal-logo" />
              {isIOS() ? (
                <>
                  <p className="pwa-ios-modal-desc">
                    Follow these simple steps to add <strong>Memoroids</strong> to your home screen:
                  </p>
                  <ol className="pwa-ios-steps">
                    <li>Open this site in <strong>Safari</strong> browser.</li>
                    <li>
                      Tap the <strong>Share</strong> button at the bottom of the screen
                      (box with an arrow pointing up: <span className="share-icon-placeholder">⎋</span>).
                    </li>
                    <li>
                      Scroll down and select <strong>Add to Home Screen</strong> (<span className="plus-icon-placeholder">+</span>).
                    </li>
                    <li>Tap <strong>Add</strong> in the top-right corner to finish.</li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="pwa-ios-modal-desc">
                    To install <strong>Memoroids</strong> on your device:
                  </p>
                  <ol className="pwa-ios-steps">
                    <li>Open this site in <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.</li>
                    <li>Click the <strong>install icon</strong> in the address bar (or the three-dot menu).</li>
                    <li>Select <strong>Install App</strong> or <strong>Add to Home Screen</strong>.</li>
                  </ol>
                </>
              )}
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
