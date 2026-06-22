import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Load read status from localStorage
  const getReadStatusMap = () => {
    try {
      const stored = localStorage.getItem('readNotifications');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  };

  const saveReadStatusMap = (map) => {
    localStorage.setItem('readNotifications', JSON.stringify(map));
  };

  useEffect(() => {
    // Listen to the customOrders collection for the latest 10 orders
    const q = query(collection(db, 'customOrders'), orderBy('submittedAt', 'desc'), limit(15));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const readMap = getReadStatusMap();
      const currentNotifications = [];

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        const name = data.name || 'A customer';
        const productType = data.productType || 'a product';
        const timestamp = data.submittedAt ? data.submittedAt.toDate() : new Date();

        currentNotifications.push({
          id,
          name,
          productType,
          timestamp,
          read: !!readMap[id]
        });
      });

      // If it is NOT the first load, check for newly added documents to alert/highlight
      if (!isInitialLoad.current) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const newDocId = change.doc.id;
            // Play a soft notification chime or sound if desired in future
            console.log(`New order notification: ${newDocId}`);
          }
        });
      }

      setNotifications(currentNotifications);
      
      // Calculate unread count
      const unreads = currentNotifications.filter(n => !n.read).length;
      setUnreadCount(unreads);
      
      isInitialLoad.current = false;
    }, (error) => {
      console.error('Error listening to orders for notifications:', error);
    });

    return () => unsubscribe();
  }, []);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // If opening, mark all as read
    if (!isOpen) {
      const readMap = getReadStatusMap();
      notifications.forEach(n => {
        readMap[n.id] = true;
      });
      saveReadStatusMap(readMap);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    const readMap = getReadStatusMap();
    notifications.forEach(n => {
      readMap[n.id] = true;
    });
    saveReadStatusMap(readMap);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="bell-button" aria-label="Notifications">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bell-icon">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="mark-read-btn">
                Mark all read
              </button>
            )}
          </div>
          <div className="dropdown-body">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-bell">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <p>No new notifications</p>
              </div>
            ) : (
              <div className="notification-list">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
                    <div className="notification-icon-circle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <div className="notification-content">
                      <p className="notification-text">
                        <strong>{notif.name}</strong> purchased <strong>{notif.productType}</strong>
                      </p>
                      <span className="notification-time">{formatTime(notif.timestamp)}</span>
                    </div>
                    {!notif.read && <span className="unread-dot"></span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
