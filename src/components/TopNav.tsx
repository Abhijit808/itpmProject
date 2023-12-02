import { BiSearch } from "react-icons/bi";
import { GrApps } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import react from "react";
import { GoQuestion } from "react-icons/go";
import { MdOutlineOfflinePin } from "react-icons/md";
import Filter from "../assets/Filter.svg";
const TopNav = (props: {
  logo: any;
  handleLogoutDropdown: react.MouseEventHandler<HTMLButtonElement>;
  HandleLogoutDropdown: boolean;
  Photo: string;
  logOut: any;
}) => {
  const navigate = useNavigate();
  return (
    <header className="grid grid-cols-2 md:grid-cols-3 justify-around items-center my-5 gap-10 ">
      <div className="logo flex items-center gap-2 ml-10">
        <img src={props.logo} alt="here" />
        <span className="text-2xl">Drive</span>
      </div>

      <div className=" flex  items-center relative gap-2 ">
        <div className="search absolute left-2 bg-transparent cursor-pointer">
          <BiSearch className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered  input-warning w-full max-w-3xl rounded-full pl-12 bg-primary text-black"
        />
        <div className=" absolute bg-transparent right-2 text-transparent  cursor-pointer">
          <img
            src={Filter}
            alt="icon"
            className="h-10 hover:bg-[#DFE4ED] w-10 p-2 rounded-full bg-transparent"
          />
        </div>
      </div>
      <div className="wrapper flex  relative justify-end mr-6 items-center">
        <MdOutlineOfflinePin className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
        <GoQuestion className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
        <IoSettingsOutline className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
        <GrApps className="h-10 hover:bg-secondary w-10 p-2 bg-transparent mr-2" />
        <button
          className="button w-10 h-10 rounded-full"
          onClick={props.handleLogoutDropdown}
        >
          <img
            src={props.Photo}
            alt={"profile"}
            className="w-full h-full object-cover rounded-full"
          />
        </button>
        {props.HandleLogoutDropdown && (
          <div className="absolute  bg-blue-500 p-5  left-0 top-10 right-10 z-10  flex flex-col">
            <div className="header text-center">
              <p>{props.logOut.user.email}</p>
            </div>
            <div className="profile ">
              <img
                src={props.Photo}
                alt={"profile"}
                className=" object-cover rounded-full"
              />
            </div>
            <button
              className="logout underline font-Abel"
              onClick={() => {
                props.logOut.logout().then((res: null) => {
                  console.log(res);
                });
                navigate("/");
              }}
            >
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
