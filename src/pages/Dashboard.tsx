import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Authprovider } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import Folders from "../components/Folders";
import Files from "../components/Files";
import folders from "../types/folder";
import obj from "../types/obj";
import { addData } from "../queries/adddoc";
import { getData } from "../queries/getdocs";
import { getsingledoc } from "../queries/getdoc";
import { FirebaseError } from "firebase/app";
import { getFiles } from "../queries/getfiles";
import logo from "../assets/drive_2020q4_48dp.png";
import files from "../types/file";
import Sidenav from "../components/Sidenav";
import { DocumentData, Timestamp } from "firebase/firestore";
import { getmessage, storeFCMToken } from "../notification/Notification";
import Tabs from "../components/Tabs";
import TopNav from "../components/TopNav";
import { dropdowntype } from "../types/dropdowntype";
import { RiArrowDropRightFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
import { MdGridView } from "react-icons/md";
import FolderOperationModel from "../components/FolderOperationModel";
// import Toast from "../components/Toast";
import { percentageProvider } from "../context/PercentageContext";
const Dashboard = () => {
  const { folderid } = useParams();
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  const pervalue = useContext(percentageProvider);
  const [loading, setloading] = useState<boolean>(false);
  const [reload, setreload] = useState<boolean>(false);
  const [seleted, setseleted] = useState<boolean>(true);
  const [list, setList] = useState<boolean>(false);
  const [grid, setGrid] = useState<boolean>(true);
  const [place, setplace] = useState<number>(9);
  const [dropdownPosition, setdropdownPosition] = useState<boolean>(true);
  const [folders, setfolders] = useState<Array<folders | DocumentData>>([]);
  const [files, setfiles] = useState<Array<files | DocumentData>>([]);
  const [dropdown, setdropdown] = useState<dropdowntype>({
    id: "",
    state: false,
  });
  const [HandleLogoutDropdown, setHandleLogoutDropdown] =
    useState<boolean>(false);
  const [Handlecreatefilesdropdown, sethandlecreatefilesdropdown] =
    useState<boolean>(false);
  const [currentfolder, setcurrentfolder] = useState<folders | DocumentData>(
    {}
  );
  const [percentage, setPercentage] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const parentref = useRef<HTMLDivElement>(null);
  console.log(pervalue?.percentage);
  console.log(percentage, success);

  type pathobj = {
    id: string;
    name: string;
  };

  const handleclick = async (input: string, currentfolder: obj) => {
    const Path: pathobj[] = [];

    setloading(true);
    const state: obj = {
      foldername: input,
      parentid: folderid,
      path: Path,
      folder: true,
      Createdat: Timestamp.now(),
      createdby: auth.user.uid,
    };
    if (state.parentid === undefined) {
      state.parentid = null;
    }
    try {
      if (folderid === undefined) {
        Path.push({ id: "Root", name: "Root" });
      }
      if (folderid) {
        Path.push(...currentfolder.path, {
          id: folderid,
          name: currentfolder.foldername,
        });
      }
      const data = await addData(state);
      console.log(data.id);

      setreload(true);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);

        navigate("/error");
      }
    }
    setloading(false);
  };

  const forcereload = (reload: boolean) => {
    setreload(reload);
  };
  const forceloading = (loading: boolean) => {
    setloading(loading);
  };
  const Percentage = (value: number) => {
    setPercentage(value);
    console.log(value);
  };
  const Success = (value: boolean) => {
    setSuccess(value);
  };
  // Percentage(10);

  // const handleLogout = async () => {
  useEffect(() => {
    if (parentref.current === null) {
      return;
    }
    if (parentref.current.scrollHeight > parentref.current.clientHeight) {
      setdropdownPosition(true);
      return;
    } else {
      setdropdownPosition(false);
    }
  }, [dropdownPosition]);
  //   console.log("logoput");
  // };
  useEffect(() => {
    setfolders([]);
    const Data = async () => {
      const Data: any = await getData(folderid, auth.user.uid);
      Data?.forEach((d: any) => {
        setfolders((prev) => [...prev, { ...d.data(), id: d.id }]);
      });
    };
    setloading(false);

    if (reload === true) {
      Data();
    }
    setreload(false);
  }, [reload, auth.user.uid]);

  useEffect(() => {
    console.log("running");

    setfolders([]);
    const Data = async () => {
      const Data: any = await getData(folderid, auth.user.uid);
      Data?.forEach((d: any) => {
        setfolders((prev) => [...prev, { ...d.data(), id: d.id }]);
      });
    };
    setloading(false);

    Data();
  }, [folderid]);

  useEffect(() => {
    setfiles([]);
    const Files = async () => {
      const Filedata = await getFiles(folderid, auth.user.uid);
      Filedata?.forEach((d: any) => {
        setfiles((prev) => [...prev, { ...d.data(), id: d.id }]);
      });
    };

    setloading(false);

    if (reload === true) {
      Files();
    }
    setreload(false);
  }, [reload, auth.user.uid]);
  useEffect(() => {
    setfiles([]);
    const Files = async () => {
      const Filedata = await getFiles(folderid, auth.user.uid);
      Filedata?.forEach((d: any) => {
        setfiles((prev) => [...prev, { ...d.data(), id: d.id }]);
      });
    };

    setloading(false);

    Files();
  }, [folderid]);

  const call = useCallback(() => {
    const getSingleDocs = async () => {
      if (folderid === undefined) {
        return;
      }

      const current = await getsingledoc(folderid);
      const currentfolder = { ...current.data(), id: current.id };
      setcurrentfolder(currentfolder);
    };
    getSingleDocs();
  }, [folderid]);

  // useEffect(() => {
  //   getSingleDocs();
  // }, [folderid])
  useEffect(() => {
    call();
  }, [folders, call]);

  const Destroy = () => {
    setHandleLogoutDropdown(false);
    sethandlecreatefilesdropdown(false);
    setdropdown({ id: "", state: false });
    // setShowmydrive(false);
  };
  const handlelogoutdropdown = () => {
    console.log("handlelogoutdropdown");
    setHandleLogoutDropdown(!HandleLogoutDropdown);
    console.log(auth.user);
  };
  const handlecreatefilesdropdown = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(e.currentTarget.ariaLabel);
    console.log(e.currentTarget.querySelector("span"));
    e.stopPropagation();
    sethandlecreatefilesdropdown(true);
    if (e.currentTarget.querySelector("span") === null) {
      setplace(1);
    }
    if (e.currentTarget.querySelector("span") !== null) {
      setplace(0);
    }
  };
  const handleDropdownclick = (e: any, f: files | DocumentData) => {
    e.stopPropagation();
    setdropdown({ id: f.id, state: true });
    console.log("child Height " + e.currentTarget.offsetHeight);
    console.log("child scroll " + e.currentTarget.scrollHeight);
    console.log("child rect " + e.currentTarget.getBoundingClientRect().bottom);
    console.log("parent Height " + parentref.current!.offsetHeight);
    console.log("parent Scroll " + parentref.current?.scrollHeight);
    console.log("parent client " + parentref.current?.clientHeight);
    console.log(
      "parent rect " + parentref.current?.getBoundingClientRect().bottom
    );
  };
  const handleSelected = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.getAttribute("data-listview"));
    if (e.currentTarget.getAttribute("data-listview") === "list") {
      setGrid(false);
      setList(true);
      setseleted(true);
    } else {
      setList(false);
      setGrid(true);
      setseleted(true);
    }
  };
  const truncate = (value: string, nu: number) => {
    if (value === undefined) {
      return;
    }
    return value.slice(0, nu) + "...";
  };
  useEffect(() => {
    const token = async () => {
      await storeFCMToken(auth.user);
    };
    token();
  }, []);
  getmessage();
  return (
    <>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <>
          <main className="md:block hidden" onClick={Destroy}>
            {/* <div className="relative bg-red-600">
              <Toast upload={percentage} success={success} />
            </div> */}
            <TopNav
              logo={logo}
              handleLogoutDropdown={handlelogoutdropdown}
              HandleLogoutDropdown={HandleLogoutDropdown}
              Photo={auth.user.photoURL}
              logOut={auth}
            />
            <main className="cursor-pointer h-[100vh] flex">
              <Sidenav
                handlecreatefilesdropdown={handlecreatefilesdropdown}
                Handlecreatefilesdropdown={Handlecreatefilesdropdown}
                handleclick={handleclick}
                currentfolder={currentfolder}
                forcereload={forcereload}
                forceloading={forceloading}
                folders={folders}
                auth={auth}
                truncate={truncate}
                place={place}
                Percentage={setPercentage}
                Success={setSuccess}
              />

              <div className="w-[70%] mx-auto flex flex-col gap-5">
                <div className="folders ">
                  <div className="mydrive flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        className="mydrive p-2   rounded-xl flex items-center relative flex-1"
                        onClick={handlecreatefilesdropdown}
                      >
                        <span className="bg-transparent text-2xl text-black">
                          My Drive
                        </span>
                      </button>
                      <div>
                        <FolderOperationModel
                          handlecreatefilesdropdown={handlecreatefilesdropdown}
                          Handlecreatefilesdropdown={Handlecreatefilesdropdown}
                          handleclick={handleclick}
                          currentfolder={currentfolder}
                          forcereload={forcereload}
                          forceloading={forceloading}
                          icon={
                            <RiArrowDropRightFill className="rotate-90 text-3xl text-black" />
                          }
                          dropdown={true}
                          dropdownplace={place}
                          id={1}
                          Percentage={Percentage}
                          Success={Success}
                        />
                      </div>
                    </div>
                    <div className="tables_cards_toggel_btn_wrapper  border-2 border-black px-2 py-1 flex  rounded-full">
                      <button
                        onClick={(e) => handleSelected(e)}
                        data-listview="list"
                        className="border-r-2 border-black flex gap-1 items center pr-2"
                      >
                        {seleted && list && <AiOutlineCheck />}
                        <GiHamburgerMenu />
                      </button>
                      <button
                        onClick={(e) => handleSelected(e)}
                        className="flex gap-1 items center pl-2"
                      >
                        {seleted && grid && <AiOutlineCheck />}
                        <MdGridView />
                      </button>
                    </div>
                  </div>
                  <div className="tabs">
                    <Tabs Path={currentfolder.path} />
                  </div>
                </div>

                <div>
                  <Folders
                    folder={folders}
                    Reload={forcereload}
                    Loading={forceloading}
                    handleClick={handleDropdownclick}
                    dropdown={dropdown}
                    files={files}
                    list={list}
                    parentref={parentref}
                    dropdownPosition={dropdownPosition}
                  />
                </div>
                {/* {(folders.length > 0 ||
                  files.length > 0 ||
                  (folders.length > 0 && files.length > 0)) && (
                  <div className="line h-1 w-full bg-black rounded-sm "></div>
                )} */}
                {!list && (
                  <div className="files grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">
                    <Files
                      files={files}
                      Reload={forcereload}
                      Loading={forceloading}
                      handleClick={handleDropdownclick}
                      dropdown={dropdown}
                    />
                  </div>
                )}
              </div>
            </main>
          </main>
        </>
      )}
    </>
  );
};

export default Dashboard;
