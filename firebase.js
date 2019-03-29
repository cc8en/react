import firebase from "firebase";

const config =  {
    apiKey: "AIzaSyCyeaY1TbRrLEH8TeH3S9aubujYhrqUZHg",
    authDomain: "data-8c9eb.firebaseapp.com",
    databaseURL: "https://data-8c9eb.firebaseio.com",
    projectId: "data-8c9eb",
    storageBucket: "",
    messagingSenderId: "807731574233"
  };

firebase.initializeApp(config);

export default firebase;