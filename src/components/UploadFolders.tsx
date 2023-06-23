import { DocumentData, Timestamp } from "firebase/firestore"
import folders from "../types/folder"
import { AiFillFolderAdd } from "react-icons/ai"
import { ChangeEvent, useContext } from "react";
import { Authprovider } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import * as f from "../queries/uploadfile"
import { FirebaseError } from "firebase/app";
import { uploadEntireFolder } from "../queries/uploadfolders";
import obj from "../types/obj";
// import { ScaleLoader } from "react-spinners";
// import { getsingledoc } from "../queries/getdoc";
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}
const UploadFolders = ({ folders, handlereload, handleloading }: { folders: folders | DocumentData, handlereload: (reload: boolean) => void, handleloading: (reload: boolean) => void }) => {
  const auth = useContext(Authprovider);
  const { folderid } = useParams();
  const navigate = useNavigate();
  // const [loading, setloading] = useState<boolean>(false)
  const uploadfiles = async (folder: any, files: any, path: [string]) => {
    console.log(files);
    
    if (files){
      const file = files; 
      if (file === undefined) return;
      f.Store(auth.user.uid, file, path, folder);
    }
      
    else {
      console.log("Error in upload");

    }
  }

  const removeDuplicates = (arr: any) => {
    const map = new Map();
    arr.forEach((x: any) => map.set(JSON.stringify(x), x));
    arr = [...map.values()];
    return arr;
  };
  const upload = async (e: any, d: any, foldersid: any) => {
    console.log(d);
    const arr: any = []
    const Path = [] as any
    let count = 0;
    let beta, gamma;
    let Delta: any;
    for (const [k, v] of d) {
      try {
        
       
     
      if (count > 0) {
        beta = (k.findIndex(function (item: any) {
          return item.indexOf(v) !== -1;
        }));
        Delta = k[beta - 1];
       
      }

     


      const state: obj = {

        foldername: v,
        parentid: foldersid,
        path: removeDuplicates(Path),
        Createdat: Timestamp.now(),
        createdby: auth.user.uid
      }
      if (state.parentid === undefined) {
        state.parentid = null
      }
      if (foldersid === undefined) {
        // Path = [];
        Path.push("Root")
      }
      if (foldersid) {
        Path.push(...folders.path, foldersid)
      }
      if (count === 0) {
        const uploaddata = await uploadEntireFolder(state);
        arr.push({ name: state.foldername, id: uploaddata.id });
      }
      if (count > 0) {
        if (Delta === undefined) {
          console.log(7878);

          foldersid = folderid;
        }else{
          
          console.log(Delta);  
          gamma = (arr.findIndex(function (item: any) {
            return item.name.indexOf(Delta) !== -1;
          }));
          state.parentid = arr[gamma].id;
        
          const uploaddata = await uploadEntireFolder(state)
          arr.push({ name: state.foldername, id: uploaddata.id});
    
          
          console.log(state);  
        }        
      }
      
      
      count++;
    }
    catch (error) {
      if (error instanceof(FirebaseError)) {
        navigate('/error');
        }
      }
    }
    // console.log("arr",arr);
    
    
    const len =e.target.files
  
    const filesPath:any = [];
    for (let i = 0; i < len.length; i++) {
      const element = len[i];
      const address = element.webkitRelativePath.split('/')
      const valueofpath:string = address[address.length-2];
      const to_store = ((arr.findIndex(function (item: any) {
        return item.name.indexOf(valueofpath) !== -1
      })));
      
      filesPath.push(...Path,arr[to_store].id);
      console.log(filesPath);
      
    await uploadfiles(arr[to_store].id,element,removeDuplicates(filesPath));
    
   }
   handleloading(false);
   handlereload(true);
  }
  



  const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const dir = [] as any
    let uniq = [] as any;
    let d;
    for (let index = 0; index < files!.length; index++) {
      const element = files![index].webkitRelativePath;
     const directory = element.match(/^(.+)\/([^\/]+)$/);
       d = directory?.[1].split("/");
      dir.push(d);
    }
    uniq = removeDuplicates(dir)
    const alpha = new Map()
    for (const i of uniq) {

      for (const j of i) {
        alpha.set(i, j);
      }
    }

    handleloading(true)
    await upload(e, alpha, folderid)
  }

  return (
    <>
      {

        <label className="relative cursor-pointer overflow-hidden text-3xl border-2  shadow hover:shadow-2xl border-blue-600 p-1">


          <AiFillFolderAdd />
          <input type="file" className="absolute left-[-9999px]" onChange={handlechange} webkitdirectory='' multiple directory="" />
        </label>
      }
    </>
  )
}

export default UploadFolders