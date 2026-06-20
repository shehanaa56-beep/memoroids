const admin = require('firebase-admin');

// Initialize Firebase Admin SDK only once (persists across warm invocations)
if (!admin.apps.length) {
  let serviceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    try {
      serviceAccount = require('../../firebase-service-account.json');
    } catch (e) {
      console.error("Firebase service account file not found. Please place firebase-service-account.json at the root of the project.");
    }
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'memoroids-eb658.firebasestorage.app'
    });
  } else {
    // Fallback/Placeholder initialization or throw error
    admin.initializeApp({
      projectId: 'memoroids-eb658'
    });
  }
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
