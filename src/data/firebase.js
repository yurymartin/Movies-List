import firebase from "firebase/app/";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDa7RlQdJHIRc2MdMY7sCqXoc73EtucMPo",
  authDomain: "movie-list-d5c12.firebaseapp.com",
  databaseURL: "https://movie-list-d5c12.firebaseio.com",
  projectId: "movie-list-d5c12",
  storageBucket: "movie-list-d5c12.appspot.com",
  messagingSenderId: "917732456653",
  appId: "1:917732456653:web:1b251860563408d0c65184",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
