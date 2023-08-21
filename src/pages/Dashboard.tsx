import { useCallback, useContext, useEffect, useState } from "react";
import { Authprovider } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import Model from "../components/Model";
import { DocumentData, Timestamp } from "firebase/firestore";
import Folders from "../components/Folders";
import Files from "../components/Files";
import { AiFillFolderAdd, AiOutlinePlus } from "react-icons/ai";
import Uploadfiles from "../components/Uploadfiles";
import folders from "../types/folder";
import obj from "../types/obj";
import { addData } from "../queries/adddoc";
import { getData } from "../queries/getdocs";
import { getsingledoc } from "../queries/getdoc";
// import { ScaleLoader } from "react-spinners";
import { FirebaseError } from "firebase/app";
import { getFiles } from "../queries/getfiles";
import UploadFolders from "../components/UploadFolders";
import { BiSearch } from "react-icons/bi";
import logo from "../assets/drive_2020q4_48dp.png";
import files from "../types/file";
const Dashboard = () => {
  const { folderid } = useParams();
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  const [loading, setloading] = useState<boolean>(false);
  const [reload, setreload] = useState<boolean>(false);
  const [folders, setfolders] = useState<Array<folders | DocumentData>>([]);
  const [files, setfiles] = useState<Array<files | DocumentData>>([]);
  const [destroy, setdestroy] = useState<boolean>(false);
  const [HandleLogoutDropdown, setHandleLogoutDropdown] =
    useState<boolean>(false);
  const [Handlecreatefilesdropdown, sethandlecreatefilesdropdown] =
    useState<boolean>(false);
  const [currentfolder, setcurrentfolder] = useState<folders | DocumentData>(
    {}
  );
  const handleclick = async (input: string, currentfolder: obj) => {
    const Path: string[] = [];

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
        Path.push("Root");
      }
      if (folderid) {
        Path.push(...currentfolder.path, folderid);
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

  const forcedDestory = (kill: boolean | undefined) => {
    if (kill === undefined) return;
    setdestroy(kill);
  };
  const Destroy = () => {
    forcedDestory(false);
  };
  const handlelogoutdropdown = () => {
    console.log("handlelogoutdropdown");
    setHandleLogoutDropdown(!HandleLogoutDropdown);
  };
  const handlecreatefilesdropdown = () => {
    sethandlecreatefilesdropdown(!Handlecreatefilesdropdown);
  };
  return (
    <>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center overflow-hidden">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <>
          <nav className="grid grid-cols-2 md:grid-cols-3 justify-around items-center my-5 gap-10 ">
            <nav className="font-Abel text-3xl side-nav  flex flex-col ml-10 gap-2">
              <div className="logo flex items-center gap-2">
                <img src={logo} alt="here" />
                <h1>Drive</h1>
              </div>
              <div className="Create_wrapper relative">
                <button
                  className="flex gap-3 bg-white p-4 rounded-2xl text-xl max-w-[8rem]  text-black justify-center items-center shadow-md shadow-white"
                  onClick={handlecreatefilesdropdown}
                >
                  <AiOutlinePlus />
                  <span>New</span>
                </button>
                <div
                  className={` flex-col justify-center gap-2 items-center absolute w-10/12  left-0 right-0 t bg-white py-4 z-50 ${
                    Handlecreatefilesdropdown
                      ? "opacity-0 hidden transition-all"
                      : "opacity-100 flex"
                  }`}
                >
                  <Model
                    btnText={
                      <>
                        <div className="button flex w-full gap-5 px-2 items-center text-3xl border-b-2 border-black">
                          <AiFillFolderAdd />
                          <span className="text-sm font-bold">Upload File</span>
                        </div>
                      </>
                    }
                    okBtn="save"
                    closeBtn="cancel"
                    modelText="create folder"
                    onsave={handleclick}
                    folder={currentfolder}
                  />
                  <Uploadfiles
                    folders={currentfolder}
                    handlereload={forcereload}
                    handleloading={forceloading}
                  />
                  <UploadFolders
                    folders={currentfolder}
                    handlereload={forcereload}
                    handleloading={forceloading}
                  />
                </div>
              </div>
              {/* TODO: add dropdowns */}
              {/* <div className="folders">
                {folders?.map((folder, i) => {
                  return (
                    <li key={i} className="text-white list-none">
                      {folder.foldername}
                    </li>
                  );
                })}
              </div>
              <div className="files ">
                {files?.map((file, i) => {
                  return (
                    <li key={i} className="text-white list-none">
                      {file.filename}
                    </li>
                  );
                })}
              </div> */}
            </nav>
            <div className=" flex  items-center relative ">
              <div className="search absolute left-2">
                <BiSearch className="w-10 h-7" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered input-warning w-full max-w-3xl rounded-full pl-12 "
              />
            </div>
            <div className="wrapper flex gap-2 relative justify-end mr-6">
              <button
                className="button w-10 h-10 rounded-full"
                onClick={handlelogoutdropdown}
              >
                <img
                  src={auth.user.photoURL}
                  alt={"profile"}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
              {HandleLogoutDropdown && (
                <div className="dropdown absolute -bottom-20 bg-white p-5  -left-10">
                  <button
                    className="logout underline font-Abel"
                    onClick={() => {
                      auth.logout().then((res: null) => {
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
          </nav>
          <main onClick={Destroy} className="cursor-pointer h-[100vh]">
            <nav className="foldernav w-[70%] mx-auto flex items-center gap-4"></nav>
            <div className="w-[70%] mx-auto flex flex-col gap-5">
              <div className="folders ">
                <div className="flex gap-3">
                  <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">
                    {folderid === undefined ? "ROOT" : currentfolder.foldername}
                  </h3>
                  <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">
                    Folders: {folders.length}
                  </h3>
                  <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">
                    Files: {files.length}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Folders
                    folder={folders}
                    des={destroy}
                    clic={forcedDestory}
                    Reload={forcereload}
                    Loading={forceloading}
                  />
                </div>
              </div>
              {(folders.length > 0 ||
                files.length > 0 ||
                (folders.length > 0 && files.length > 0)) && (
                <div className="line h-1 w-full bg-black rounded-sm "></div>
              )}
              <div className="files grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-4">
                <Files
                  files={files}
                  des={destroy}
                  clic={forcedDestory}
                  Reload={forcereload}
                  Loading={forceloading}
                />
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Dashboard;
