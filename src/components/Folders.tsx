import { DocumentData} from "firebase/firestore"
import { Link } from "react-router-dom"

import folders from "../types/folder"
// import { updatepath } from "../queries/updatepath"


const Folders = ({folder,handleclick}:{folder:Array<folders|DocumentData>,handleclick?:(value?:any)=>any}) => {
  
  return (
    <>
    {
      folder.map((f)=>{
        
        const handleupdatepath = ()=>{
          handleclick!==undefined&&handleclick(f.id);
          
        }
        
        
        return(
          
          <Link to={`/folders/${f.id}`} key={f.id}>
          <button  className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer  font-Abel uppercase" onClick={handleupdatepath}>{f.foldername}</button>
        </Link>
        
        
        )
     })} 
      </>
  )
}

export default Folders