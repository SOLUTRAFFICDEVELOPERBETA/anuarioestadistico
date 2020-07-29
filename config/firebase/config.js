// Configuración del proyecto de firebase
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket
    // messagingSenderId: "1085099241149",
    // appId: "1:1085099241149:web:381c83a9fdd5f72a1451d4",
  }
  
  export default firebaseConfig