import firebase from "firebase/app";
// import "firebase/database";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyADMrRqfDVaIxld85SX6nAHQew0zHbESEI",
    authDomain: "vaxpaxx-4d69d.firebaseapp.com",
    projectId: "vaxpaxx-4d69d",
    databaseURL: "https://vaxpaxx-4d69d-default-rtdb.firebaseio.com/",
    storageBucket: "vaxpaxx-4d69d.appspot.com",
    messagingSenderId: "66010488037",
    appId: "1:66010488037:web:996376a6c14720c4a3c80c",
    measurementId: "G-8R2LDH4FBE"
};

firebase.initializeApp(config);
//firebase.analytics();

export default firebase;
