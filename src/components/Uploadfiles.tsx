import { DocumentData } from "firebase/firestore"
import folders from "../types/folder"
import { AiFillFileAdd } from "react-icons/ai"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Authprovider } from "../context/Authcontext";
import * as f from "../queries/uploadfile"
const Uploadfiles = ({folders}:{folders:folders|DocumentData}) => {
  console.log(folders.path);  
  const[file,setfile] = useState<File>();
  const auth = useContext(Authprovider)
  const handlechange = (e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files === null) return;
      setfile(e.target.files[0])  
    }
   useEffect(()=>{
    if(file === undefined) return;  
    f.store(auth.user.uid,file,folders.path);
   },[file])
  return (
    <label className="relative cursor-pointer overflow-hidden text-3xl border-2  shadow hover:shadow-2xl border-blue-600 p-1">
    

    <AiFillFileAdd/>
    <input type="file"  className="absolute left-[-9999px]" onChange={handlechange}/>
    </label>
  )
}

export default Uploadfiles