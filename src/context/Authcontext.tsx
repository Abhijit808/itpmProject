import { ReactElement, ReactNode, createContext, useEffect, useState } from "react"
import { signin, signup,} from "../firebase/auth"
import { User, UserCredential, onAuthStateChanged, signOut} from "firebase/auth"
import { auth } from "../firebase/firebaseconfgig"
// import { Navigate } from "react-router-dom"
// import { Navigate } from "react-router-dom"
// import { Navigate, useNavigate } from "react-router-dom"

export const Authprovider = createContext<any>({})
const Authcontext = ({children}:{children:ReactNode}):ReactElement => {
    // const navigate = useNavigate()
    const [user,setuser] = useState<User|null>(null)
    const [loading,setloading] = useState<Boolean>(false);
//TODO add types

interface valuetype{
    signupwithemail:(email:string,password:string)=>Promise<UserCredential|undefined>,
    signinwithemail:(email:string,password:string)=>Promise<UserCredential|undefined>
    logout:()=>Promise<void>,
    user:User|null,
}
    const signupwithemail = async(email:string,password:string)=>{
           const signupwithemail = await signup(email,password)
           return signupwithemail
    }
    const signinwithemail = async(email:string,password:string)=>{
        const login = await signin(email,password);
        return login
    }
    const logout = ()=>{
           return signOut(auth)     
    }
        
    useEffect(()=>{
        const unlisten  =  onAuthStateChanged(auth,(currentuser)=>{
                // if(currentuser){
                    setuser(currentuser)
                    setloading(true)
                // }
            
           
           })
           return ()=>{
            unlisten()
           }
    },[])
 const value:valuetype={
    signupwithemail,
    signinwithemail,
   logout,
    user,
}
 return (
     <>
    <Authprovider.Provider value={value}>
        {loading&&children}
    </Authprovider.Provider>
    </>
  )
}

export default Authcontext