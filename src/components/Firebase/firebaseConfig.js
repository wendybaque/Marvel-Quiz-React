// Firebase 9 :
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// Firebase avec class :
import app from 'firebase/app';
// import du package d'authentification avec class :
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDunfHnc774WXwoAhyaFw2HPHT8XLzx8Ac",
    authDomain: "marvel-quiz-91110.firebaseapp.com",
    projectId: "marvel-quiz-91110",
    storageBucket: "marvel-quiz-91110.appspot.com",
    messagingSenderId: "577754321072",
    appId: "1:577754321072:web:3988737be374bdd5bbab75",
    // ID pour Analytics 
    measurementId: "G-PX1LMNM9E0"
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
    }

    // Méthode d'inscription :
    signupUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    
    // Méthode de conexion :
    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Méthode de déconnexion :
    signoutUser = () => this.auth.signOut();
  }

  export default Firebase;