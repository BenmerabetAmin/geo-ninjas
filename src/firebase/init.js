import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


const config = {
    apiKey: "AIzaSyD0LOHs39VhFHqrfXKgg_sRzDNOMwEpt-M",
    authDomain: "geo-ninjas-f68bb.firebaseapp.com",
    projectId: "geo-ninjas-f68bb",
    storageBucket: "geo-ninjas-f68bb.appspot.com",
    messagingSenderId: "12024821383",
    appId: "1:12024821383:web:ca5dd3e0cc2fe010132a22"
  };

  const firebaseApp =firebase.initializeApp(config)


  export default firebaseApp.firestore()