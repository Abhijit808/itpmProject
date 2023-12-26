// import React from 'react'

import { RiArrowDropRightFill } from "react-icons/ri";
import { Sidenav_sub_componentProps } from "../types/Sidenav_sub_componentProps";

const Sidenav_sub_component = ({
  handleclick,
  expand,
  image,
  nameOfTheComponent,
  showArrow,
}: Sidenav_sub_componentProps) => {
  return (
    <div>
      <div className="overflow-x-hidden ">
        <div
          className={`computers  flex items-center rounded-full border-2 border-black transition-all w-full group p-0 gap-1  `}
        >
          {showArrow && (
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent`}
            />
          )}
          <div
            className={`infowrapper flex ${
              !showArrow && "px-3 pt-2 gap-2 rounded-full"
            }  `}
          >
            <div className="imagewrapper w-5 h-5 bg-transparent ">{image}</div>
            <span className="text-base font-medium">{nameOfTheComponent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav_sub_component;
