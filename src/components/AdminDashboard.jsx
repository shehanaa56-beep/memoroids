import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const getWhatsAppChatUrl = (phone, name) => {
  let cleaned = (phone || '').replace(/\D/g, '');
  if (!cleaned) return '#';
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  const message = `Hello ${name}! Regarding your custom order request on Memoroids.`;
  return `https://api.whatsapp.com/send?phone=${cleaned}&text=${encodeURIComponent(message)}`;
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const API_URL = '';

  // ✅ useCallback ensures fetchOrders is stable and can be used in useEffect & other functions
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

      // Skip API call in local development to avoid proxy ECONNREFUSED logs
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
  };

  const confirmDelete = async () => {
    if (!deleteOrderId) return;

    try {
      const token = localStorage.getItem('adminToken');
      let response;
      let deletedFromApi = false;

      // Skip API call in local development to avoid proxy ECONNREFUSED logs
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

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteOrderId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="orders-container">
        <h2>Custom Orders ({orders.length})</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>{order.name}</h3>
                  <span className={`status status-${order.status || 'pending'}`}>
                    {order.status || 'Pending'}
                  </span>
                </div>

                <div className="order-details">
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Phone:</strong> {order.phone || 'N/A'}</p>
                  <p><strong>Product:</strong> {order.productType}</p>
                  <p><strong>Description:</strong> {order.description}</p>
                  <p><strong>Submitted:</strong> {new Date(order.submittedAt).toLocaleDateString()}</p>
                  {order.phone && (
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                      <a
                        href={getWhatsAppChatUrl(order.phone, order.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-admin-btn"
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#25d366',
                          color: '#fff',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          textDecoration: 'none',
                          fontSize: '13px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
                          transition: 'all 0.2s'
                        }}
                      >
                        💬 Chat on WhatsApp
                      </a>
                    </div>
                  )}
                </div>

                {order.images?.length > 0 && (
                  <div className="order-images">
                    <h4>Images:</h4>
                    <div className="images-grid">
                      {order.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.startsWith('http') || img.startsWith('data:') ? img : `${API_URL}/uploads/${img}`}
                          alt={`Order ${order.id} - ${idx + 1}`}
                          className="order-image"
                          onClick={() => setSelectedImage(img)}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="order-actions">
                  <button
                    onClick={() => handleStatusChange(order.id, 'approved')}
                    disabled={order.status === 'approved'}
                    className="approve-button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, 'rejected')}
                    disabled={order.status === 'rejected'}
                    className="reject-button"
                  >
                    Reject
                  </button>
                  <button onClick={() => handleDeleteClick(order.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="delete-confirm-buttons">
              <button onClick={confirmDelete} className="confirm-delete-button">
                Delete
              </button>
              <button onClick={cancelDelete} className="cancel-delete-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content">
            <img src={selectedImage} alt="Zoomed View" />
            <button className="close-modal-btn" onClick={() => setSelectedImage(null)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
