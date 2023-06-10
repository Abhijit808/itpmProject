import { DocumentData } from "firebase/firestore"
import folders from "../types/folder"
import { AiFillFileAdd } from "react-icons/ai"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Authprovider } from "../context/Authcontext";
import * as f from "../queries/uploadfile"
const Uploadfiles = ({folders}:{folders:folders|DocumentData}) => {
  const[file,setfile] = useState<File>();
  const auth = useContext(Authprovider)
  const handlechange = (e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files === null) return;
    setfile(e.target.files[0])  
  }
  // console.log(folders);  
  useEffect(()=>{
    if(file === undefined) return; 
    if (Object.keys(folders).length === 0 && folders.constructor === Object ) {
      f.Store(auth.user.uid,file,["Root"],folders.id);
      
    }
    else{
      f.Store(auth.user.uid,file,folders.path,folders.id);
    }
  },[file])
  return (
    <label className="relative cursor-pointer overflow-hidden text-3xl border-2  shadow hover:shadow-2xl border-blue-600 p-1">
    

    <AiFillFileAdd/>
    <input type="file"  className="absolute left-[-9999px]" onChange={handlechange}/>
    </label>
  )
}

export default Uploadfiles