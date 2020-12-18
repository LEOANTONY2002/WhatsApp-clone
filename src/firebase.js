import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVYTEOJhY_12FJO27gGkM1yMuW2mAzGwQ",
  authDomain: "whatsapp-clone-78ad8.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-78ad8.firebaseio.com",
  projectId: "whatsapp-clone-78ad8",
  storageBucket: "whatsapp-clone-78ad8.appspot.com",
  messagingSenderId: "780145329829",
  appId: "1:780145329829:web:1f2eee6c12d9a589f8af4c",
  measurementId: "G-EMPKPZ3XD8"
}); 

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
