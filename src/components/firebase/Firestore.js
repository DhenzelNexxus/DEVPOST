import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import "firebase/firestore"

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5nv4jhPuor6cU7_K8FiaAu6hcvELs6FU",
    authDomain: "devpost-ef2f0.firebaseapp.com",
    projectId: "devpost-ef2f0",
    storageBucket: "devpost-ef2f0.appspot.com",
    messagingSenderId: "1059935420229",
    appId: "1:1059935420229:web:5725cfefb1940a31f6482c",
    measurementId: "G-0SYH9G6ZJ6"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);


const firestore = getFirestore(app)




export default firestore
