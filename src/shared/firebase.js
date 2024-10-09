// Config file
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCI0NQ4tT8VILUGE44sho-UKKLIgo3excU",
  authDomain: "tablefox-a9beb.firebaseapp.com",
  databaseURL: "https://tablefox-a9beb.firebaseio.com",
  projectId: "tablefox-a9beb",
  storageBucket: "tablefox-a9beb.appspot.com",
  messagingSenderId: "393222003864"
};
// initialize Firestore
const fb = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export default fb