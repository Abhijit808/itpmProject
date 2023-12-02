import { useCallback, useContext, useEffect, useState } from "react";
import { Authprovider } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import Folders from "../components/Folders";
import Files from "../components/Files";
import folders from "../types/folder";
import obj from "../types/obj";
import { addData } from "../queries/adddoc";
import { getData } from "../queries/getdocs";
import { getsingledoc } from "../queries/getdoc";
// import { ScaleLoader } from "react-spinners";
import { FirebaseError } from "firebase/app";
import { getFiles } from "../queries/getfiles";
import { BiSearch } from "react-icons/bi";
import logo from "../assets/drive_2020q4_48dp.png";
import files from "../types/file";
import Sidenav from "../components/Sidenav";
import { DocumentData, Timestamp } from "firebase/firestore";
import { getmessage, storeFCMToken } from "../notification/Notification";
import Tabs from "../components/Tabs";
import { GrApps } from "react-icons/gr";
import TopNav from "../components/TopNav";
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
  const handleLogout = async () => {
    console.log("logoput");

    
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
    setHandleLogoutDropdown(false);
    sethandlecreatefilesdropdown(false);
    // setShowmydrive(false);
  };
  const handlelogoutdropdown = () => {
    console.log("handlelogoutdropdown");
    setHandleLogoutDropdown(!HandleLogoutDropdown);
  };
  const handlecreatefilesdropdown = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(e.target);
    e.stopPropagation();
    sethandlecreatefilesdropdown(!Handlecreatefilesdropdown);
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
          <main className="">
            <TopNav
              logo={logo}
              handleLogoutDropdown={handlelogoutdropdown}
              HandleLogoutDropdown={HandleLogoutDropdown}
              Photo={auth.user.photoURL}
              logOut={auth}
            />
            <main onClick={Destroy} className="cursor-pointer h-[100vh] flex">
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
              />

              <div className="w-[70%] mx-auto flex flex-col gap-5">
                <div className="folders ">
                  <div className="flex gap-3">
                    <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">
                      {folderid === undefined
                        ? "ROOT"
                        : currentfolder.foldername}
                    </h3>
                    <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">
                      Folders: {folders.length}
                    </h3>
                    <h3 className="font-Abel text-2xl underline w-fit px-5 py-1 ml-2">
                      Files: {files.length}
                    </h3>
                  </div>
                  <div className="tabs">
                    <Tabs Path={currentfolder.path} />
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
          </main>
        </>
      )}
    </>
  );
};

export default Dashboard;
