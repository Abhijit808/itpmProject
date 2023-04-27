import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut} from "firebase/auth"
import{ auth} from './firebaseconfgig'
const signup = async(email:string,password:string)=>{
    try {
        const login = await createUserWithEmailAndPassword(auth,email,password)
        const res = await login
        return res    
    } catch (error) {
       console.log(error);
       
    }
}


const signin = async(email:string,password:string)=>{
    // try{
        const sign = await signInWithEmailAndPassword(auth,email,password)
        const res = await sign;
        return res
    // }
   
    
    
}
const signout = async()=>{
    try{

        const Signout = await signOut(auth)
        // console.log(Signout);
        
        return Signout 
    }
    catch(err){
        console.log(err);
        
    }
}

export {signin,signup,signout}