import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await signWithGoogle()
        if (!result.ok) return dispatch(logout())
        dispatch(login(result))
    }
}

export const startRegisterWithEmailPassword = ({ email, password, firstName, lastName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword(email, password, firstName, lastName)
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, photoURL, email, displayName: firstName + " " + lastName, errorMessage }))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => async dispatch => {

    dispatch(checkingCredentials())
    const { ok, errorMessage, uid, photoURL, displayName } = await loginWithEmailPassword(email, password)
    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, photoURL, email, displayName, errorMessage }))

}



export const startLogout = () => async (dispatch) => {
    await logoutFirebase();
    dispatch(logout({}))
}

