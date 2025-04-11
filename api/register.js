// API endpoint for user registration
const firebase = require('firebase-admin');
const corsMiddleware = require('./middleware/cors');

// Check if Firebase is already initialized to avoid multiple initializations
if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = firebase.firestore();
const auth = firebase.auth();

module.exports = async (req, res) => {
  // Apply CORS middleware
  corsMiddleware(req, res, () => {
    // This is the "next" function that will be called after CORS headers are set
    // Only continue if it's not an OPTIONS request (which is already handled by the middleware)
    if (req.method === 'OPTIONS') return;

    // Only allow POST methods
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
    }

    // Process the request
    processRegisterRequest(req, res);
  });
};

// Separate function to process the registration request
async function processRegisterRequest(req, res) {
  try {
    const { email, password, username } = req.body;

    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: username,
    });

    // Store additional user info in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      username,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      highScore: 0,
      gamesPlayed: 0
    });

    return res.status(201).json({ 
      message: 'User registered successfully',
      userId: userRecord.uid
    });
  } catch (error) {
    console.error('Error registering new user:', error);
    return res.status(500).json({ 
      error: 'Registration failed', 
      message: error.message 
    });
  }
} 