import { useCallback, useContext, useEffect, useState } from "react"
import { Authprovider } from "../context/Authcontext"
import { useNavigate, useParams } from "react-router-dom";
import Model from "../components/Model"
import { DocumentData, Timestamp } from "firebase/firestore";
import Folders from "../components/Folders";
import Files from "../components/Files";
import { AiFillFolderAdd } from "react-icons/ai";
import Uploadfiles from "../components/Uploadfiles";
import folders from "../types/folder";
import obj from "../types/obj";
import { addData } from "../queries/adddoc";
import { getData } from "../queries/getdocs";
import { getsingledoc } from "../queries/getdoc";
// import { ScaleLoader } from "react-spinners";
import { FirebaseError } from "firebase/app";
import { getFiles } from "../queries/getfiles";
import UploadFolders from "../components/UploadFolders";
const Dashboard = () => {
  const { folderid } = useParams()
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  const [loading, setloading] = useState<boolean>(false)
  const [reload, setreload] = useState<boolean>(false)
  const [folders, setfolders] = useState<Array<folders | DocumentData>>([])
  const [files, setfiles] = useState<Array<folders | DocumentData>>([])
  const [destroy,setdestroy] = useState<boolean>(false);
  const [currentfolder, setcurrentfolder] = useState<folders | DocumentData>({})
  const handleclick = async (input: string, currentfolder: obj) => {
    const Path:string[] = [];
    console.log(currentfolder);

    // console.log(Path);
    setloading(true)
    const state: obj = {
      foldername: input,
      parentid: folderid,
      path: Path,
      folder:true,
      Createdat:Timestamp.now(),
      createdby: auth.user.uid,
      
    }
    if (state.parentid === undefined) {
      state.parentid = null
    }
    try {
      if (folderid === undefined) {
        // Path = [];
        Path.push("Root")
      }
      if (folderid) {
        Path.push(...currentfolder.path, folderid)
      }
      const data = await addData(state)
      console.log(data.id);
      // console.log(loading);
      
      setreload(true);
      
    } catch (error) {
      if (error instanceof (FirebaseError)) {
        console.log(error);
        
        navigate("/error")
      }
    }
    setloading(false)
  }
  // console.log(loading);
  // console.log(reload);
  const forcereload = (reload: boolean) => {
    setreload(reload)
  }
  const forceloading = (loading: boolean) => {
    setloading(loading)
  }
  //  TODO:handle loading and reload states 
  
  useEffect(() => {
    console.log("running");
    
    setfolders([]);
    const Data = async () => {
      
      const Data:any = await getData(folderid, auth.user.uid);
      Data?.forEach((d: any) => {
        setfolders(prev => [...prev, { ...d.data(), id: d.id }])
        
      })
      // console.log(6868);
    }
    setloading(false);
    // setreload(false)
    if(reload===true){
      Data();
    }
  setreload(false)
   

  }, [reload,auth.user.uid])
  
  useEffect(() => {
    console.log("running");
    
    setfolders([]);
    const Data = async () => {
      
      const Data:any = await getData(folderid, auth.user.uid);
      Data?.forEach((d: any) => {
        setfolders(prev => [...prev, { ...d.data(), id: d.id }])
        
      })
     
    }
     setloading(false);

      Data();
 
   

  }, [folderid])
  
  useEffect(() => {
    setfiles([]);
    const Files = async () => {
      const Filedata = await getFiles(folderid, auth.user.uid);
      Filedata?.forEach((d: any) => {
        setfiles(prev => [...prev, { ...d.data(), id: d.id }])
        
      })
    }
    
    setloading(false);
    
   
    if(reload===true){
    Files();
    }
  setreload(false)
   
  }, [reload,auth.user.uid])
  useEffect(() => {
    setfiles([]);
    const Files = async () => {
      const Filedata = await getFiles(folderid, auth.user.uid);
      Filedata?.forEach((d: any) => {
        setfiles(prev => [...prev, { ...d.data(), id: d.id }])
        
      })
    }
    
    setloading(false);
    
   
   
    Files();

   
  }, [folderid])
  
  const call = useCallback(()=>{
    const getSingleDocs = async () => {
  
      if (folderid === undefined) {
        return
      }
  
      const current = await getsingledoc(folderid);
      const currentfolder = { ...current.data(), id: current.id }
      setcurrentfolder(currentfolder)
  
    }
    getSingleDocs();
  },[folderid])


  // useEffect(() => {
  //   getSingleDocs();
  // }, [folderid])
  useEffect(() => {
    call();
  }, [folders,call])

  const forcedDestory=(kill:boolean|undefined)=>{
    if(kill === undefined) return
    setdestroy(kill);
  }
const Destroy =()=>{
  
  // console.log(destroy);
  forcedDestory(false);

}
console.log(loading);

  return (

    <>
      {
        loading ?
          <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden">
            {/* <ScaleLoader color="#000" /> */}
            <progress className="progress w-56"></progress>
          </div>
          :
          <>
            <nav className="flex justify-around items-center my-5">
              <div className="font-Abel text-3xl">Dashboard</div>
              <h3 className="font-Abel text-2xl">{auth.user.email}</h3>
              <div className="wrapper flex gap-2">
                <div className="image w-10 h-10 rounded-full"><img src={auth.user.photoURL} alt={"profile"} className="w-full h-full object-cover rounded-full" /></div>
                <button className="logout underline font-Abel" onClick={() => {
                  auth.logout().then((res: null) => {
                    console.log(res)
                  }); navigate('/')
                }} >LOGOUT</button>
              </div>
            </nav>
            <main onClick={Destroy} className="cursor-pointer h-[100vh]">
              <nav className="foldernav w-[70%] mx-auto flex items-center gap-4">
                <Model btnText={<AiFillFolderAdd />} okBtn="save" closeBtn="cancel" modelText="create folder" onsave={handleclick} folder={currentfolder} />
                <Uploadfiles folders={currentfolder} handlereload={forcereload} handleloading={forceloading} />
                <UploadFolders folders={currentfolder} handlereload={forcereload} handleloading={forceloading} />
              </nav>
              <div className="w-[70%] mx-auto flex flex-col gap-5">

                <div className="folders ">
                  <div className="flex gap-3">

                  <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">{folderid === undefined ? "ROOT" : currentfolder.foldername}</h3>
                  <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">Folders: {folders.length}</h3>
                  <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">Files: {files.length}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                  <Folders folder={folders} des={destroy} clic = {forcedDestory} Reload = {forcereload} Loading={forceloading}/>

                  </div>
                </div>
                {((folders.length > 0 || files.length > 0) || (folders.length > 0 && files.length > 0)) &&
                  <div className="line h-1 w-full bg-black rounded-sm "></div>
                }
                <div className="files grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">

                  <Files files={files}  des={destroy} clic = {forcedDestory} Reload = {forcereload} Loading={forceloading}/>
                </div>
               
              </div>

            </main >
          </>
      }
    </>
  )
}

export default Dashboard