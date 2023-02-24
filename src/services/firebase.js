// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut
} from 'firebase/auth';

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc
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

// problems 2/23
function logOff() {
    console.log('hi')
    const auth = getAuth();
    signOut(auth).then(()=> {
        console.log("Successfully signed off")
    }).catch((error) => {
        console.log("Error signing out")
    })
}

async function submitGoal(uid, goalObject) {
    try {
        await setDoc(doc(db, 'users', uid, 'goals', goalObject.docName), {
            ...goalObject
        })
    } catch (error) {
        console.error(error)
    }
}

async function extendTime(uid, goalId, newDate) {
    try {
        await updateDoc(doc(db, 'users', uid, 'goals', goalId), {
            checkinDueDate: newDate
        })
        
    } catch (error) {
        console.error(error)
    }
}

async function deleteGoal(uid, goalId) {
    try {
        await deleteDoc(doc(db, 'users', uid, 'goals', goalId))
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
            const goals = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(goals)
        }
    )
}

function getSecret(uid, goalId, callback) {
    return onSnapshot(
        query(
            // we want a doc so we query a doc rather than a collection
            doc(db, 'users', uid, 'goals', goalId)
        ),
        (querySnapshot) => {
            // client side never recieves anything but encrypted secretText
            const secret = {
                secretText: querySnapshot.data().secretText,
                checkinDueDate: querySnapshot.data().checkinDueDate
            }
            callback(secret)
        }
    )
}



// Chat services
async function sendMessage(roomID, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomID, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error(error)
    }
}

function getMessages(roomID, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomID, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(messages)
        }
    )
}

// end chat services

export { 
    deleteGoal,
    extendTime, 
    getGoals, 
    getMessages, 
    getSecret,
    loginWithGoogle, 
    logOff,
    sendMessage, 
    submitGoal
 }