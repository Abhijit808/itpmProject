import { DocumentData } from "firebase/firestore";
// import { Link } from "react-router-dom"

import files from "../types/file";
import { FaFile } from "react-icons/fa";
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
          <div key={i} className="relative div w-full">
            <button
              className="dropdown absolute flex flex-col gap-[2px] md:right-[.2rem] right-3 top-5  p-0 cursor-pointer rounded-full"
              onClick={(e) => {
                handleClick(e, f);
              }}
            >
              <AiOutlineEllipsis className="rotate-90 hover:bg-white text-white text-2xl rounded-full" />
            </button>
            {dropdown.state && (
              <div className="absolute top-14 w-full">
                <Dropdown
                  file={f}
                  handlereload={Reload}
                  handleloading={Loading}
                  id={dropdown.id}
                />
              </div>
            )}
            <a href={f.url} download={true} className="w-full  ">
              <button className=" bg-secondary flex flex-col-reverse items-center gap-5 pt-5 pb-2 rounded-2xl px-5 w-full">
                <div className="flex flex-col-reverse  items-center justify-center w-48 bg-white aspect-square">
                  <FaFile className="w-10 h-10" />
                </div>
                <p className="bg-transparent clamp pr-2 ">{f.filename}</p>
              </button>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Files;
