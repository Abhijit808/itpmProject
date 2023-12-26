// import React from 'react'
import { RiArrowDropRightFill } from "react-icons/ri";
import UploadFolder from "./UploadFolder";
import Docs from "../assets/images (1).png";
import sheets from "../assets/unnamed.png";
import slides from "../assets/images.png";
import forms from "../assets/google-forms.webp";
import { AiOutlineFolderAdd, AiOutlinePlus } from "react-icons/ai";
import Model from "./Model";
import Uploadfiles from "./Uploadfiles";
import { folderOperationModelprops } from "../types/folderOperationModelProps";
const FolderOperationModel = (props: folderOperationModelprops) => {
  return (
    <div className="Create_wrapper relative w-full flex z-50">
      <button
        className="flex gap-2 bg-white px-4 py-4 rounded-2xl  max-w-[20rem]  text-black justify-center items-center shadow-sm shadow-black"
        onClick={props.handlecreatefilesdropdown}
      >
        <AiOutlinePlus className="text-2xl font" />
        <span className="text-base">New</span>
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
                <span className="text-base font-bold pl-1">Google Slides</span>
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
  );
};

export default FolderOperationModel;
