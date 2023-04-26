import { Link, useNavigate } from "react-router-dom"

import React, { useContext, useState } from 'react'
import {Authprovider} from "../context/Authcontext"
const App = ()=>{
  const [username,setusername]= useState<string>("")
  const [password,setpassword]= useState<string>("")
  const handleauth = useContext(Authprovider)
  const navigate =  useNavigate()
 const handlesubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if (username === ''||password === '') {
    console.log(404);
      return
  }
 const res =  await handleauth.signupwithemail(username,password);
       if(res){
        navigate('/')
       }   
 }
  return (
    <>
    <aside className="flex justify-center items-center  h-[100vh] gap-5 overflow-y-scroll ">

    <form className="flex flex-wrap flex-col justify-between items-stretch w-[50%] gap-5 py-5 px-10 shadow-lg shadow-blue-700 " onSubmit={handlesubmit}>
    <h3 className='text-3xl text-center flex-1'>SIGNUP</h3>    

    <div className="inputs flex flex-col gap-2 justify-between">
      <span className="font-Abel text-2xl">Username</span>
      <input type="text" name="username" value={username} onChange={(e)=>setusername(e.target.value)}  className="border-2 border-blue-700 p-1"/>
    </div>
    <div className="inputs flex flex-col gap-2 justify-between flex-1">
      <span className="font-Abel text-2xl">Email</span>
      <input type="text" name="" id="" className="border-2 border-blue-700 p-1"/>
    </div>
    <div className="inputs flex flex-col gap-2 justify-between flex-1">
      <span className="font-Abel text-2xl">Password</span>
      <input type="text" name="" id="" className="border-2 border-blue-700 p-1" value ={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setpassword(e.target.value)}/>
    </div>
    <div className="inputs flex flex-col gap-2 justify-between flex-1">
      <span className="font-Abel text-2xl">confirm password</span>
      <input type="text" name="" id="" className="border-2 border-blue-700 p-1"/>
    </div>
    
    <div className="btns flex flex-col gap-5 flex-1 ">
                     <input type="submit" value="SIGNUP" className="bg-blue-700 text-white p-2 w-full cursor-pointer transition-all  hover:rounded-full " />
                     <p>
                      Already a user 
                    <Link to='/' className="underline">
                        login
                    </Link>
                     </p>
                </div>
    </form>
    </aside>
    </>
  )
}

export default App
