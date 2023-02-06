// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import {
    addDoc,
    getFirestore,
    collection,
    onSnapshot,
    query
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5m-LMFxGWWblooy7iQ7k46RkE9HX_YII",
  authDomain: "goal-a.firebaseapp.com",
  projectId: "goal-a",
  storageBucket: "goal-a.appspot.com",
  messagingSenderId: "123020628726",
  appId: "1:123020628726:web:d942a1a4b49015966312d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}

async function test(string) {
    try {
        await addDoc(collection(db, 'tests'), {
            testString: string
        });
    } catch (error) {
        console.error(error)
    }
}

async function submitGoal(uid, goalObject) {
    try {
        await addDoc(collection(db, 'users', uid, 'goals'), {
            ...goalObject
        })
    } catch (error) {
        console.error(error)
    }
}

function getGoals(uid, callback) {
    return onSnapshot(
        query(
            collection(db, 'users', uid, 'goals'),
        ),
        (querySnapshot) => {
            const goals = querySnapshot.docs;
            callback(goals)
        }
    )
}


// multi auth testing

// function onSolvedRecaptcha() {
//     console.log('recaptcha solved')
// }

// const recaptchaVerifier = new RecaptchaVerifier(
//     "recaptcha-container",

//     // Optional reCAPTCHA parameters.
//     {
//       "size": "normal",
//       "callback": function(response) {
//         console.log(response)
//         // reCAPTCHA solved, you can proceed with 
//         // phoneAuthProvider.verifyPhoneNumber(...).
//         onSolvedRecaptcha();
//       },
//       "expired-callback": function() {
//         // Response expired. Ask user to solve reCAPTCHA again.
//         // ...
//         console.log('u failed')
//       }
//     }, app
// );

export { loginWithGoogle, test, submitGoal, getGoals }