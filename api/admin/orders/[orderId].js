const { db } = require('../_lib/firebase');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get orderId from the URL path
  const { orderId } = req.query;

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Simple token validation
  const decodedParts = Buffer.from(token, 'base64').toString().split(':');
  if (decodedParts[0] !== 'admin' || decodedParts[1] !== 'memoroidsbyshehana@gmail.com') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    if (req.method === 'PUT') {
      const { status } = req.body;
      await db.collection('customOrders').doc(orderId).update({ status });
      return res.json({ message: 'Order status updated' });
    }

    if (req.method === 'DELETE') {
      await db.collection('customOrders').doc(orderId).delete();
      return res.json({ message: 'Order deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error with order:', error);
    res.status(500).json({ message: 'Error processing order', error: error.message });
  }
};
