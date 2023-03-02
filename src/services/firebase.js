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

const firebaseConfig = {
  apiKey: "AIzaSyA5m-LMFxGWWblooy7iQ7k46RkE9HX_YII",
  authDomain: "goal-a.firebaseapp.com",
  projectId: "goal-a",
  storageBucket: "goal-a.appspot.com",
  messagingSenderId: "123020628726",
  appId: "1:123020628726:web:d942a1a4b49015966312d7"
};

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

function logOffService() {
    const auth = getAuth();
    signOut(auth).then(()=> {
        console.log("Successfully signed off")
    }).catch((error) => {
        console.log(error)
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

// client could send any date they want. Security rule
async function extendTime(uid, goalId, newDate) {
    try {
        await updateDoc(doc(db, 'users', uid, 'goals', goalId), {
            checkinDueDate: newDate
        })
        
    } catch (error) {
        console.error(error)
    }
}

async function deleteGoal(goal) {
    try {
        await deleteDoc(doc(db, 'users', goal.senderUid, 'goals', goal.docName))
    } catch (error) {
        console.error(error)
    }
}

async function markAchieved(goal) {
    try {
        await updateDoc(doc(db, 'users', goal.senderUid, 'goals', goal.docName), {
            completed: true,
            completionDate: new Date()
        })
    } catch (error) {
        console.error(error)
    }
}


function getGoals(uid, callback) {
    return onSnapshot(
        query(
            collection(db, 'users', uid, 'goals'),
            // orderBy('timestamp', 'asc')
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
            doc(db, 'users', uid, 'goals', goalId)
        ),
        (querySnapshot) => {
            // client side never recieves anything but encrypted secretText and due date
            // if (querySnapshot.data().checkinDueDate)
            // console.log(new Date (querySnapshot.data().checkinDueDate.seconds * 1000) - new Date())
            // console.log(new Date())
            let secret = {
                secretText: "",
                checkinDueDate: querySnapshot.data().checkinDueDate,
                errorMsg: ""
            }
            if (new Date (querySnapshot.data().checkinDueDate.seconds * 1000) - new Date() < 0) {
                secret = {
                    secretText: querySnapshot.data().secretText,
                    checkinDueDate: querySnapshot.data().checkinDueDate,
                    errorMsg: ""
                }
            } else {
                secret.errorMsg = "Due date has not yet passed."
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
    logOffService,
    markAchieved,
    sendMessage, 
    submitGoal
 }