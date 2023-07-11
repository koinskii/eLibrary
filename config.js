// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkX3mNELiTrOiL5lTi20uhDzSjDUllqvc",
  authDomain: "biblioteca-eletronica-1fcab.firebaseapp.com",
  projectId: "biblioteca-eletronica-1fcab",
  storageBucket: "biblioteca-eletronica-1fcab.appspot.com",
  messagingSenderId: "249613319251",
  appId: "1:249613319251:web:fe39c2b552e0ef93201aa6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()