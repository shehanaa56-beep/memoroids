const { db } = require('./_lib/firebase');

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

  const { email, password } = req.body;

  // Admin credentials requested by user
  const adminEmail = 'memoroidsbyshehana@gmail.com';
  const adminPassword = 'shanusheh@56';

  if (email === adminEmail && password === adminPassword) {
    // Generate a simple admin token
    const token = Buffer.from(`admin:${email}:${Date.now()}`).toString('base64');
    return res.json({ token, role: 'admin', message: 'Admin login successful' });
  }

  try {
    // Check normal users collection in Firestore
    const userSnap = await db.collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .get();

    if (!userSnap.empty) {
      const userDoc = userSnap.docs[0];
      const userData = userDoc.data();
      const token = Buffer.from(`user:${email}:${Date.now()}`).toString('base64');
      return res.json({ token, role: 'user', name: userData.name, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
