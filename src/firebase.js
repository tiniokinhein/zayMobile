import firebase from 'firebase/app'
import 'firebase/database'

  var firebaseConfig = {
    apiKey: "AIzaSyAv9Q2Db9YMWd2qZw1JRiMOLEBwLLUuPE4",
    authDomain: "baganzay-e044a.firebaseapp.com",
    databaseURL: "https://baganzay-e044a.firebaseio.com",
    projectId: "baganzay-e044a",
    storageBucket: "baganzay-e044a.appspot.com",
    messagingSenderId: "1062472582134",
    appId: "1:1062472582134:web:8b4e9d1236511ba8c03dd7"
  }

  firebase.initializeApp(firebaseConfig)

export const db = firebase.database()