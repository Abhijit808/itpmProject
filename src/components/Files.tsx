import { DocumentData } from "firebase/firestore";
// import { Link } from "react-router-dom"

import files from "../types/file";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
// import { MouseEvent, MouseEventHandler } from "react"
// import { updatepath } from "../queries/updatepath"
interface dropdowntype {
  id: string;
  state: boolean;
}
const Files = ({
  files,
}: {
  files: Array<files | DocumentData>;
  handleclick?: (value: any, value1?: any) => any;
}) => {
  const [dropdown, setdropdown] = useState<dropdowntype>({
    id: "",
    state: false,
  });
  const clickref = useRef(null);
  const truncate = (value: string, nu: number) => {
    if (value === undefined) {
      return;
    }
    return value.slice(0, nu) + "....";
  };

  // const handleclick = (f: files | DocumentData) => {
  //   setdropdown({ id: f.id, state: dropdown.state === false });
  // };

  return (
    <>
      {
      files.map((f, i) => {

        return (
          <div
            key={i}
            className="relative divblah"
          
          >
            {/* <div className="dropdown absolute flex flex-col gap-1 right-0 bottom-3 bg-blue-700 p-3">
              <div className="h-2 w-2 rounded-full bg-black"></div>
              <div className="h-2 w-2 rounded-full bg-black"></div>
              <div className="h-2 w-2 rounded-full bg-black"></div>
            </div>
            {
            dropdown.state && f.id === dropdown.id ? (
              <div>
                <Dropdown file={f} showdropdown={dropdown} />
              </div>
            ) : null} */}
            <a href={f.url} download={true}>
            <button className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer  font-Abel uppercase w-full">
              {truncate(f.filename, 20)}
            </button>
            </a>
            {/* <iframe src={f.url}>

            </iframe> */}
          </div>
        );
      })}
    </>
  );
};

export default Files;
