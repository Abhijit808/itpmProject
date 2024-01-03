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
  // const truncate = (value: string, nu: number) => {
  //   if (value === undefined) {
  //     return;
  //   }
  //   return value.slice(0, nu) + "...";
  // };
  return (
    <div className="overflow-x-hidden group">
      <div
        className=" rounded-full w-full  p-0 group-hover:bg-secondary"
        ref={widthRef}
      >
        {props.Folders?.name === "Mydrive" ? (
          <div className="flex items-center gap-1   rounded-full group-hover:bg-secondary">
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent`}
            />
            <img
              src={drive}
              alt=""
              className="w-4 rounded-full group-hover:bg-secondary"
            />
            <span className="text-base font-medium group-hover:bg-secondary">
              {" "}
              {"My Drive"}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full group-hover:bg-secondary">
            <RiArrowDropRightFill
              onClick={handleclick}
              className={`${
                expand ? "rotate-0" : "rotate-90"
              } rounded-full bg-transparent `}
            />
            <AiFillFolder />
            <span
              className={`text-base font-medium group-hover:bg-secondary line-clamp-1`}
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
