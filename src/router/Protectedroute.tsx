import { ReactElement, useContext } from "react"
import { Navigate } from "react-router-dom"
import { Authprovider } from "../context/Authcontext"
// import Login from "../pages/Login";
const Protectedroute = ({ children}: { children: ReactElement}) => {
  const auth = useContext(Authprovider);

  console.log(auth);
  if(auth.user){
      return children
  }  
   return <Navigate to="/login" />;

    
  return null
  
}

export default Protectedroute