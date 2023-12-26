import { useEffect, useState } from "react";
import { getData } from "../queries/getdocs";
import { get_all_folders_created_by_a_user } from "../queries/get_all_folders_created_by_a_user";

import Nav from "./Nav";
import FolderOperationModel from "../components/FolderOperationModel";
import Sidenav_sub_component from "./Sidenav_sub_component";

const Sidenav = (props: any) => {
  // const [navfolders, setnavfolders] = useState<any>();
  const [Folders, setFolders] = useState<any>({
    name: "My Drive",
    id: null,
    children: [],
  });
  const [expand, setExpand] = useState(true);

  const handleclick = () => {
    setExpand(!expand);
  };
  const getAllfolderwithin = async (fid: any) => {
    const subfolders = await getData(fid, props.auth.user.uid);
    const newfolder: any = [];
    subfolders?.forEach(async (folder: any) => {
      // console.log(folder.data().foldername);
      newfolder.push({
        name: folder.data().foldername,
        id: folder.id,
        children: await getAllfolderwithin(folder.id),
      });
    });
    return newfolder;
  };
  const Showmydrive = async () => {
    const Allfolders = await get_all_folders_created_by_a_user(
      props.auth.user.uid
    );

    Allfolders?.forEach(async (folder: any) => {
      console.log(folder.data().foldername);
      const ch = await getAllfolderwithin(folder.id);
      // console.log(ch);
      const folders = {
        name: folder.data().foldername,
        id: folder.id,
        children: ch,
      };
      setFolders((prev: any) => ({
        ...prev,
        children: [
          ...prev.children,
          {
            ...folders,
          },
        ],
      }));
    });
  };

  useEffect(() => {
    Showmydrive();
    setFolders(() => ({
      name: "Mydrive",
      id: null,
      children: [],
    }));
  }, []);
  console.log(Folders);

  return (
    <nav className=" text-3xl side-nav  flex flex-col ml-10 gap-2 px-2 relative w-56 border-2 border-black visiblescrollbar resize-x ">
      <FolderOperationModel
        handlecreatefilesdropdown={props.handlecreatefilesdropdown}
        Handlecreatefilesdropdown={props.Handlecreatefilesdropdown}
        handleclick={props.handleclick}
        currentfolder={props.currentfolder}
        forcereload={props.forcereload}
        forceloading={props.forceloading}
      />
      <div className="partonewrapper">
        <div className="showwrapper">
          <div className="folder">
            <Nav
              Folders={Folders}
              Showmydrive={Showmydrive}
              truncate={props.truncate}
            />
          </div>
        </div>
        <Sidenav_sub_component
          handleclick={handleclick}
          expand={expand}
          image={
            <svg
              className=" c-qd "
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="currentColor"
              focusable="false"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path>
            </svg>
          }
          nameOfTheComponent={"Computer"}
          showArrow={true}
        />
      </div>
      <div className="partTwoWrapper mt-5">
        <Sidenav_sub_component
          handleclick={handleclick}
          expand={expand}
          image={
            <svg
              className=" c-qd"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="#000000"
              focusable="false"
            >
              <g>
                <rect fill="none" height="24" width="24"></rect>
              </g>
              <g>
                <g>
                  <path d="M15,8c0-1.42-0.5-2.73-1.33-3.76C14.09,4.1,14.53,4,15,4c2.21,0,4,1.79,4,4s-1.79,4-4,4c-0.43,0-0.84-0.09-1.23-0.21 c-0.03-0.01-0.06-0.02-0.1-0.03C14.5,10.73,15,9.42,15,8z M16.66,13.13C18.03,14.06,19,15.32,19,17v3h4v-3 C23,14.82,19.42,13.53,16.66,13.13z M9,4c2.21,0,4,1.79,4,4s-1.79,4-4,4s-4-1.79-4-4S6.79,4,9,4z M9,13c2.67,0,8,1.34,8,4v3H1v-3 C1,14.34,6.33,13,9,13z"></path>
                </g>
              </g>
            </svg>
          }
          nameOfTheComponent={"Shared with me"}
          showArrow={false}
        />
        <Sidenav_sub_component
          handleclick={handleclick}
          expand={expand}
          image={
            <svg
              className="c-qd "
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="#000000"
              focusable="false"
            >
              <g>
                <rect fill="none" height="20" width="20"></rect>
              </g>
              <g>
                <path d="M11.99,2C6.47,2,2,6.48,2,12s4.47,10,9.99,10C17.52,22,22,17.52,22,12S17.52,2,11.99,2z M15.29,16.71L11,12.41V7h2v4.59l3.71,3.71L15.29,16.71z"></path>
              </g>
            </svg>
          }
          nameOfTheComponent={"Recent"}
          showArrow={false}
        />
        <Sidenav_sub_component
          handleclick={handleclick}
          expand={expand}
          image={
            <svg
              className=" c-qd"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              focusable="false"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          }
          nameOfTheComponent={"Starred"}
          showArrow={false}
        />
      </div>
    </nav>
  );
};

export default Sidenav;
