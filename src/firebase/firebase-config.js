import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD66mcJq-szSCSim84P1mul9LrK1v92ceM",
  authDomain: "rejections-list.firebaseapp.com",
  databaseURL: "https://rejections-list-default-rtdb.firebaseio.com",
  projectId: "rejections-list",
  storageBucket: "rejections-list.appspot.com",
  messagingSenderId: "1041984355990",
  appId: "1:1041984355990:web:c15b72653d44b946058cb7",
  measurementId: "G-B5PM2EQKJ6"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore(),setting( { timestampsInSnapshots: true });

export default firebase;