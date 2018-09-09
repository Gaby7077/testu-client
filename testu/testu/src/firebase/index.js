import firebase from "firebase/app";
import "firebase/storage"

var config={
    apiKey:process.env.API_KEY,
    authDomain: "testu-cb1cc.firebaseapp.com",
    databaseURL: "https://testu-cb1cc.firebaseio.com",
    projectId: "testu-cb1cc",
    storageBucket: "testu-cb1cc.appspot.com",
    messagingSenderId: "965313007323"
  };
  firebase.initializeApp(config);

  const storage=firebase.storage();

  export {
      storage,firebase as default
  }
