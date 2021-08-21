import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDZxQk2FSOrpIBCGZOVV7PZ_ODddgQL3P8",

  authDomain: "socioclan-86a71.firebaseapp.com",

  projectId: "socioclan-86a71",

  storageBucket: "socioclan-86a71.appspot.com",

  messagingSenderId: "242677626248",

  appId: "1:242677626248:web:8d1e9f0b364b6a3bb4363d",

  measurementId: "G-XP8Q16MC2J",
};
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  
  const userRef = firestore.collection("users").doc(user.uid);
  const snapShot=await userRef.get()
  console.log(snapShot)

  if(!snapShot.exists){
    const {displayName,email}=user;
    const createdAt=new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('erroe creating user')
    }
  }
  return userRef

};
 


//Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
