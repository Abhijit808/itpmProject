import { DocumentData } from "firebase/firestore";
import files from "../types/file";
interface dropdowntype{
  id:string,
  state:boolean
}
const Dropdown = ({file,showdropdown}:{file:files|DocumentData,showdropdown:dropdowntype}) => {
    console.log(file);
    
  return (    
      <div className="absolute -right-16 -bottom-20 bg-black text-white py-2 px-4 z-10">

        <li className="val capitalize list-none  hover:bg-white hover:text-black cursor-pointer transition-all px-3 py-1">Delete</li>
        <li className="val capitalize list-none  hover:bg-white hover:text-black cursor-pointer transition-all px-3 py-1">Delete</li>
        <li className="val capitalize list-none  hover:bg-white hover:text-black cursor-pointer transition-all px-3 py-1">Delete</li>
      </div>
  )
}

export default Dropdown