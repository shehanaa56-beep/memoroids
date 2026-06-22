import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import './AdminDashboard.css';

// Get Product Icon using Bootstrap Icons
const getProductIcon = (productType) => {
  const type = (productType || '').toLowerCase();
  if (type.includes('polaroid')) return <i className="bi bi-image" style={{ fontSize: '18px' }}></i>;
  if (type.includes('album')) return <i className="bi bi-journal-album" style={{ fontSize: '18px' }}></i>;
  if (type.includes('frame')) return <i className="bi bi-border-style" style={{ fontSize: '18px' }}></i>;
  if (type.includes('gift') || type.includes('bundle') || type.includes('box')) return <i className="bi bi-gift" style={{ fontSize: '18px' }}></i>;
  return <i className="bi bi-box" style={{ fontSize: '18px' }}></i>;
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Navigation states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const API_URL = '';
  const menuRef = useRef(null);
  const adminDropRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
      if (adminDropRef.current && !adminDropRef.current.contains(e.target)) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/login');
        return;
      }

      let response;
      let fetchedFromApi = false;

      // Skip API call in local development to avoid proxy ECONNREFUSED logs
      if (!import.meta.env.DEV) {
        try {
          response = await fetch(`${API_URL}/api/admin-orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
            fetchedFromApi = true;
          } else if (response.status === 401) {
            localStorage.removeItem('adminToken');
            navigate('/login');
            return;
          }
        } catch (err) {
          console.warn('API call failed, falling back to direct Firebase client:', err);
        }
      }

      if (!fetchedFromApi) {
        const { db } = await import('../firebase');
        const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
        const q = query(collection(db, 'customOrders'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          let submittedAtFormatted = data.submittedAt;
          if (data.submittedAt && typeof data.submittedAt.toDate === 'function') {
            submittedAtFormatted = data.submittedAt.toDate().toISOString();
          }
          return {
            id: doc.id,
            ...data,
            submittedAt: submittedAtFormatted
          };
        });
        setOrders(ordersData);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [navigate, API_URL]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      let response;
      let updatedFromApi = false;
      setActiveMenuId(null);

      if (!import.meta.env.DEV) {
        try {
          response = await fetch(`${API_URL}/api/admin/orders/${orderId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          });
          if (response.ok) {
            updatedFromApi = true;
            fetchOrders();
          }
        } catch (err) {
          console.warn('API status change failed, falling back to direct Firebase client:', err);
        }
      }

      if (!updatedFromApi) {
        const { db } = await import('../firebase');
        const { doc, updateDoc } = await import('firebase/firestore');
        const orderRef = doc(db, 'customOrders', orderId);
        await updateDoc(orderRef, { status });
        fetchOrders();
      }
    } catch (err) {
      console.error('Error updating order:', err);
      setError('Failed to update order status');
    }
  };

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
    setShowDeleteConfirm(true);
    setActiveMenuId(null);
  };

  const confirmDelete = async () => {
    if (!deleteOrderId) return;

    try {
      const token = localStorage.getItem('adminToken');
      let response;
      let deletedFromApi = false;

      if (!import.meta.env.DEV) {
        try {
          response = await fetch(`${API_URL}/api/admin/orders/${deleteOrderId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            deletedFromApi = true;
            fetchOrders();
            setShowDeleteConfirm(false);
            setDeleteOrderId(null);
          }
        } catch (err) {
          console.warn('API delete failed, falling back to direct Firebase client:', err);
        }
      }

      if (!deletedFromApi) {
        const { db } = await import('../firebase');
        const { doc, deleteDoc } = await import('firebase/firestore');
        const orderRef = doc(db, 'customOrders', deleteOrderId);
        await deleteDoc(orderRef);
        fetchOrders();
        setShowDeleteConfirm(false);
        setDeleteOrderId(null);
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Failed to delete order');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('role');
    navigate('/');
  };

  // Get dynamic counts for sidebar
  const pendingOrders = orders.filter(o => !o.status || o.status.toLowerCase() === 'pending');
  const approvedOrders = orders.filter(o => o.status?.toLowerCase() === 'approved');
  const completedOrders = orders.filter(o => o.status?.toLowerCase() === 'completed');
  
  const pendingCount = pendingOrders.length;
  const approvedCount = approvedOrders.length;
  const completedCount = completedOrders.length;
  const totalCustomers = new Set(orders.map(o => (o.email || '').toLowerCase()).filter(Boolean)).size;

  // Filter orders based on active tab
  let filteredOrders = orders;
  if (activeTab === 'pending') filteredOrders = pendingOrders;
  else if (activeTab === 'approved') filteredOrders = approvedOrders;
  else if (activeTab === 'completed') filteredOrders = completedOrders;

  // Extract customers list
  const customersList = [];
  const seenEmails = new Set();
  orders.forEach(order => {
    const email = (order.email || '').toLowerCase();
    if (email && !seenEmails.has(email)) {
      seenEmails.add(email);
      customersList.push({
        name: order.name,
        email: order.email,
        phone: order.phone,
        lastOrdered: order.submittedAt,
        product: order.productType
      });
    }
  });

  const getInitials = (name) => {
    if (!name) return 'C';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const toggleRowExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const toggleActionMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  if (loading) return <div className="dashboard-loading-container"><div className="spinner"></div><p>Loading Dashboard...</p></div>;

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar Drawer Backdrop for Mobile */}
      {isSidebarOpen && <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* LEFT SIDEBAR */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-text">
            <h2>Memoroids</h2>
            <span>BY SHEHANA</span>
          </div>
          <span className="heart-doodle">♥</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}>
              <span className="nav-icon"><i className="bi bi-speedometer2"></i></span>
              <span className="nav-text">Dashboard</span>
            </li>
            <li className={activeTab === 'pending' ? 'active' : ''} onClick={() => { setActiveTab('pending'); setIsSidebarOpen(false); }}>
              <span className="nav-icon"><i className="bi bi-folder-fill"></i></span>
              <span className="nav-text">Custom Orders</span>
              {pendingCount > 0 && <span className="nav-badge pending-badge">{pendingCount}</span>}
            </li>
            <li className={activeTab === 'approved' ? 'active' : ''} onClick={() => { setActiveTab('approved'); setIsSidebarOpen(false); }}>
              <span className="nav-icon"><i className="bi bi-check-circle-fill"></i></span>
              <span className="nav-text">Approved Orders</span>
              {approvedCount > 0 && <span className="nav-badge approved-badge">{approvedCount}</span>}
            </li>
            <li className={activeTab === 'completed' ? 'active' : ''} onClick={() => { setActiveTab('completed'); setIsSidebarOpen(false); }}>
              <span className="nav-icon"><i className="bi bi-box-seam-fill"></i></span>
              <span className="nav-text">Completed Orders</span>
              {completedCount > 0 && <span className="nav-badge completed-badge">{completedCount}</span>}
            </li>
            <li className={activeTab === 'customers' ? 'active' : ''} onClick={() => { setActiveTab('customers'); setIsSidebarOpen(false); }}>
              <span className="nav-icon"><i className="bi bi-people-fill"></i></span>
              <span className="nav-text">All Customers</span>
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}>
              <span className="nav-icon"><i className="bi bi-gear-fill"></i></span>
              <span className="nav-text">Settings</span>
            </li>
            <li className="logout-nav-item" onClick={handleLogout}>
              <span className="nav-icon"><i className="bi bi-box-arrow-right"></i></span>
              <span className="nav-text">Logout</span>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer Box */}
        <div className="sidebar-footer-card">
          <p>Thanks for being amazing!</p>
          <span className="footer-heart">♥</span>
        </div>

        {/* Cute polaroid camera icon at bottom */}
        <div className="sidebar-camera-vector">
          <i className="bi bi-camera-fill" style={{ fontSize: '50px', color: '#fb6f92' }}></i>
        </div>
      </aside>

      {/* MAIN CONTENT BLOCK */}
      <div className="dashboard-main-container">
        {/* TOP NAVBAR */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Toggle Sidebar">
              <i className="bi bi-list" style={{ fontSize: '24px' }}></i>
            </button>
            <div className="topbar-camera-logo">
              <i className="bi bi-camera" style={{ fontSize: '28px', color: '#9a5858' }}></i>
            </div>
            <h1 className="header-logo-text-mobile">Memoroids</h1>
          </div>

          <div className="topbar-right">
            {/* Real-Time Notifications Bell */}
            <NotificationBell />

            {/* User Dropdown */}
            <div className="admin-profile-dropdown" ref={adminDropRef}>
              <div className="profile-trigger" onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}>
                <div className="profile-avatar">
                  <span>S</span>
                </div>
                <div className="profile-info">
                  <span className="profile-name">Shehana</span>
                  <span className="profile-role">Admin</span>
                </div>
                <i className={`bi bi-chevron-down dropdown-chevron ${isAdminDropdownOpen ? 'open' : ''}`}></i>
              </div>

              {isAdminDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-item" onClick={() => { setActiveTab('settings'); setIsAdminDropdownOpen(false); }}>
                    <i className="bi bi-gear-fill" style={{ marginRight: '8px' }}></i> Settings
                  </div>
                  <div className="dropdown-item logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" style={{ marginRight: '8px' }}></i> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <main className="dashboard-content-body">
          {error && <div className="dashboard-error-banner">{error}</div>}

          {/* TAB 1: MAIN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Section */}
              <div className="welcome-banner">
                <div className="welcome-text">
                  <h2>Welcome back, Shehana! <i className="bi bi-emoji-smile-fill"></i></h2>
                  <p>Here's what's happening with your store today.</p>
                </div>
                <div className="banner-sparkle"><i className="bi bi-sparkles"></i></div>
              </div>

              {/* Summary Cards */}
              <div className="summary-cards-grid">
                <div className="summary-card pending" onClick={() => setActiveTab('pending')}>
                  <div className="card-icon-container bg-pink">
                    <i className="bi bi-bag-heart-fill"></i>
                  </div>
                  <div className="card-content">
                    <span className="card-value">{pendingCount}</span>
                    <span className="card-label">Pending Orders</span>
                    <span className="card-link">View all <i className="bi bi-arrow-right-short"></i></span>
                  </div>
                </div>

                <div className="summary-card approved" onClick={() => setActiveTab('approved')}>
                  <div className="card-icon-container bg-orange">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="card-content">
                    <span className="card-value">{approvedCount}</span>
                    <span className="card-label">Approved Orders</span>
                    <span className="card-link">View all <i className="bi bi-arrow-right-short"></i></span>
                  </div>
                </div>

                <div className="summary-card completed" onClick={() => setActiveTab('completed')}>
                  <div className="card-icon-container bg-green">
                    <i className="bi bi-box-seam-fill"></i>
                  </div>
                  <div className="card-content">
                    <span className="card-value">{completedCount}</span>
                    <span className="card-label">Completed Orders</span>
                    <span className="card-link">View all <i className="bi bi-arrow-right-short"></i></span>
                  </div>
                </div>

                <div className="summary-card customers" onClick={() => setActiveTab('customers')}>
                  <div className="card-icon-container bg-purple">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="card-content">
                    <span className="card-value">{totalCustomers}</span>
                    <span className="card-label">Total Customers</span>
                    <span className="card-link">View all <i className="bi bi-arrow-right-short"></i></span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Section */}
              <div className="dashboard-table-container">
                <div className="table-header-row">
                  <h3>Recent Custom Orders</h3>
                  <button className="view-all-orders-btn" onClick={() => setActiveTab('pending')}>
                    View All Orders <i className="bi bi-arrow-right"></i>
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="empty-table-state">
                    <p>No custom orders yet.</p>
                  </div>
                ) : (
                  <div className="table-wrapper">
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th aria-label="Actions"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order, index) => (
                          <React.Fragment key={order.id}>
                            <tr className={`table-order-row ${expandedOrderId === order.id ? 'expanded' : ''}`} onClick={() => toggleRowExpand(order.id)}>
                              <td className="col-id">#{order.id.slice(-4).toUpperCase()}</td>
                              <td className="col-customer">
                                <div className="customer-info-cell">
                                  <div className="customer-avatar-circle">
                                    {getInitials(order.name)}
                                  </div>
                                  <div className="customer-text">
                                    <span className="customer-name">{order.name}</span>
                                    <span className="customer-email">{order.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="col-product">
                                <div className="product-info-cell">
                                  <span className="product-icon">{getProductIcon(order.productType)}</span>
                                  <span className="product-name">{order.productType}</span>
                                </div>
                              </td>
                              <td className="col-status">
                                <span className={`status-badge badge-${(order.status || 'pending').toLowerCase()}`}>
                                  {order.status || 'Pending'}
                                </span>
                              </td>
                              <td className="col-date">
                                {order.submittedAt ? new Date(order.submittedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                              </td>
                              <td className="col-actions">
                                <div className="actions-dropdown-wrapper" ref={activeMenuId === order.id ? menuRef : null}>
                                  <button className="dots-menu-btn" onClick={(e) => toggleActionMenu(e, order.id)}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </button>
                                  {activeMenuId === order.id && (
                                    <div className="actions-menu-popup">
                                      {order.status?.toLowerCase() !== 'approved' && (
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'approved'); }}>
                                          <i className="bi bi-check2-circle" style={{ marginRight: '8px' }}></i> Approve Order
                                        </button>
                                      )}
                                      {order.status?.toLowerCase() !== 'completed' && (
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'completed'); }}>
                                          <i className="bi bi-box-seam" style={{ marginRight: '8px' }}></i> Complete Order
                                        </button>
                                      )}
                                      {order.status?.toLowerCase() !== 'pending' && (
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'pending'); }}>
                                          <i className="bi bi-arrow-counterclockwise" style={{ marginRight: '8px' }}></i> Reset Pending
                                        </button>
                                      )}
                                      <button className="delete-action" onClick={(e) => { e.stopPropagation(); handleDeleteClick(order.id); }}>
                                        <i className="bi bi-trash" style={{ marginRight: '8px' }}></i> Delete Order
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                            {/* Expanded Details Row */}
                            {expandedOrderId === order.id && (
                              <tr className="expanded-details-row">
                                <td colSpan="6">
                                  <div className="order-expanded-card">
                                    <div className="detail-item">
                                      <strong>WhatsApp / Phone:</strong>
                                      <span>{order.phone || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                      <strong>Customization Details:</strong>
                                      <p>{order.description || 'No customization notes provided.'}</p>
                                    </div>
                                    {order.images && order.images.length > 0 && (
                                      <div className="expanded-images-section">
                                        <strong>Attached Images:</strong>
                                        <div className="expanded-images-grid">
                                          {order.images.map((img, idx) => (
                                            <img
                                              key={idx}
                                              src={img.startsWith('http') || img.startsWith('data:') ? img : `${API_URL}/uploads/${img}`}
                                              alt={`Uploaded memory ${idx + 1}`}
                                              onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-container">
                <h3>Quick Actions <span className="heart-sub">♥</span></h3>
                <div className="quick-actions-grid">
                  <div className="quick-action-item bg-pink-light" onClick={() => setActiveTab('pending')}>
                    <span className="action-icon"><i className="bi bi-folder-fill"></i></span>
                    <span>View Custom Orders</span>
                  </div>
                  <div className="quick-action-item bg-cream-light" onClick={() => setActiveTab('customers')}>
                    <span className="action-icon"><i className="bi bi-people-fill"></i></span>
                    <span>View Customers</span>
                  </div>
                  <div className="quick-action-item bg-green-light" onClick={() => setActiveTab('settings')}>
                    <span className="action-icon"><i className="bi bi-gear-fill"></i></span>
                    <span>Dashboard Settings</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2, 3, 4: LIST VIEWS (PENDING, APPROVED, COMPLETED) */}
          {(activeTab === 'pending' || activeTab === 'approved' || activeTab === 'completed') && (
            <div className="dashboard-table-container">
              <div className="table-header-row">
                <h3 className="tab-title-text">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders ({filteredOrders.length})
                </h3>
                <button className="view-all-orders-btn" onClick={() => setActiveTab('dashboard')}>
                  <i className="bi bi-arrow-left"></i> Back to Dashboard
                </button>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="empty-table-state">
                  <p>No {activeTab} orders found.</p>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th aria-label="Actions"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <React.Fragment key={order.id}>
                          <tr className={`table-order-row ${expandedOrderId === order.id ? 'expanded' : ''}`} onClick={() => toggleRowExpand(order.id)}>
                            <td className="col-id">#{order.id.slice(-4).toUpperCase()}</td>
                            <td className="col-customer">
                              <div className="customer-info-cell">
                                <div className="customer-avatar-circle">
                                  {getInitials(order.name)}
                                </div>
                                <div className="customer-text">
                                  <span className="customer-name">{order.name}</span>
                                  <span className="customer-email">{order.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="col-product">
                              <div className="product-info-cell">
                                <span className="product-icon">{getProductIcon(order.productType)}</span>
                                <span className="product-name">{order.productType}</span>
                              </div>
                            </td>
                            <td className="col-status">
                              <span className={`status-badge badge-${(order.status || 'pending').toLowerCase()}`}>
                                {order.status || 'Pending'}
                              </span>
                            </td>
                            <td className="col-date">
                              {order.submittedAt ? new Date(order.submittedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                            </td>
                            <td className="col-actions">
                              <div className="actions-dropdown-wrapper" ref={activeMenuId === order.id ? menuRef : null}>
                                <button className="dots-menu-btn" onClick={(e) => toggleActionMenu(e, order.id)}>
                                  <i className="bi bi-three-dots-vertical"></i>
                                </button>
                                {activeMenuId === order.id && (
                                  <div className="actions-menu-popup">
                                    {order.status?.toLowerCase() !== 'approved' && (
                                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'approved'); }}>
                                        <i className="bi bi-check2-circle" style={{ marginRight: '8px' }}></i> Approve Order
                                      </button>
                                    )}
                                    {order.status?.toLowerCase() !== 'completed' && (
                                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'completed'); }}>
                                        <i className="bi bi-box-seam" style={{ marginRight: '8px' }}></i> Complete Order
                                      </button>
                                    )}
                                    {order.status?.toLowerCase() !== 'pending' && (
                                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'pending'); }}>
                                        <i className="bi bi-arrow-counterclockwise" style={{ marginRight: '8px' }}></i> Reset Pending
                                      </button>
                                    )}
                                    <button className="delete-action" onClick={(e) => { e.stopPropagation(); handleDeleteClick(order.id); }}>
                                      <i className="bi bi-trash" style={{ marginRight: '8px' }}></i> Delete Order
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          {/* Expanded Details Row */}
                          {expandedOrderId === order.id && (
                            <tr className="expanded-details-row">
                              <td colSpan="6">
                                <div className="order-expanded-card">
                                  <div className="detail-item">
                                    <strong>WhatsApp / Phone:</strong>
                                    <span>{order.phone || 'N/A'}</span>
                                  </div>
                                  <div className="detail-item">
                                    <strong>Customization Details:</strong>
                                    <p>{order.description || 'No customization notes provided.'}</p>
                                  </div>
                                  {order.images && order.images.length > 0 && (
                                    <div className="expanded-images-section">
                                      <strong>Attached Images:</strong>
                                      <div className="expanded-images-grid">
                                        {order.images.map((img, idx) => (
                                          <img
                                            key={idx}
                                            src={img.startsWith('http') || img.startsWith('data:') ? img : `${API_URL}/uploads/${img}`}
                                            alt={`Uploaded memory ${idx + 1}`}
                                            onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ALL CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="dashboard-table-container">
              <div className="table-header-row">
                <h3 className="tab-title-text">All Customers ({customersList.length})</h3>
                <button className="view-all-orders-btn" onClick={() => setActiveTab('dashboard')}>
                  <i className="bi bi-arrow-left"></i> Back to Dashboard
                </button>
              </div>

              {customersList.length === 0 ? (
                <div className="empty-table-state">
                  <p>No customers found.</p>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Last Order Product</th>
                        <th>Last Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersList.map((customer, index) => (
                        <tr key={index}>
                          <td>
                            <div className="customer-avatar-circle">
                              {getInitials(customer.name)}
                            </div>
                          </td>
                          <td><strong>{customer.name}</strong></td>
                          <td>{customer.email}</td>
                          <td>{customer.phone || 'N/A'}</td>
                          <td>{customer.product}</td>
                          <td>{customer.lastOrdered ? new Date(customer.lastOrdered).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="settings-page-card">
              <h3>Admin & Dashboard Settings</h3>
              <p className="subtitle">Configure your custom store settings here.</p>
              
              <div className="settings-section">
                <h4>General Profile</h4>
                <div className="settings-form-group">
                  <label>Admin Display Name</label>
                  <input type="text" defaultValue="Shehana" readOnly />
                </div>
                <div className="settings-form-group">
                  <label>Notification Email</label>
                  <input type="email" defaultValue="memoroidsbyshehana@gmail.com" readOnly />
                </div>
              </div>

              <div className="settings-section">
                <h4>System Details</h4>
                <p>Status: <strong>Active</strong></p>
                <p>Total Database Orders: <strong>{orders.length}</strong></p>
                <p>Connected Database: <strong>Firebase Firestore (memoroids-eb658)</strong></p>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="dashboard-content-footer">
          <p>© 2026 Memoroids by Shehana. All rights reserved. <span className="heart-sub">♥</span></p>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-modal" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="delete-confirm-buttons">
              <button onClick={confirmDelete} className="confirm-delete-button">
                Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="cancel-delete-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Image Lightbox Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Zoomed memory" />
            <button className="close-modal-btn" onClick={() => setSelectedImage(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
