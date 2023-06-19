// import { DocumentData } from "firebase/firestore"
// import folders from "../types/folder"
// import {   useContext, useRef } from "react"
// import { listAllFilesAndDirs } from "../utils/file";
// import { useParams } from "react-router-dom";
// import { Authprovider } from "../context/Authcontext";

// declare const window: any;
// const UploadFolder = ({folders}:{folders:folders|DocumentData}) => {
//   const folderid = useParams();
//   const auth = useContext(Authprovider)
//     const uploadref = useRef(null); 
 
    
//     const handlechange = async()=>{
//       try {
//         const directoryHandle = await window.showDirectoryPicker()
//         const files = await listAllFilesAndDirs(directoryHandle);
//         // const subDir = await directoryHandle.getDirectoryHandle("src");
//         // const file = await subDir.getFileHandle("main.tsx")
//         // console.log( await file.getFile());
        
//         console.log('files', files);
       
        
//     }catch(e) {
//       if (e instanceof(DOMException)) {
//         console.log(e);
        
//       }
//     }
// }
    
//   return (
//         <div>
//             <div className="input border-2 border-black p-2 cursor-pointer" ref={uploadref} onClick={handlechange}>upload Folder</div>
//         </div>
//   )
// }

// export default UploadFolder
export default function UploadFolder() {
  return (
    <div>UploadFolder</div>
  )
}
