import { ReactElement, ReactNode, createContext, useEffect, useState } from "react"
import { signin, signup,signout } from "../firebase/auth"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebaseconfgig"

export const Authprovider = createContext<any>({})
const Authcontext = ({children}:{children:ReactNode}):ReactElement => {
    const [user,setuser] = useState<any>({})
    const [loading,setloading] = useState<Boolean>(false);
//TODO add types

interface valuetype{
    signupwithemail:(email:string,password:string)=>Promise<unknown>,
    signinwithemail:(email:string,password:string)=>Promise<User | undefined>
    logout:()=>Promise<void>,
    user:any,
}
    const signupwithemail = async(email:string,password:string)=>{
           const signupwithemail = await signup(email,password)
           return signupwithemail
    }
    const signinwithemail = async(email:string,password:string)=>{
           const signinwithemail = await signin(email,password)
           return signinwithemail?.user
    }
    const logout = async()=>{
           return await signout()
    }
        
    useEffect(()=>{
        const s  =  onAuthStateChanged(auth,user=>{
            setloading(true)
            setuser(user)
            if(user==null){
                
                console.log(user);
            }
        
            
           
           })
           return ()=>{
            s()
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