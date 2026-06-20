const { db } = require('./_lib/firebase');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Simple token validation (in production, verify JWT)
    const decodedParts = Buffer.from(token, 'base64').toString().split(':');
    if (decodedParts[0] !== 'admin' || decodedParts[1] !== 'memoroidsbyshehana@gmail.com') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const ordersSnapshot = await db.collection('customOrders').orderBy('submittedAt', 'desc').get();
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
