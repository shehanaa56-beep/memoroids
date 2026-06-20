const { admin, db } = require('./_lib/firebase');

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

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Prevent registration of the admin email by regular users
  if (email.toLowerCase() === 'memoroidsbyshehana@gmail.com') {
    return res.status(400).json({ message: 'This email is reserved for administration' });
  }

  try {
    // Check if user already exists
    const userSnap = await db.collection('users')
      .where('email', '==', email)
      .get();

    if (!userSnap.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Save user to Firestore
    await db.collection('users').add({
      name,
      email: email.toLowerCase(),
      password,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
