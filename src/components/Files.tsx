import { DocumentData } from "firebase/firestore"
// import { Link } from "react-router-dom"

import files from "../types/file"
// import { updatepath } from "../queries/updatepath"


const Files = ({ files }: { files: Array<files | DocumentData>, handleclick?: (value: any, value1?: any) => any }) => {
const truncate =(value:string,nu:number)=>{
          if(value===undefined){
            return
          }
         return value.slice(0,nu)+"...."
}
  return (

    <>
      {
        files.map((f,i) => {

          // const handleupdatepath = ()=>{
          //   handleclick!==undefined&&handleclick(f.id,f.parentid);

          // }


          return (
            <div key={i}  className="">
              <a href={f.url} download={true}>
                <button className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer  font-Abel uppercase w-full" >{truncate(f.filename,20)}</button>
              </a>
              {/* <iframe src={f.url}>

            </iframe> */}

            </div>

          )
        })}
    </>
  )
}

export default Files