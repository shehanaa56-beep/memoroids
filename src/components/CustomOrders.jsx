import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CustomOrders.css';

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = '';

      const message = `Hello Memoroids! I want to request a custom order:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'N/A'}
- Product: ${formData.productType}
- Description: ${formData.description}

I will send my custom photos below.`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=919037258541&text=${encodeURIComponent(message)}`;
      setWhatsappLink(whatsappUrl);

      let submittedFromApi = false;

      // Skip API call in local development to avoid proxy errors
      if (!import.meta.env.DEV) {
        try {
          const res = await fetch(`${API_URL}/api/custom-orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              productType: formData.productType,
              description: formData.description,
              images: [], // Kept empty for schema compatibility
            }),
          });

          if (res.ok) {
            const data = await res.json();
            console.log('Order submitted via API:', data);
            submittedFromApi = true;
          }
        } catch (err) {
          console.warn('API submission failed, falling back to direct Firebase client:', err);
        }
      }

      if (!submittedFromApi) {
        // Fallback: save directly to Firestore client-side
        const { db } = await import('../firebase');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'customOrders'), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          productType: formData.productType,
          description: formData.description,
          images: [], // Kept empty for schema compatibility
          submittedAt: serverTimestamp(),
        });
        console.log('Order submitted directly to Firestore.');
      }

      // Automatically open WhatsApp link
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        productType: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-orders-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="custom-orders-title"
      >
        Request a Custom Order
      </motion.h1>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="submitted-message"
        >
          <h2>Order Submitted!</h2>
          <p>Your custom order request details have been successfully saved.</p>
          <div className="whatsapp-redirect-box">
            <p><strong>Next Step:</strong> We've opened a WhatsApp chat to send your photos.</p>
            <p>If the chat didn't open automatically, click the button below to send your files:</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-redirect-btn"
            >
              Send Photos on WhatsApp
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="custom-orders-form"
        >
          <div className="whatsapp-instruction-card">
            <p><strong>How it works:</strong> Fill out your details below. Once you click <strong>Submit Request</strong>, we will save your info and open WhatsApp so you can send your custom photos directly to us.</p>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Product Type</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              <option value="Polaroids">Polaroids</option>
              <option value="Mini Album">Mini Album</option>
              <option value="Photo Frame">Photo Frame</option>
              <option value="Ring Album">Ring Album</option>
              <option value="Scrapbook">Scrapbook</option>
              <option value="Poloroid Stand">Polaroid Stand</option>
              <option value="Custom Gift">Custom Gift</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description / Customization Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            ></textarea>
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </motion.form>
      )}

      <div className="whatsapp-chat">
        <p>Or chat with us directly on WhatsApp</p>
        <a
          href="https://wa.me/9037258541"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default CustomOrders;
