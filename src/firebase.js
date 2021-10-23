import firebase from 'firebase/app'
import 'firebase/firebase-messaging'


var config = {
    apiKey: "AIzaSyCBlCCyd5wBFkLgn7E-hQfLqRLxj9NtB8o",
    authDomain: "notificaciones-1784b.firebaseapp.com",
    projectId: "notificaciones-1784b",
    storageBucket: "notificaciones-1784b.appspot.com",
    messagingSenderId: "84796054027",
    appId: "1:84796054027:web:ee8f55a92bea6c2706450e",
    measurementId: "G-0L90RNQKYY"
}

firebase.initializeApp(config);

export default firebase.messaging()