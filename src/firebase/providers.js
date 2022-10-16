import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, updateCurrentUser, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const googleProvider = new GoogleAuthProvider();

export const signWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (e) {
        console.log('error:', e)
        return {
            ok: false,
            errorCode: e.code,
            errorMessage: e.message
        }
    }
}

export const registerUserWithEmailPassword = async (email, password, firstName, lastName) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        await updateProfile(FirebaseAuth.currentUser, { displayName: firstName + " " + lastName })
        const { photoURL, uid } = result.user;
        return {
            ok: true,
            displayName: firstName + " " + lastName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        return {
            ok: false,
            errorCode: error.code,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { displayName, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        console.log('dio error');
        console.log(error);
        return {
            ok: false,
            errorCode: error.code,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}