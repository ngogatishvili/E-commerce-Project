import { app } from "./config";

import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc,getFirestore,setDoc,getDoc, collection} from "firebase/firestore";



export const auth=getAuth(app);
export const db=getFirestore(app);

const userRefCol=collection(db,"users");


const GoogleProvider=new GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt:"select_account"});

export const SignInWithGoogle=()=>signInWithPopup(auth,GoogleProvider);

export const handleUserProfile=async(userAuth,additionalData)=>{
    
    if(!userAuth) return;

    const {uid}=userAuth;

    const userRef=doc(db,"users",uid);

    const snapshot=await getDoc(userRef);

    if(!snapshot.exists()) {
        const {displayName,email}=userAuth;
        const timeStamp=new Date();
        try {
        await setDoc(doc(userRefCol,uid),{
            displayName,
            email,
            createdDate:timeStamp,
            ...additionalData
        })
        }catch(err) {
            // console.log(err);
        }
    }

    return userRef;
        
}