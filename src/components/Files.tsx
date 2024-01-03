import { DocumentData } from "firebase/firestore";
// import { Link } from "react-router-dom"

import files from "../types/file";
// import { MouseEvent, useState } from "react";
import Dropdown from "./Dropdown";
import { AiOutlineEllipsis } from "react-icons/ai";
interface dropdowntype {
  id?: string;
  state: boolean;
}
const Files = ({
  files,
  handleClick,
  dropdown,
  Reload,
  Loading,
}: {
  files: Array<files | DocumentData>;
  handleClick: (e: any, f: DocumentData | files) => void;
  dropdown: dropdowntype;
  Reload: (reload: boolean) => void;
  Loading: (loading: boolean) => void;
}) => {
  return (
    <>
      {files.map((f, i) => {
        return (
          <div key={i} className="relative div ">
            <button
              className="dropdown absolute flex flex-col gap-[2px] -right-[.5rem] bottom-2 bg-blue-700 p-0   cursor-pointer"
              onClick={(e) => {
                handleClick(e, f);
              }}
            >
              <AiOutlineEllipsis className="rotate-90 bg-white text-white text-2xl" />
            </button>
            {dropdown.state && (
              <div>
                <Dropdown
                  file={f}
                  handlereload={Reload}
                  handleloading={Loading}
                  id={dropdown.id}
                />
              </div>
            )}
            <a href={f.url} download={true} className="w-full">
              <button className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer  font-Abel uppercase w-full">
                <span className="line-clamp-1">{f.filename}</span>
              </button>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Files;
