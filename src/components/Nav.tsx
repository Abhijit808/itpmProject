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
  // console.log(props.truncate("hee", 1));
  const truncate = (value: string, nu: number) => {
    if (value === undefined) {
      return;
    }
    return value.slice(0, nu) + "...";
  };
  return (
    <div className="overflow-x-hidden">
      <div
        className=" rounded-full border-2 border-black transition-all w-full group p-1 "
        ref={widthRef}
      >
        {props.Folders?.name === "Mydrive" ? (
          <div className="flex items-center gap-1   rounded-full">
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent`}
            />
            <img src={drive} alt="" className="w-4 rounded-full" />
            <span className="text-xl "> {props.Folders?.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full">
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent `}
            />
            <AiFillFolder />
            <span className={`text-xl`}>{props.Folders?.name}</span>
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
