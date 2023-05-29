import { DocumentData, collection, doc, updateDoc} from "firebase/firestore"
import { Link } from "react-router-dom"
import { store } from "../firebase/firebaseconfgig"
// import { store } from "../firebase/firebaseconfgig"
interface obj {
  foldername: string,
  parentid: string|null|undefined,
  path:string,
  childfolders:[string],
  childfiles:[string],
  Createdat: string,
  createdby: Number
}
interface folders{
  data:obj,
  uid:string
}

const Folders = ({folder}:{folder:Array<folders|DocumentData>}) => {
  // console.log(folder);
  return (
    <>
    {
      folder.map((f,i)=>{
        // console.log(f.data);
        // // collection(store,"folders")
        const updatepath = async()=>{

          const path = await updateDoc(doc(collection(store,`folders`),f.uid),{
            "path":`${f.data.parentid===null?f.uid:`${f.data.parentid}/${f.uid}`}`
          })
          console.log(path);
          
        }
        
        return(
          <>
          <Link to={`/folders/${f.uid}`} key={i} onClick={updatepath} >
          <button  className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer rounded-md font-Abel uppercase" key={i}>{f.data.foldername}</button>
        </Link>
        </>
        
        )
      })}
      </>
  )
}

export default Folders