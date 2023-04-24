import {  ReactElement, useContext } from "react"
import { Navigate } from "react-router-dom"
import { Authprovider } from "../context/Authcontext"
const Protectedroute = ({children}:{children:ReactElement}) => {
const auth = useContext(Authprovider);
    if (auth.user) {
        return children
    }

  return (
    <Navigate to='/' replace={true}/>
  )
}

export default Protectedroute