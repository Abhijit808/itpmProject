import { BiLeftArrowAlt, BiSearch } from "react-icons/bi";
import { GrApps } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import react, { useEffect } from "react";
import { GoQuestion } from "react-icons/go";
import { MdOutlineClose, MdOutlineHistory } from "react-icons/md";
import Filter from "../assets/Filter.svg";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Account from "../assets/Account.png";
import Business from "../assets/Business.jpeg";
import news from "../assets/news.jpeg";
import play from "../assets/play.png";
import photos from "../assets/photos.png";
import yt from "../assets/yt.jpeg";
import meet from "../assets/Gmeet.png";
import mail from "../assets/Gmail.png";
import maps from "../assets/Maps.png";
import calender from "../assets/calender.png";
import drive from "../assets/drive.svg";
import google from "../assets/Google.jpeg";
import { getusersearchdetails } from "../queries/getusersearchresults";
import Fetchdetails from "../Hooks/useFetachdetails";

import Moblenav from "./Moblenav";

const TopNav = (props: any) => {
  const navigate = useNavigate();

  Fetchdetails(
    props.searchData,
    props.logOut.user.displayName,
    props.logOut.user.uid
  );
  useEffect(() => {
    const fetch = async () => {
      const data = await getusersearchdetails(props.logOut.user.uid);
      props.setSearchData(data!.data);
      return;
    };
    fetch();
  }, []);

  const handleSearchClick = (
    e: react.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log(props.searchData);
  };

  // const close = () => {
  //   if (appClick) {
  //     setAppClick(false);
  //     return;
  //   }
  //   if (appSettings) {
  //     setAppSettings(false);
  //     return;
  //   }
  //   if (appQuestionMark) {
  //     setAppQuestionMark(false);
  //     return;
  //   }

  //   // setAppSettings(false);
  // };
  return (
    <>
      <header
        className="md:grid grid-cols-2 md:grid-cols-16  hidden "
        onClick={close}
      >
        <div className="logo flex items-center gap-2 ml-10">
          <img src={props.logo} alt="here" />
          <span className="text-2xl">Drive</span>
        </div>
        <BiSearch className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent md:hidden" />
        <div className=" flex  items-center relative gap-3 ">
          <input
            type="text"
            placeholder="Search in Drive"
            ref={props.inputref}
            onFocus={(e) => props.handleAppInput(e)}
            onKeyDown={(e) => props.handlesearchkeyup(e)}
            className={`input hidden md:block w-full max-w-3xl rounded-full pl-12 bg-primary placeholder:text-slate-600 ${
              props.appInput && "shadow-3xl "
            } relative`}
          />
          {props.appInput ? (
            <div className="absolute left-0 right-0  top-12 z-50 ">
              <div>
                <div
                  onClick={() => {
                    props.setAppInput(false);
                  }}
                >
                  <BiLeftArrowAlt className="absolute -top-9 left-2 text-2xl rounded-full bg-transparent cursor-pointer" />
                </div>
                <div
                  className="search absolute -top-11 right-0 bg-transparent cursor-pointer z-10 hidden"
                  onClick={(e) => handleSearchClick(e)}
                >
                  <BiSearch className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent hidden" />
                </div>
              </div>
              <ul className="p-2">
                {props.searchData.map((search: string, i: number) => {
                  return (
                    <div>
                      {i < 3 && (
                        <li
                          className="flex items-center gap-2 mb-2 cursor-pointer"
                          key={i}
                          onClick={(e) => props.handleInputSearchClick(e)}
                        >
                          <MdOutlineHistory />
                          <span className="text-sm">{search}</span>
                        </li>
                      )}
                    </div>
                  );
                })}
                <div className="showMoreButtopnWrapper flex justify-center border-t-2 border-black ">
                  <button
                    className="showmore text-center p-2"
                    onClick={() => {
                      console.log("clicked showMore");
                      props.setShowMore(true);
                    }}
                  >
                    Show More
                  </button>
                </div>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex">
              <div className="search absolute top-1 left-2 bg-transparent cursor-pointer z-10">
                <BiSearch className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
              </div>
              <div className=" absolute bg-transparent right-4 text-transparent  cursor-pointer top-1">
                <img
                  src={Filter}
                  alt="icon"
                  className="h-10 hover:bg-[#DFE4ED] w-10 p-2 rounded-full bg-transparent "
                />
              </div>
            </div>
          )}
        </div>

        <div className="wrapper md:flex  relative justify-end mr-6 items-center hidden ">
          <button onClick={props.handleQuestionMark}>
            <GoQuestion className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
          </button>
          {props.appQuestionMark && (
            <div className="questionmarkwrapper settingsContainer  absolute  py-2  left-0 top-10 right-26   flex flex-col rounded-3xl cursor-pointer">
              <ul className="flex flex-col gap-0 bg-primary shadow-3xl">
                <li className="hover:bg-secondary p-2 w-full text-xs">Help</li>
                <li className="hover:bg-secondary p-2 w-full text-xs border-b-2 border-secondary">
                  Training
                </li>
                <li className="hover:bg-secondary p-2 w-full text-xs border-b-2 border-secondary">
                  Terms and Policy
                </li>
                <li className="hover:bg-secondary p-2 w-full text-xs">
                  Send feedback to Google
                </li>
              </ul>
            </div>
          )}
          <button onClick={props.handleSettings}>
            <IoSettingsOutline className="h-10 hover:bg-secondary w-10 p-2 rounded-full bg-transparent" />
          </button>

          {props.appSettings && (
            <div className="settingsContainer  absolute  py-2  left-10 top-10 right-8   flex flex-col rounded-3xl">
              <ul className="settingswrapper list-none flex flex-col  cursor-pointer  bg-primary  shadow-3xl py-2">
                <li className="hover:bg-secondary p-2 text-xs">Settings</li>
                <li className="hover:bg-secondary p-2 text-xs">
                  Get Drive For your desktop
                </li>
                <li className="hover:bg-secondary p-2 text-xs">
                  Keyboard shortcuts
                </li>
              </ul>
            </div>
          )}
          <button onClick={props.handleAppClick}>
            <GrApps className="h-10 hover:bg-secondary w-12 object-cover p-2 bg-transparent mr-2 rounded-full" />
          </button>
          <div>
            {props.appClick && (
              <div className="appsContainer  absolute  bg-secondary p-5  -left-10 top-10 right-0   flex flex-col rounded-3xl ">
                <div className="appsWrapper bg-primary h-72 overflow-scroll overflow-x-hidden scroll">
                  <ul className="list-none flex p-6 justify-between">
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={Account}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Account
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={google}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Google
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={Business}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Business
                      </span>
                    </li>
                  </ul>
                  <ul className="list-none flex p-6 justify-between">
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <div className="w-10 h-10 group-hover:bg-secondary">
                        <img
                          src={maps}
                          alt=""
                          className="rounded-full  object-contain w-10 h-10 "
                        />
                      </div>
                      <span className="text-sm group-hover:bg-transparent ">
                        Maps
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={yt}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        youtube
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={play}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Play
                      </span>
                    </li>
                  </ul>
                  <ul className="list-none flex p-6 justify-between">
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={photos}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Photos
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={calender}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Calender
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={drive}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Drive
                      </span>
                    </li>
                  </ul>
                  <ul className="list-none flex p-6 justify-between">
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={news}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        News
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={mail}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Gmail
                      </span>
                    </li>
                    <li className="flex flex-col gap-1 items-center justify-center group hover:bg-secondary p-3 cursor-pointer rounded-xl w-full">
                      <img
                        src={meet}
                        alt=""
                        className="rounded-full group-hover:bg-transparent w-10 h-10"
                      />
                      <span className="text-sm group-hover:bg-transparent">
                        Meet
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
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
            <div className="absolute  bg-secondary p-5  -left-10 top-10 right-0 z-10  flex flex-col rounded-3xl">
              <button className="cross" onClick={props.handleLogoutDropdown}>
                <MdOutlineClose className="w-7 h-7 absolute bg-transparent font-bold right-5 top-3 hover:bg-primary p-1 rounded-full cursor-pointer" />
              </button>
              <div className="wrapper flex flex-col gap-3 bg-transparent">
                <div className="header text-center ">
                  <p className="bg-secondary">{props.logOut.user.email}</p>
                </div>
                <div className="profile flex items-center justify-center  flex-col gap-5 bg-secondary w-full">
                  <div className="relative bg-transparent">
                    <img
                      src={props.Photo}
                      alt={"profile"}
                      className=" object-cover rounded-full "
                    />
                    <div className="editwrapper absolute rounded-full p-1 bottom-0 right-[0rem]">
                      <MdOutlineModeEditOutline className="w-5 h-5 rounded-full font-bold" />
                    </div>
                  </div>
                  <p className="name text-xl bg-transparent">
                    Hi, {props.logOut.user.displayName.split(" ")[0].toString()}{" "}
                    !
                  </p>
                  <button className="manage-btn text-base text-[#0b57d0] py-2 px-5 rounded-full border-2 border-[#0b57d0]">
                    Manage your Google Account
                  </button>
                </div>
                <div className="btns flex items-center justify-center bg-transparent gap-1 w-full">
                  <button className="flex items-center gap-2 p-3 rounded-l-full bg-primary w-full group hover:bg-secondary">
                    <FiPlus className="text-[#0b57d0] w-7 h-7 rounded-full bg-secondary p-1 group-hover:bg-primary" />
                    <span className="bg-transparent text-sm">Add account</span>
                  </button>
                  <button
                    className="flex items-center gap-2 p-3  bg-primary rounded-r-full w-full group hover:bg-secondary"
                    onClick={() => {
                      props.logOut.logout().then((res: null) => {
                        console.log(res);
                      });
                      navigate("/");
                    }}
                  >
                    <MdLogout className="text-[#0b57d0] w-7 h-7 rounded-full bg-secondary p-1 group-hover:bg-primary" />
                    <span className="bg-transparent">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <Moblenav
        handleSelected={props.handleSelected}
        seleted={props.seleted}
        list={props.list}
        grid={props.grid}
        setmobsearch={props.setmobsearch}
        setmobile={props.setmobile}
        mobile={props.mobile}
        handleAppInput={props.handleAppInput}
        handlesearchkeyup={props.handlesearchkeyup}
        appInput={props.appInput}
        mobsearch={props.mobsearch}
      />
    </>
  );
};

export default TopNav;
