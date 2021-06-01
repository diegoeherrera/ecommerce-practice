import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBf_OuB5OQsKMNO5bGuDJ7KHB-e0zKfCF8",
    authDomain: "cwrn-db-f22ad.firebaseapp.com",
    projectId: "cwrn-db-f22ad",
    storageBucket: "cwrn-db-f22ad.appspot.com",
    messagingSenderId: "67705618415",
    appId: "1:67705618415:web:5a1d314b7e74fbe69b801a"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get();
    console.log("entro: ", snapshot)
  if(!snapshot.exist){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log('error creating user', error.message)
    }

  }

  return userRef;
}
  // Initialize Firebase
  firebase.initializeApp(config);




  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider)

  export default firebase;