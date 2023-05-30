import { DocumentData} from "firebase/firestore"
import { Link } from "react-router-dom"

import folders from "../types/folder"
import { updatepath } from "../queries/updatepath"


const Folders = ({folder}:{folder:Array<folders|DocumentData>}) => {
  
  
  return (
    <>
    {
      folder.map((f)=>{
        
        const updatePath = async()=>{
          
          const updatedpath  = await updatepath(f)
          console.log(updatedpath);
                    
        }
        
        return(
          <>
          <Link to={`/folders/${f.id}`} key={f.id}>
          <button  className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer rounded-md font-Abel uppercase" onClick={updatePath}>{f.foldername}</button>
        </Link>
        </>
        
        )
     })} 
      </>
  )
}

export default Folders