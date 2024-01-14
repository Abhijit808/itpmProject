import { useState, useRef } from "react";
import { RiArrowDropRightFill } from "react-icons/ri";
import drive from "../assets/Mediamodifier-Design.svg";
import { AiFillFolder } from "react-icons/ai";
const Nav = (props: any) => {
  const [expand, setExpand] = useState(true);
  const widthRef = useRef<HTMLDivElement>(null);
  const handleclick = () => {
    console.log(widthRef.current?.clientWidth);
    console.log(widthRef.current?.scrollWidth);

    setExpand(!expand);
  };

  return (
    <div className="overflow-x-hidden group">
      <div className=" rounded-full w-full  p-0 " ref={widthRef}>
        {props.Folders?.name === "Mydrive" ? (
          <div className="flex items-center gap-1   rounded-full hover:bg-secondary ">
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent`}
            />
            <img
              src={drive}
              alt=""
              className="w-4 rounded-full  bg-transparent"
            />
            <span className="text-base font-medium  bg-transparent">
              {" "}
              {"My Drive"}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full group hover:bg-secondary">
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent `}
            />
            <AiFillFolder className="w-5 rounded-full" />
            <span
              className={`text-base font-medium  line-clamp-1  bg-transparent`}
            >
              {props.Folders?.name}
            </span>
          </div>
        )}
      </div>

      <div className={`${expand ? "hidden" : "flex flex-col ml-2"} `}>
        {props.Folders?.children?.map((child: any) => {
          return <Nav key={child.id} Folders={child} />;
        })}
      </div>
    </div>
  );
};

export default Nav;
