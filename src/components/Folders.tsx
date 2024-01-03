import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import folders from "../types/folder";
import Dropdown from "./Dropdown";
import files from "../types/file";

import { CiFolderOn } from "react-icons/ci";
import { AiOutlineEllipsis } from "react-icons/ai";
import { dropdowntype } from "../types/dropdowntype";

const Folders = ({
  folder,
  handleClick,
  dropdown,
  Reload,
  Loading,
}: {
  folder: Array<folders | DocumentData>;
  handleClick: (e: any, f: DocumentData | files) => void;
  dropdown: dropdowntype;
  Reload: (reload: boolean) => void;
  Loading: (loading: boolean) => void;
}) => {
  return (
    <>
      {folder.map((f, i) => {
        return (
          <div key={i} className="relative bg-secondary p-2 rounded-xl">
            <button
              className=" absolute right-2 cursor-pointer bottom-0 bg-transparent top-0"
              onClick={(e) => {
                handleClick(e, f);
              }}
            >
              <AiOutlineEllipsis className="h-8 w-8 rotate-90 hover:bg-white py-1 rounded-full" />
            </button>
            {dropdown.state && (
              <Dropdown
                file={f}
                handlereload={Reload}
                handleloading={Loading}
                id={dropdown.id}
              />
            )}
            <Link
              to={`/folders/${f.id}`}
              key={f.id}
              className="bg-transparent flex items-center gap-2"
            >
              <CiFolderOn className="text-2xl" />
              <button className="w-[7rem] overflow-hidden">
                <span className="line-clamp-1 bg-transparent uppercase">
                  {f.foldername}
                </span>
              </button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Folders;
