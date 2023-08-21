import {  useContext,    useState } from "react"
import {  useNavigate } from "react-router-dom"
import { Authprovider } from "../context/Authcontext"
import { FirebaseError } from "firebase/app";
import { ScaleLoader } from "react-spinners";
// import { FirebaseError } from "firebase/app";
const Login = () => {
    const navigate = useNavigate();
    // const usernameref = useRef<HTMLInputElement>(null)
    // const passwordref = useRef<HTMLInputElement>(null)
    const [msg, setmsg] = useState<string>("")
    const [loading, setloading] = useState<boolean>(false)

    const { signinwithGoogle } = useContext(Authprovider);
//     const handlesubmit = async(e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         try{
            
//             setloading(true);
//             await signinwithemail(usernameref.current!.value, passwordref.current!.value)
//                 navigate('/'); 
          
        
//             // console.log(res);
//         }

//         catch(error:unknown){
//             if(error instanceof FirebaseError){
//                 setmsg("invalid email/password Cannot LOGIN")
//             }
//         }
        





    
//     setloading(false)
// }

const handlelogin = async()=>{
    try{
            
        setloading(true);
        await signinwithGoogle()
            navigate('/'); 
      
    
        // console.log(res);
    }

    catch(error:unknown){
        if(error instanceof FirebaseError){
            setmsg("invalid email/password Cannot LOGIN")
            navigate("/error")
        }
    }
    setloading(false)
}
// useEffect(()=>{
//     handlelogin()
// },[])
return (
    <>
        {
            loading ? 
            <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden">
            <ScaleLoader  color="#000" />
            </div> :
                <aside className="flex justify-center items-center flex-col h-[100vh] gap-5 ">
                    {
                        msg ? <h3 className="font-Abel text-xl bg-red-700 bg-opacity-100 text-white py-2 px-4" >{msg}</h3> : null

                    }
                    <button className="logininwithgoogle py-2 px-5 text-2xl font-Abel text-white bg-blue-800" onClick={handlelogin}>signin with Google</button>

                </aside>
        }
    </>
)
}
// abhijitrayarao1@gmail.com
export default Login