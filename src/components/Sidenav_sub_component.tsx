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
      <div className="overflow-x-hidden group">
        <div
          className={`computers  flex items-center rounded-full  w-full group-hover:bg-secondary p-0 gap-1  `}
        >
          {showArrow && (
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent group-hover:bg-secondary`}
            />
          )}
          <div
            className={`infowrapper flex ${
              !showArrow &&
              "px-2 p-[6px] gap-2 rounded-full group-hover:bg-secondary"
            }  `}
          >
            <div className="imagewrapper w-5 h-5 bg-transparent group-hover:bg-secondary">
              {image}
            </div>
            <span className="text-sm font-medium group-hover:bg-secondary">
              {nameOfTheComponent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav_sub_component;
