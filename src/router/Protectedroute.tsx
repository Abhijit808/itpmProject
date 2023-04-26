import { ReactElement, useContext } from "react"
import { Navigate } from "react-router-dom"
import { Authprovider } from "../context/Authcontext"
const Protectedroute = ({ children }: { children: ReactElement }) => {
  const auth = useContext(Authprovider);
  if (auth.user || auth.signin) {
    return children
  }
  else {
   <Navigate to={'/'} replace/>
  }
  return null
}

export default Protectedroute