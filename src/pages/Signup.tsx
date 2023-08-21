import { Link, useNavigate } from "react-router-dom"

import React, { useContext, useState } from 'react'
import {Authprovider} from "../context/Authcontext"
import { FirebaseError } from "firebase/app"
import { ScaleLoader } from "react-spinners"
const App = ()=>{
  const [username,setusername]= useState<string>("")
  const [password,setpassword]= useState<string>("")
  const [Confirmpassword,setConfirmpassword]= useState<string>("")
  const [error,seterror]= useState<string>("")
  const [loading,setloading]= useState<boolean>(false)
  const handleauth = useContext(Authprovider)
  const navigate =  useNavigate()
 const handlesubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try{
      setloading(true);
      console.log(username + "  " +password + "  "+ Confirmpassword);
      
    if ((username === ''||password === '')||(username === '' && password === '')) {
      setloading(false);
      seterror("please enter username and Password ")
      return;      
    }
    if (password !== Confirmpassword) {
      setloading(false);
      seterror("Passwords do not match")
      return;
    }
    const res =  await handleauth.signupwithemail(username,password);
    if(res){
      navigate('/')
    } 
    setloading(false);
  }catch(e){
    if (e instanceof(FirebaseError)) {
      seterror("sorry cannot sign in");
    }
  }
 }
  return (
    <>

    {
            loading ? 
            <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden">
            <ScaleLoader  color="#000" />
            </div> :
                <aside className="flex justify-center items-center flex-col h-[100vh] gap-5 ">
                    {
                        error ? <h3 className="font-Abel text-xl bg-red-700 bg-opacity-100 text-white py-2 px-4" >{error}</h3> : null

                    }
                    <form className="flex flex-wrap flex-col justify-between items-stretch w-fit gap-5 py-5 px-5 shadow-lg shadow-blue-700 " onSubmit={handlesubmit}>
                        <h3 className='text-3xl text-center font-Abel'>SIGNUP</h3>

                        <div className="inputs flex flex-col gap-2 justify-between">
                            <span className="font-Abel text-xl">Username</span>
                            <input type="text" name="" id="" className="border-2 p-1 border-blue-700" onChange={(e)=>setusername(e.target.value)} />
                        </div>
                        <div className="inputs flex flex-col gap-2">
                            <span className="font-Abel text-xl">Password</span>
                            <input type="password" name="" id="password" className="border-2 p-1 border-blue-700" onChange={(e)=>setpassword(e.target.value)} />
                        </div>
                        <div className="inputs flex flex-col gap-2">
                            <span className="font-Abel text-xl">ConfirmPassword</span>
                            <input type="password" name="" id="cpassword" className="border-2 p-1 border-blue-700" onChange={(e)=>setConfirmpassword(e.target.value)} />
                        </div>
                        <div className="btns flex flex-col gap-5 cursor-pointer">

                            <input type="submit" value="LOGIN" className="border-2 border-blue-700 p-2 w-full cursor-pointer" disabled={loading}/>
                            <p className="flex gap-1 justify-center font-Abel">
                                Already user?
                                <Link to='/login' className="underline">
                                    login
                                </Link>
                            </p>
                        </div>
                    </form>

                </aside>
        }
        </>
  )
}

export default App
