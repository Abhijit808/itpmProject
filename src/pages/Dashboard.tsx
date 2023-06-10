
import {   useContext,  useEffect,  useState } from "react"
import { Authprovider } from "../context/Authcontext"
import { useNavigate, useParams } from "react-router-dom";
import Model from "../components/Model"
// import { Modelcontext } from "../context/ModelProvider";
import { DocumentData} from "firebase/firestore";
// import {  storage, store } from "../firebase/firebaseconfgig";
import Folders from "../components/Folders";
import Files from "../components/Files";
import { AiFillFolderAdd } from "react-icons/ai";
import Uploadfiles  from "../components/Uploadfiles";
import folders from "../types/folder";
import obj from "../types/obj";
import { addData } from "../queries/adddoc";
import { getData } from "../queries/getdocs";
import { getsingledoc } from "../queries/getdoc";
// import { updatepath } from "../queries/updatepath";
import { ScaleLoader } from "react-spinners";
import { FirebaseError } from "firebase/app";
import { getFiles } from "../queries/getfiles";
import UploadFolders from "../components/UploadFolders";
// import UploadFolder from "../components/UploadFolder";
// import { ref, uploadBytes } from "firebase/storage";
const Dashboard = () => {
  const { folderid } = useParams()
  // console.log(folderid);
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  const [loading, setloading] = useState<boolean>(false)
  const [reload, setreload] = useState<boolean>(false)
  const [folders, setfolders] = useState<Array<folders | DocumentData>>([])
  const [files, setfiles] = useState<Array<folders | DocumentData>>([])
  const [currentfolder,setcurrentfolder] = useState<folders|DocumentData>({})
  // const[path,setpath]  = useState<any>([])
  // const [bool,setbool] = useState<boolean>(false);

  const handleclick = async (input: string,currentfolder:any) => {
    let Path:any= [];
    console.log(currentfolder);
    
    // console.log(Path);
    
    setloading(true)
    const state: obj = {
      foldername: input,
      parentid: folderid,
      path: Path,
      childfolders: [""],
      childfiles: [""],
      Createdat: "",
      createdby: auth.user.uid,
    }
    if (state.parentid === undefined) {
      state.parentid = null
    }
    try {
      // if(Object.keys(currentfolder).length === 0 && currentfolder.constructor === Object || currentfolder.parentid === null){
      //   Path = [{name:"Root",id:folderid}];
      // }
      // if(currentfolder.parentid!==undefined||currentfolder.parentid!=null){
      //   Path.push(...currentfolder.path,{name:currentfolder.foldername ,id:currentfolder.id})
      // }
      if(folderid === undefined){
        // Path = [];
        Path.push("Root")
      }
      if(folderid){
        Path.push(...currentfolder.path,folderid)
      }
      const data =  await addData(state)
      setloading(false)
      console.log(data.id);
      setreload(true);
      
    } catch (error) {
      if(error instanceof(FirebaseError)){
        console.log(error);
        
        navigate("/error")
      }
    }
  }
  
  useEffect( ()=>{
    
    setfolders([]);
    const Data = async()=>{
      
      const Data:any =  await getData(folderid,auth.user.uid);
    Data?.forEach((d:any)=>{
      setfolders(prev=>[...prev,{...d.data(),id:d.id}])
      
    })
    console.log(6868);
  }
  setloading(false)
  // setreload(false);
  Data();
  
},[folderid,reload])
useEffect(()=>{
  setloading(true);
  setfiles([]);
  const Files = async()=>{
    const Filedata = await getFiles(folderid,auth.user.uid);
    Filedata?.forEach((d:any)=>{
      setfiles(prev=>[...prev,{...d.data(),id:d.id}])
      
    })
    console.log(9898);
    
  }

  setloading(false)
  // setreload(false);
  Files();
},[folderid])
const getSingleDocs = async()=>{
  if(folderid === undefined){
    return
  }
  const current = await getsingledoc(folderid);
  const currentfolder = {...current.data(),id:current.id}

    setcurrentfolder(currentfolder)
}
 

// const UpadtePathDb = async(Path:[string])=>{
  
//   if(Path.length === Number(0) ) return;
//   const response = await updatepath(currentfolder,Path);
//   // setpath([]);
//   console.log(response);
  
// }
// const updatePath = (id:any,pid:any)=>{
//   // if(id===undefined) return
//   console.log("pid "+pid+"  "+folderid);

//     if(pid === folderid){
//         setpath([]);
//         return;
//     }
  
//     setpath((prev:any)=>[...prev,id]);
//   UpadtePathDb(path)
// }

useEffect(()=>{
  getSingleDocs();
  // updatePath(currentfolder.id);
  // console.log(currentfolder.path);
},[folderid])



return (
  
    <>
      {
        loading ?
          <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden">
            <ScaleLoader color="#000" />
          </div>
          :
          <>
            <nav className="flex justify-around items-center my-5">
              <div className="font-Abel text-3xl">Dashboard</div>
              <h3 className="font-Abel text-2xl">{auth.user.email}</h3>
              <button className="logout underline font-Abel" onClick={() => {
                auth.logout().then((res: any) => {
                  console.log(res)
                }); navigate('/')
              }} >LOGOUT</button>
            </nav>
            <main>
              <nav className="foldernav w-[70%] mx-auto flex items-center gap-4">
                <Model btnText={<AiFillFolderAdd/>} okBtn="save" closeBtn="cancel" modelText="create folder" onsave={handleclick} folder={currentfolder}/>
                <Uploadfiles folders= {currentfolder}/>
                <UploadFolders folders={currentfolder}/>
                {/* <UploadFolder folders = {currentfolder}/> */}
              </nav>
              <div className="w-[70%] mx-auto ">
                <div className="folders">

              <Folders folder={folders} />
                </div>
                <div className="line h-1 w-full bg-black rounded-sm"></div>
                <div className="files">

              <Files files={files}/>
                </div>
              </div>

            </main >
          </>
      }
    </>
  )
}

export default Dashboard