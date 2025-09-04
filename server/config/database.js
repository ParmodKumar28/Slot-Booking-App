import admin from "firebase-admin";
import firebaseServiceAccount from "./firebase.js";

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
});

// Export Firestore database instance
export const db = admin.firestore();

// Export admin for other uses
export { admin };
