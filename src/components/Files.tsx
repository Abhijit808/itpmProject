import { DocumentData } from "firebase/firestore";
// import { Link } from "react-router-dom"

import files from "../types/file";
import { MouseEvent, useState } from "react";
import Dropdown from "./Dropdown";
interface dropdowntype {
  id: string;
  state: boolean;
}
const Files = ({
  files,
  des,
  clic,
  Reload,
  Loading,
}: {
  files: Array<files | DocumentData>;
  des: boolean;
  clic: (dp?: boolean) => void;
  Reload: (reload: boolean) => void;
  Loading: (loading: boolean) => void;
}) => {
  const [dropdown, setdropdown] = useState<dropdowntype>({
    id: "",
    state: false,
  });

  const truncate = (value: string, nu: number) => {
    if (value === undefined) {
      return;
    }
    return value.slice(0, nu) + "....";
  };

  const handleclick = (
    e: MouseEvent<HTMLDivElement>,
    f: files | DocumentData
  ) => {
    // console.log(des);
    e.stopPropagation();
    console.log("dropdown.state " + dropdown.state);
    console.log("des " + des);
    if (dropdown.state === false) {
      setdropdown({ id: f.id, state: (dropdown.state = true) });
      clic === undefined ? null : clic(true);
      console.log("if");
    } else {
      console.log("else");

      setdropdown({ id: f.id, state: (dropdown.state = false) });
      clic === undefined ? null : clic(false);
    }
  };

  return (
    <>
      {files.map((f, i) => {
        return (
          <div key={i} className="relative div ">
            <div
              className="dropdown absolute flex flex-col gap-[2px] -right-[.5rem] bottom-2 bg-blue-700 p-3   cursor-pointer"
              onClick={(e) => {
                handleclick(e, f);
              }}
            >
              <div className="h-[5px] w-[5px] rounded-full bg-black"></div>
              <div className="h-[5px] w-[5px] rounded-full bg-black"></div>
              <div className="h-[5px] w-[5px] rounded-full bg-black"></div>
            </div>
            {des
              ? dropdown.state &&
                (f.id === dropdown.id ? (
                  <div className="relative">
                    <Dropdown file={f}  handlereload = {Reload} handleloading = {Loading}/>
                  </div>
                ) : null)
              : null}
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
