import { DocumentData} from "firebase/firestore"
// import { Link } from "react-router-dom"

import files from "../types/file"
// import { updatepath } from "../queries/updatepath"


const Files = ({files}:{files:Array<files|DocumentData>,handleclick?:(value:any,value1?:any)=>any}) => {
  console.log(files);
  
  return (
    <>
    {
      files.map((f,i)=>{
        
        // const handleupdatepath = ()=>{
        //   handleclick!==undefined&&handleclick(f.id,f.parentid);
          
        // }
        
        
        return(
          <>
          <a href={f.url} key={i} download={true}>
          <button  className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer  font-Abel uppercase" >{f.id}</button>
          </a>
            {/* <iframe src={f.url}>

            </iframe> */}
        
          </>
        
        )
     })} 
      </>
  )
}

export default Files