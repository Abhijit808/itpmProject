import { DocumentData } from "firebase/firestore"
import folders from "../types/folder"
import { AiFillFolderAdd } from "react-icons/ai"
import { ChangeEvent, useContext} from "react";
import { Authprovider } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import * as f from "../queries/uploadfile"
import { FirebaseError } from "firebase/app";
import { uploadEntireFolder } from "../queries/uploadfolders";
import obj from "../types/obj";
// import { getsingledoc } from "../queries/getdoc";
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}
const UploadFolders = ({ folders }: { folders: folders | DocumentData }) => {
  const auth = useContext(Authprovider);
  const { folderid } = useParams();
  const navigate = useNavigate();

  const uploadfiles = async (folder: any, files: any,path:[string]) => {
    if (files)
      for (let i = 0; i < files.length; ++i) {
        const file = files[i]; if (file === undefined) return;
        f.Store(auth.user.uid, files[i], path, folder);
      
      }
    else {
      console.log("Error in upload");

    }
  }
   const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    const Path = [] as any
    console.log(e.target.files);
    
    const folder: obj = {

      foldername: e.target.files![0].webkitRelativePath.split("/")?.[0],
      parentid: folderid,
      path: Path,
      childfolders: [""],
      childfiles: [""],
      Createdat: "",
      createdby: auth.user.uid,
    }
    if (folder.parentid === undefined) {
      folder.parentid = null
    }
    try {
      if (folderid === undefined) {
        // Path = [];
        Path.push("Root")
      }
      if (folderid) {
        Path.push(...folders.path, folderid)
      }
      const uploadData = await uploadEntireFolder(folder);
      console.log(Path);
      uploadfiles(uploadData.id, e.target.files,Path);
    } catch (e) {
      if (e instanceof (FirebaseError)) {
        navigate("/error");
      }
    }
  }
 return (
    <label className="relative cursor-pointer overflow-hidden text-3xl border-2  shadow hover:shadow-2xl border-blue-600 p-1">


      <AiFillFolderAdd />
      <input type="file" className="absolute left-[-9999px]" onChange={handlechange} webkitdirectory='' multiple directory="" />
    </label>
  )
}

export default UploadFolders