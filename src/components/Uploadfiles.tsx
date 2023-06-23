import { DocumentData } from "firebase/firestore"
import folders from "../types/folder"
import { AiFillFileAdd } from "react-icons/ai"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Authprovider } from "../context/Authcontext";
import * as f from "../queries/uploadfile"
import { useParams } from "react-router-dom";
const Uploadfiles = ({ folders,handlereload,handleloading }: { folders: folders | DocumentData,handlereload:(reload:boolean)=>void ,handleloading:(reload:boolean)=>void}) => {
  const {folderid} = useParams()
  const[file,setfile] = useState<File>();
  const auth = useContext(Authprovider)
  const handlechange = (e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files === null) return;
    setfile(e.target.files[0]) 
    
  }
  const handlestore = async()=>{
    handleloading(true);
    if(file === undefined) return; 
    // handleloading(true);
    console.log(folderid);
    
    if (folderid === undefined){    
      await f.Store(auth.user.uid,file,["Root"],null);
      handlereload(true); 
    }
    else{
      await f.Store(auth.user.uid,file,folders.path,folders.id);
      
      handlereload(true); 
    }
    handleloading(false);
    // handlereload(false)
    // handlereload(true); 
  }
  // console.log(folders);  
  useEffect(()=>{
    handlestore();
  },[file])
  return (
    <label className="relative cursor-pointer overflow-hidden text-3xl border-2  shadow hover:shadow-2xl border-blue-600 p-1">
    

    <AiFillFileAdd/>
    <input type="file"  className="absolute left-[-9999px]" onChange={handlechange}/>
    </label>
  )
}

export default Uploadfiles