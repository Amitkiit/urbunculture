const admin = require("firebase-admin");

// Path to your Firebase service account key JSON file
const serviceAccount = require("../path-to-your-service-account-key.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com",
  });
}

const db = admin.firestore();

module.exports = db;
