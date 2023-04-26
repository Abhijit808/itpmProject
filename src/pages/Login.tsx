import { FormEvent, useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Authprovider } from "../context/Authcontext"
import { FirebaseError } from "firebase/app";
// import { FirebaseError } from "firebase/app";
const Login = () => {
    const navigate = useNavigate();
    const usernameref = useRef<HTMLInputElement>(null)
    const passwordref = useRef<HTMLInputElement>(null)
    const [msg, setmsg] = useState<string>("")
    const [loading, setloading] = useState<Boolean>(false)

    const { signinwithemail } = useContext(Authprovider);
    const handlesubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            
            setloading(true);
           const res =  await signinwithemail(usernameref.current!.value, passwordref.current!.value)
           if (res) {
               return navigate('/Dashboard'); 
           }
            // console.log(res);
        }

        catch(error:unknown){
            if(error instanceof FirebaseError){
                setmsg(error.message)
            }
        }
        





    
    setloading(false)
}

return (
    <>
        {
            loading ? <div className="loading">loading...</div> :
                <aside className="flex justify-center items-center flex-col h-[100vh] gap-5 ">
                    {
                        msg ? <div>{msg}</div> : null

                    }
                    <form className="flex flex-wrap flex-col justify-between items-stretch w-fit gap-5 py-5 px-5 shadow-lg shadow-blue-700 " onSubmit={handlesubmit}>
                        <h3 className='text-3xl text-center font-Abel'>LOGIN</h3>

                        <div className="inputs flex flex-col gap-2 justify-between">
                            <span className="font-Abel text-xl">Username</span>
                            <input type="text" name="" id="" className="border-2 p-1 border-blue-700" ref={usernameref} />
                        </div>
                        <div className="inputs flex flex-col gap-2">
                            <span className="font-Abel text-xl">Password</span>
                            <input type="text" name="" id="" className="border-2 p-1 border-blue-700" ref={passwordref} />
                        </div>
                        <div className="btns flex flex-col gap-5 cursor-pointer">

                            <input type="submit" value="LOGIN" className="border-2 border-blue-700 p-2 w-full cursor-pointer" disabled={loading}/>
                            <p className="flex gap-1 justify-center font-Abel">
                                New user?
                                <Link to='/Signup' className="underline">
                                    signup
                                </Link>
                            </p>
                        </div>
                    </form>

                </aside>
        }
    </>
)
}
// abhijitrayarao1@gmail.com
export default Login