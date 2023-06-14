import { DocumentData } from "firebase/firestore"
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
    if (files)
      for (let i = 0; i < files.length; ++i) {
        const file = files[i]; if (file === undefined) return;
        f.Store(auth.user.uid, files[i], path, folder);
        // handleloading(false);
        // handlereload(true);
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
  const upload = async (e: any, d: any, foldersid: any,directory:any) => {
    console.log(d);
    const arr: any = []
    //  const Path = new Set()
    const Path = [] as any
    let count = 0;
    let beta, gamma;
    let Delta: any;
    // const temp:any;
    for (const [k, v, i = 0] of d) {
      // console.log(i);
      try {
        
       
     
      if (count > 0) {
        beta = (k.findIndex(function (item: any) {
          return item.indexOf(v) !== -1;
        }));
        Delta = k[beta - 1];
        // console.log(Delta);
       
      }

     


      const state: obj = {

        foldername: v,
        parentid: foldersid,
        path: removeDuplicates(Path),
        childfolders: [""],
        childfiles: [""],
        Createdat: Date.now().toString(),
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
          console.log(arr[gamma].id);
          console.log(foldersid === arr[gamma].id);
          const uploaddata = await uploadEntireFolder(state)
          arr.push({ name: state.foldername, id: uploaddata.id});
          // if(k)
          console.log("dir"+k +" "+ directory);
          
          // await uploadfiles(foldersid,e.target.files,removeDuplicates(Path))
        
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

    // handleloading(true)
    upload(e, alpha, folderid,d)
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