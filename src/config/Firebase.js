import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD7kAIDML4X4sQWYyXyGtL8C6D6bzVKLqY",
  authDomain: "sezzle-27eb8.firebaseapp.com",
  databaseURL: "https://sezzle-27eb8.firebaseio.com",
  projectId: "sezzle-27eb8",
  storageBucket: "sezzle-27eb8.appspot.com",
  messagingSenderId: "572844293226",
  appId: "1:572844293226:web:da2b8224fa6af28604de13",
  measurementId: "G-EW6L7ZHQMY"
}


let Firebase = !firebase.apps.length && firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export default Firebase