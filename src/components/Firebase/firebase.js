// Firebase 9 :
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// Firebase avec class :
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // ID pour Analytics 
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

// Firebase 9 :
  // const app = initializeApp(config);
  // export const auth = getAuth(app);
  // const analytics = getAnalytics(app);

// Firebase avec class :
class Firebase {
  constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
  }

  // Inscription :
  signupUser = (email, password) => 
  this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion :
  loginUser = (email, password) => 
  this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion :
  signoutUser = () => this.auth.signOut();

  // Récupération du mot de passe :
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email); 

  // Firestore (base de données) :
  user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;