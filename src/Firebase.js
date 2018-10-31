import * as firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAl-sQFByS32KUlProNrafHa2N-wtS1j_g",
    authDomain: "auth-99adf.firebaseapp.com",
    databaseURL: "https://auth-99adf.firebaseio.com",
    projectId: "auth-99adf",
    storageBucket: "auth-99adf.appspot.com",
    messagingSenderId: "625570489757"
}


firebase.initializeApp(config)


export default firebase;
