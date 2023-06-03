
import {   useContext,  useEffect,  useState } from "react"
import { Authprovider } from "../context/Authcontext"
import { useNavigate, useParams } from "react-router-dom";
import Model from "../components/Model"
// import { Modelcontext } from "../context/ModelProvider";
import { DocumentData} from "firebase/firestore";
// import {  storage, store } from "../firebase/firebaseconfgig";
import Folders from "../components/Folders";
import { AiFillFolderAdd } from "react-icons/ai";
import Uploadfiles  from "../components/Uploadfiles";
import folders from "../types/folder";
import obj from "../types/obj";
import { addData } from "../queries/adddoc";
import { getData } from "../queries/getdocs";
import { getsingledoc } from "../queries/getdoc";
import { updatepath } from "../queries/updatepath";
// import { ref, uploadBytes } from "firebase/storage";
const Dashboard = () => {
  const { folderid } = useParams()
  // console.log(folderid);
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  const [loading, setloading] = useState<boolean>(false)
  const [reload, setreload] = useState<boolean>(false)
  const [folders, setfolders] = useState<Array<folders | DocumentData>>([])
  const [currentfolder,setcurrentfolder] = useState<folders|DocumentData>({})
  const[path,setpath]  = useState<any>([])

  const handleclick = async (input: string) => {
    setloading(true)
    const state: obj = {
      foldername: input,
      parentid: folderid,
      path: [""],
      childfolders: [""],
      childfiles: [""],
      Createdat: "",
      createdby: auth.user.uid,
    }
    if (state.parentid === undefined) {
      state.parentid = null
    }
   const data =  await addData(state)
   setloading(false)
   console.log(data.id);
   setreload(true);
}

useEffect( ()=>{
  setloading(true);

  setfolders([]);
  const Data = async()=>{

    const Data:any =  await getData(folderid,auth.user.uid);
    Data.forEach((d:any)=>{
      setfolders(prev=>[...prev,{...d.data(),id:d.id}])
      
    })
    setloading(false)
    setreload(false);
  }
  Data();

},[folderid,reload])
const getSingleDocs = async()=>{
  if(folderid === undefined){
    return
  }
  const current = await getsingledoc(folderid);
  const currentfolder = {...current.data(),id:current.id}

    setcurrentfolder(currentfolder)
}

const UpadtePathDb = async(Path:[string])=>{
  setpath([]);
  if(Path.length === Number(0) ) return;
  const response = await updatepath(currentfolder,Path);
  console.log(response);
  
}
const updatePath = (id:any)=>{
  setpath((prev:any)=>[...prev,id]);
  UpadtePathDb(path)
}

useEffect(()=>{
  getSingleDocs();
},[folderid])



return (
  
    <>
      {
        loading ?
          <div>loading....</div>
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
                <Model btnText={<AiFillFolderAdd/>} okBtn="save" closeBtn="cancel" modelText="create folder" onsave={handleclick} />
                <Uploadfiles folders= {currentfolder}/>
              </nav>
              <div className="w-[70%] mx-auto ">
                
              <Folders folder={folders} handleclick={updatePath}/>
              </div>

            </main >
          </>
      }
    </>
  )
}

export default Dashboard