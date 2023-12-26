import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

import folders from "../types/folder";
import Dropdown from "./Dropdown";
import files from "../types/file";
import { MouseEvent, useState } from "react";
import { CiFolderOn } from "react-icons/ci";
// import { updatepath } from "../queries/updatepath"
interface dropdowntype {
  id: string;
  state: boolean;
}

const Folders = ({
  folder,
  des,
  clic,
  Reload,
  Loading,
}: {
  folder: Array<folders | DocumentData>;
  handleclick?: (value: any, value1?: any) => any;
  des: boolean;
  clic: (dp?: boolean) => void;
  Reload: (reload: boolean) => void;
  Loading: (loading: boolean) => void;
}) => {
  const [dropdown, setdropdown] = useState<dropdowntype>({
    id: "",
    state: false,
  });

  const truncate = (value: string, nu: number, len: number) => {
    if (value === undefined || len < nu) {
      return value;
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
      // console.log("else");

      setdropdown({ id: f.id, state: (dropdown.state = false) });
      clic === undefined ? null : clic(false);
    }
  };
  return (
    <>
      {folder.map((f, i) => {
        // const handleupdatepath = ()=>{
        //   handleclick!==undefined&&handleclick(f.id,f.parentid);

        // }

        return (
          <div key={i} className="relative div ">
            <div
              className="dropdown absolute flex flex-col gap-[2px] -right-[0rem] bottom-0 top-0 justify-center bg-blue-700 p-3   cursor-pointer"
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
                    <Dropdown
                      file={f}
                      handlereload={Reload}
                      handleloading={Loading}
                    />
                  </div>
                ) : null)
              : null}
            <div className="flex w-full items-center border-2 border-blue-700 px-4 py-2 ">
              <CiFolderOn className="w-10 h-10" />
              <Link to={`/folders/${f.id}`} key={f.id} className="w-full">
                <button className=" m-2 cursor-pointer  font-Abel uppercase w-full">
                  {truncate(f.foldername, 30, 20)}
                </button>
              </Link>
            </div>
            {/* <iframe src={f.url}>

            </iframe> */}

            {/* <Link to={`/folders/${f.id}`} key={f.id}>
          <button  className="border-2 border-blue-700 px-4 py-2 m-2 cursor-pointer  font-Abel uppercase" >{f.foldername}</button>
        </Link> */}
          </div>
        );
      })}
    </>
  );
};

export default Folders;
