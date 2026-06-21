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

      if (!import.meta.env.DEV) {
        try {
          const res = await fetch(`${API_URL}/api/custom-orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              productType: formData.productType,
              description: formData.description,
              images: [],
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
        const { db } = await import('../firebase');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'customOrders'), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          productType: formData.productType,
          description: formData.description,
          images: [],
          submittedAt: serverTimestamp(),
        });
        console.log('Order submitted directly to Firestore.');
      }

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', productType: '', description: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="co-page">

      {/* Header area with doodles */}
      <div className="co-header">
        <div className="co-doodle co-heart-tl">❤</div>
        <div className="co-doodle co-sparkle-tr">
          <svg viewBox="0 0 24 24" fill="none" stroke="#d57a8f" strokeWidth="1.8" strokeLinecap="round" width="32">
            <path d="M5 12h14M12 5v14M7 7l10 10M17 7L7 17"/>
          </svg>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="co-title"
        >
          Request a<br />Custom Order
        </motion.h1>
        <p className="co-subtitle">
          Fill out your details below and we'll get back to you on WhatsApp <span className="co-pink-heart">💗</span>
        </p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="co-submitted"
        >
          <h2>Order Submitted!</h2>
          <p>Your custom order request details have been successfully saved.</p>
          <div className="co-wa-redirect">
            <p><strong>Next Step:</strong> We've opened a WhatsApp chat to send your photos.</p>
            <p>If the chat didn't open automatically, click the button below:</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="co-wa-redirect-btn">
              Send Photos on WhatsApp
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="co-form"
        >
          {/* Name */}
          <div className="co-field">
            <label>
              <span className="co-field-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d57a8f" strokeWidth="2" strokeLinecap="round" width="18">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              Name <span className="co-req">*</span>
            </label>
            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
          </div>

          {/* Email */}
          <div className="co-field">
            <label>
              <span className="co-field-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d57a8f" strokeWidth="2" strokeLinecap="round" width="18">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7l-10 7L2 7"/>
                </svg>
              </span>
              Email <span className="co-req">*</span>
            </label>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>

          {/* Phone */}
          <div className="co-field">
            <label>
              <span className="co-field-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d57a8f" strokeWidth="2" strokeLinecap="round" width="18">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              Phone / WhatsApp Number <span className="co-req">*</span>
            </label>
            <input type="tel" name="phone" placeholder="Enter your number" value={formData.phone} onChange={handleChange} />
          </div>

          {/* Product Type */}
          <div className="co-field">
            <label>
              <span className="co-field-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d57a8f" strokeWidth="2" strokeLinecap="round" width="18">
                  <rect x="3" y="8" width="18" height="13" rx="2"/>
                  <path d="M12 8V21M3 13h18"/>
                  <path d="M8 8C8 5 10 3 12 3s4 2 4 5"/>
                </svg>
              </span>
              Product Type <span className="co-req">*</span>
            </label>
            <select name="productType" value={formData.productType} onChange={handleChange} required>
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

          {/* Description */}
          <div className="co-field">
            <label>
              <span className="co-field-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d57a8f" strokeWidth="2" strokeLinecap="round" width="18">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              Description / Customization Details <span className="co-req">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Tell us your idea, theme, size, colors, photos, any special requests..."
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            ></textarea>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="co-error">
              {error}
            </motion.div>
          )}

          <button type="submit" className="co-submit-btn" disabled={loading}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" className="co-submit-icon">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </motion.form>
      )}

      {/* WhatsApp chat bar */}
      <div className="co-wa-bar">
        <div className="co-wa-bar-left">
          <div className="co-wa-icon-circle">
            <svg viewBox="0 0 24 24" fill="#25d366" width="24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div className="co-wa-bar-text">
            <p className="co-wa-bar-title">Or chat with us directly on WhatsApp</p>
            <p className="co-wa-bar-sub">We're here to help! <span>💗</span></p>
          </div>
        </div>
        <a href="https://wa.me/919037258541" target="_blank" rel="noopener noreferrer" className="co-wa-chat-btn">
          Chat on WhatsApp <span>›</span>
        </a>
      </div>

      {/* Trust badges */}
      <div className="co-trust-badges">
        <div className="co-badge">
          <div className="co-badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round" width="24">
              <path d="M12 21C11.3 20.3,3.5 13.5,3.5 9C3.5 5.5,6.5 2.5,10 2.5C11.9 2.5,12 3.5,12 3.5C12 3.5,12.1 2.5,14 2.5C17.5 2.5,20.5 5.5,20.5 9C20.5 13.5,12.7 20.3,12 21Z"/>
            </svg>
          </div>
          <span>Made<br/>with Love</span>
        </div>
        <div className="co-badge">
          <div className="co-badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round" width="24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <span>100% Safe<br/>& Secure</span>
        </div>
        <div className="co-badge">
          <div className="co-badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round" width="24">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <span>Quick<br/>Response</span>
        </div>
        <div className="co-badge">
          <div className="co-badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#e3627d" strokeWidth="2" strokeLinecap="round" width="24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span>Happy<br/>Customers</span>
        </div>
      </div>

    </div>
  );
};

export default CustomOrders;
