const { admin, db } = require('./_lib/firebase');
const { IncomingForm } = require('formidable');

// Disable default body parsing ONLY for multipart/form-data
// Next.js parses JSON bodies by default. We can inspect the request.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb', // Increase size limit to handle base64 images
    },
  },
};

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const contentType = req.headers['content-type'] || '';

    // If JSON request (containing base64 images)
    if (contentType.includes('application/json')) {
      const { name, email, phone, productType, description, images } = req.body;

      if (!name || !email || !productType || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const docRef = await db.collection('customOrders').add({
        name: name || '',
        email: email || '',
        phone: phone || '',
        productType: productType || '',
        description: description || '',
        images: images || [],
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(201).json({
        message: 'Custom order submitted successfully!',
        orderId: docRef.id
      });
    }

    // Otherwise, parse as multipart form data
    const form = new IncomingForm({ multiples: true, maxFiles: 20, maxFileSize: 5 * 1024 * 1024 });

    const { fields } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
    const productType = Array.isArray(fields.productType) ? fields.productType[0] : fields.productType;
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

    if (!name || !email || !productType || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const docRef = await db.collection('customOrders').add({
      name: name || '',
      email: email || '',
      phone: phone || '',
      productType: productType || '',
      description: description || '',
      images: [], // Fallback for multipart
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({
      message: 'Custom order submitted successfully!',
      orderId: docRef.id
    });
  } catch (error) {
    console.error('Error saving custom order:', error);
    res.status(500).json({
      message: 'Error submitting custom order',
      error: error.message
    });
  }
};
