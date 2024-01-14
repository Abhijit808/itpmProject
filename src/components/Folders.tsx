import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import folders from "../types/folder";
import Dropdown from "./Dropdown";
import files from "../types/file";

import { CiFolderOn } from "react-icons/ci";
import { AiOutlineEllipsis } from "react-icons/ai";
import { dropdowntype } from "../types/dropdowntype";
import { RefObject, useRef } from "react";

const Folders = ({
  folder,
  handleClick,
  dropdown,
  Reload,
  Loading,
  list,
  files,
  parentref,
  dropdownPosition,
}: {
  folder: Array<folders | DocumentData>;
  handleClick: (e: any, f: DocumentData | files) => void;
  dropdown: dropdowntype;
  Reload: (reload: boolean) => void;
  Loading: (loading: boolean) => void;
  list: boolean;
  dropdownPosition: boolean;
  files: (DocumentData | files)[];
  parentref: RefObject<HTMLDivElement>;
}) => {
  const dropdownref = useRef<HTMLButtonElement>(null);

  useRef;
  return (
    <>
      {!list ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
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
        </div>
      ) : (
        <div className="list overflow-scroll scroll overflow-x-hidden h-[100vh]">
          <ul className="grid grid-cols-folders border-b-2 border-secondary pb-4 mb-3">
            <li>
              <span className="">Name</span>
            </li>
            <li>
              <span className="flex justify-center">Owner</span>
            </li>
            <li>
              <span className="flex justify-center">Size</span>
            </li>
            <li>
              <span className=" flex justify-center">
                {" "}
                <AiOutlineEllipsis className="h-5 w-5 rotate-90 hover:bg-white  rounded-full" />
              </span>
            </li>
          </ul>
          <div className="name " ref={parentref}>
            <ul className="flex flex-col gap-2  ">
              {folder.map((folder, i) => {
                return (
                  <li
                    key={i}
                    className="w-full p-2 border-y-2 border-secondary pl-2 grid grid-cols-folders"
                  >
                    <div className="line-clamp-1 flex gap-1 ">
                      <CiFolderOn className="text-2xl" />
                      <span>{folder.foldername}</span>
                    </div>
                    <span className=" flex justify-center">me</span>
                    <span className=" flex justify-center">--</span>
                    <span
                      className=" flex justify-center relative"
                      onClick={(e) => {
                        handleClick(e, folder);
                      }}
                    >
                      {" "}
                      <AiOutlineEllipsis className="h-5 w-5 rotate-90 hover:bg-white  rounded-full" />
                      <div
                        className={`absolute -left-40 ${
                          dropdownPosition ? "top-0" : "-bottom-0"
                        } right-20`}
                      >
                        {dropdown.state && (
                          <Dropdown
                            file={folder}
                            handlereload={Reload}
                            handleloading={Loading}
                            id={dropdown.id}
                          />
                        )}
                      </div>
                    </span>
                  </li>
                );
              })}
              {files.map((file, i) => {
                return (
                  <li
                    key={i}
                    className="w-full p-2  pl-2 grid grid-cols-folders border-y-2 border-secondary"
                  >
                    <span className="line-clamp-1   pl-2 ">
                      {file.filename}
                    </span>
                    <span className=" flex justify-center">me</span>
                    <span className=" flex justify-center">--</span>
                    <span
                      className=" flex justify-center relative"
                      onClick={(e) => {
                        handleClick(e, file);
                      }}
                    >
                      {dropdownPosition}
                      <AiOutlineEllipsis className="h-5 w-5 rotate-90 hover:bg-white  rounded-full " />
                      <button
                        className={`absolute -left-44 ${
                          dropdownPosition ? "-top-36" : "-bottom-0"
                        } right-24`}
                        ref={dropdownref}
                      >
                        {dropdown.state && (
                          <Dropdown
                            file={file}
                            handlereload={Reload}
                            handleloading={Loading}
                            id={dropdown.id}
                          />
                        )}
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Folders;
