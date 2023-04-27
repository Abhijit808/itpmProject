
import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react"
import { Authprovider } from "../context/Authcontext"
import { useNavigate } from "react-router-dom";
import {reference} from "../firebase/storage";
import { uploadBytes } from "firebase/storage";
const Dashboard = () => {
  const navigate = useNavigate();
  const[files,setfiles] =useState<File>()
  const file =useRef(null)
  const auth = useContext(Authprovider);
  const handlefile = (e:ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.files){
      return
    }
    setfiles(e.target.files[0])
  }
  const handlesubmit = (e:FormEvent)=>{
      e.preventDefault();
      console.log(files);
      uploadBytes(reference,files).then(res=>{
        console.log(res);
        
      })
      
  }
  return (
    <>
    <nav className="flex justify-around items-center my-5">
       <div className="font-Abel text-3xl">Dashboard</div>
       <h3 className="font-Abel text-2xl">{auth.user.email}</h3>
       <button className="logout underline font-Abel" onClick={()=>{auth.logout().then((res:any)=>{console.log(res)
       }); navigate('/') }} >LOGOUT</button>
    </nav>
    <main>
        <label  className="addfile">
          <form onSubmit={handlesubmit}>
          <input type="file"  className="border-2 border-blue-700" ref ={file} onChange={handlefile}/>
          <input type="submit" value="upolad" className="font-Abel border-2 border-blue-700 p-3 rounded-md text-xl"  />
          </form>
        </label>
    </main>
    </>
  )
}

export default Dashboard