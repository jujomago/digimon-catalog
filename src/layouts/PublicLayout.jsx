import { useContext } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"


export const PublicLayout = ({ component: Component }) => {

    const { status } = useSelector(state => state.auth)

    return status === 'authenticated' ? <Navigate to="/dashboard" /> : Component

}