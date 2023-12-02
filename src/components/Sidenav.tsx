import React, { useEffect, useState } from "react";
import {
  AiFillFolderAdd,
  AiOutlineFolderAdd,
  AiOutlinePlus,
} from "react-icons/ai";
import Model from "./Model";
import Uploadfiles from "./Uploadfiles";
// import UploadFolders from "./UploadFolders";

import Docs from "../assets/images (1).png";
import sheets from "../assets/unnamed.png";
import slides from "../assets/images.png";
import forms from "../assets/google-forms.webp";
import { getData } from "../queries/getdocs";
import { get_all_folders_created_by_a_user } from "../queries/get_all_folders_created_by_a_user";
import Nav from "./Nav";
import UploadFolder from "./UploadFolder";
import { RiArrowDropRightFill } from "react-icons/ri";

const Sidenav = (props: any) => {
  const [navfolders, setnavfolders] = useState<any>();
  const [Folders, setFolders] = useState<any>({
    name: "My Drive",
    id: null,
    children: [],
  });
  // const t = props.truncate("sidenav", 4);
  // console.log(t);

  const getAllfolderwithin = async (fid: any) => {
    const subfolders = await getData(fid, props.auth.user.uid);
    const newfolder: any = [];
    subfolders?.forEach(async (folder: any) => {
      // console.log(folder.data().foldername);
      newfolder.push({
        name: folder.data().foldername,
        id: folder.id,
        children: await getAllfolderwithin(folder.id),
      });
    });
    return newfolder;
  };
  const Showmydrive = async () => {
    const Allfolders = await get_all_folders_created_by_a_user(
      props.auth.user.uid
    );

    Allfolders?.forEach(async (folder: any) => {
      console.log(folder.data().foldername);
      const ch = await getAllfolderwithin(folder.id);
      // console.log(ch);
      const folders = {
        name: folder.data().foldername,
        id: folder.id,
        children: ch,
      };
      setFolders((prev: any) => ({
        ...prev,
        children: [
          ...prev.children,
          {
            ...folders,
          },
        ],
      }));
    });
  };

  useEffect(() => {
    Showmydrive();
    setFolders((prev: any) => ({
      name: "Mydrive",
      id: null,
      children: [],
    }));
  }, []);
  console.log(Folders);

  return (
    <nav className=" text-3xl side-nav  flex flex-col ml-10 gap-2 px-2 relative w-56 border-2 border-black visiblescrollbar resize-x ">
      <div className="Create_wrapper relative w-full flex z-50">
        <button
          className="flex gap-3 bg-white px-4 py-4 rounded-2xl  max-w-[20rem]  text-black justify-center items-center shadow-sm shadow-black"
          onClick={props.handlecreatefilesdropdown}
        >
          <AiOutlinePlus className="text-2xl font" />
          <span className="text-lg">New</span>
        </button>
        <div
          className={`border-2 border-black absolute top-[0px] p-2 w-96 ${
            props.Handlecreatefilesdropdown
              ? "opacity-1 scale-100"
              : "opacity-0 scale-0"
          } transition-all `}
        >
          <Model
            btnText={
              <>
                <div className="button flex w-full gap-5 px-2 items-center text-2xl border-b-2 border-black">
                  <AiOutlineFolderAdd />
                  <span className="text-sm font-bold">Create Folder</span>
                </div>
              </>
            }
            okBtn="save"
            closeBtn="cancel"
            modelText="create folder"
            onsave={props.handleclick}
            folder={props.currentfolder}
          />
          <div className="upload_wrapper border-b-2 border-black w-full">
            <Uploadfiles
              folders={props.currentfolder}
              handlereload={props.forcereload}
              handleloading={props.forceloading}
            />
            {/* <UploadFolders
              folders={props.currentfolder}
              handlereload={props.forcereload}
              handleloading={props.forceloading}
            /> */}
            <UploadFolder
              folders={props.currentfolder}
              handlereload={props.forcereload}
              handleloading={props.forceloading}
            />
          </div>
          <div className="showfiles">
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between">
                <div className="flex items-center gap-5">
                  <img src={Docs} alt="" className="w-7" />
                  <span className="text-base font-bold">Google Docs</span>
                </div>
                <RiArrowDropRightFill />
              </li>
              <li className="flex gap-5 justify-between">
                <div className="flex items-center gap-5">
                  <img src={sheets} alt="" className="w-7" />
                  <span className="text-base font-bold">Google Sheets</span>
                </div>
                <RiArrowDropRightFill />
              </li>
              <li className="flex gap-5 pl-1 justify-between">
                <div className="flex items-center gap-5">
                  <img src={slides} alt="" className="w-5" />
                  <span className="text-base font-bold pl-1">
                    Google Slides
                  </span>
                </div>
                <RiArrowDropRightFill />
              </li>
              <li className="flex gap-5 pl-1 justify-between">
                <div className="flex items-center gap-5">
                  <img src={forms} alt="" className="w-5" />
                  <span className="text-base font-bold pl-1">Google Forms</span>
                </div>
                <RiArrowDropRightFill />
              </li>
            </ul>
            <div className="more flex justify-between items-center pt-2">
              <span className="text-base font-bold pl-3 ">More</span>
              <RiArrowDropRightFill />
            </div>
          </div>
        </div>
      </div>

      <div className="showwrapper">
        <div className="folder">
          <Nav
            Folders={Folders}
            Showmydrive={Showmydrive}
            truncate={props.truncate}
          />
        </div>
      </div>
    </nav>
  );
};

export default Sidenav;
