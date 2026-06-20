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

  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing required email' });
  }

  const normalizedEmail = email.toLowerCase();

  // Admin email check
  if (normalizedEmail === 'memoroidsbyshehana@gmail.com') {
    const token = Buffer.from(`admin:${normalizedEmail}:${Date.now()}`).toString('base64');
    return res.json({ token, role: 'admin', name: name || 'Admin', message: 'Admin login successful' });
  }

  try {
    // Check if user already exists
    const userSnap = await db.collection('users')
      .where('email', '==', normalizedEmail)
      .get();

    let userName = name || 'Google User';

    if (userSnap.empty) {
      // Automatically register new Google sign-in users in the database
      await db.collection('users').add({
        name: userName,
        email: normalizedEmail,
        authProvider: 'google',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      userName = userSnap.docs[0].data().name || userName;
    }

    const token = Buffer.from(`user:${normalizedEmail}:${Date.now()}`).toString('base64');
    return res.json({ token, role: 'user', name: userName, message: 'Login successful' });
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
