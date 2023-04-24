import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut} from "firebase/auth"
import{ auth} from './firebaseconfgig'
const signup = async(email:string,password:string)=>{
    try {
        const signupwithemail = await createUserWithEmailAndPassword(auth,email,password)
        const res = await signupwithemail
        return res    
    } catch (error) {
        return error
    }
}


const signin = async(email:string,password:string)=>{
    try{
        const signinwithemail = await signInWithEmailAndPassword(auth,email,password)
        const res = await signinwithemail;
        return res
    }
    catch(err){
        console.log(err);
        
    }
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