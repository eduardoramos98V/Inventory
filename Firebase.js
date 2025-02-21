  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc,  getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBMGzQzPdiZep2-fTb89DaQ1dqn6M1j7qE",
    authDomain: "inv-equ.firebaseapp.com",
    projectId: "inv-equ",
    storageBucket: "inv-equ.firebasestorage.app",
    messagingSenderId: "82077583335",
    appId: "1:82077583335:web:46cee98b8022746cd95f42"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("initialized firestore");

  export const addData = (productId, productName, productBrand, productModel, productSerie, productCategory, ownerDepartment, ownerName) => {
    addDoc(collection(db, "equipment"),{productId, productName, productBrand, productModel, productSerie, productCategory, ownerDepartment, ownerName});
  }

  export const getData = async () => {
   return await getDocs(collection(db, "equipment"));
  }

  export const onGetData = (callback) => {
    onSnapshot(collection(db, "equipment"), callback);
  }

  export const deleteData = async (id) => {
    await deleteDoc(doc(db, "equipment", id));
  }

  export const updateData = async (id, data) => {
    await getDoc(doc(db, "equipment", id), data);
  }