import { LuFolderUp } from "react-icons/lu";
import { ChangeEvent, useContext } from "react";
import { DocumentData } from "firebase-admin/firestore";
import folders from "../types/folder";
import { uploadEntireFolder } from "../queries/uploadfolders";
import { Timestamp } from "firebase/firestore";
import { Authprovider } from "../context/Authcontext";

import { Store } from "../queries/uploadfile";
interface RelativePath {
  name: string;
  id: string;
  path: any[];
  // files: [];
  // children: [];
}
const upload = async (
  file: FileList | null,
  len: number | undefined,
  folder: folders | DocumentData,
  handlereload: (reload: boolean) => void,
  handleloading: (reload: boolean) => void,
  uid: number
) => {
  let count = 0;
  if (folder.path === undefined) {
    folder.path = [
      {
        id: "ROOT",
        name: "ROOT",
      },
    ];
  }
  if (file === null) {
    return;
  }
  if (len === undefined) {
    return;
  }
  if (count === len) {
    return;
  }
  let relativePath: RelativePath | undefined = {
    id: folder.id,
    name: folder.foldername,
    path: [...folder.path],
  };

  // let relpath = [];
  for (let index = 0; index < len; index++) {
    if (index === 0) {
      const Folder = {
        foldername: file[index].webkitRelativePath.split("/")[0],
        parentid: folder.id,
        path: [...folder.path, { id: folder.id, name: folder.foldername }],
        folder: true,
        Createdat: Timestamp.now(),
        createdby: uid,
      };
      const fileupload = await uploadEntireFolder(Folder);

      console.log(fileupload.id);

      relativePath.id = fileupload.id;
      relativePath.name = file[index].webkitRelativePath.split("/")[0];
      relativePath.path = Folder.path;
      const store = await Store(
        uid.toString(),
        file[0],
        [
          ...relativePath.path,
          { id: relativePath.id, name: relativePath.name },
        ],
        relativePath.id
      );
      console.log(store.id);
    }

    const File = file[index];
    const path = File.webkitRelativePath.split("/");
    let i = 1;
    console.log("index  " + index);
    while (i < path.length) {
      if (index > 0) {
        if (
          path.length > file[index - 1].webkitRelativePath.split("/").length
        ) {
          i = file[index - 1].webkitRelativePath.split("/").length;
        }
        if (
          path.length === file[index - 1].webkitRelativePath.split("/").length
        ) {
          i = file[index - 1].webkitRelativePath.split("/").length - 1;
          console.log(file[index - 1].webkitRelativePath.split("/"));
        }
      }

      console.log(
        i +
          " " +
          "folder " +
          File.webkitRelativePath.split("/")[i - 1] +
          " file " +
          File.webkitRelativePath.split("/")[i] +
          " " +
          "len " +
          File.webkitRelativePath.split("/").length
      );
      const Folder = {
        foldername: file[index].webkitRelativePath.split("/")[i - 1],
        parentid: relativePath.id,
        path: [
          ...relativePath.path,
          { id: relativePath.id, name: relativePath.name },
        ],
        folder: true,
        Createdat: Timestamp.now(),
        createdby: uid,
      };

      if (index > 0) {
        if (
          path.length !== file[index - 1].webkitRelativePath.split("/").length
        ) {
          const fileupload = await uploadEntireFolder(Folder);
          console.log(fileupload.id);

          relativePath.id = fileupload.id;
          relativePath.name = Folder.foldername;
          relativePath.path = Folder.path;
        }
        const store = await Store(
          uid.toString(),
          File,
          [
            ...relativePath.path,
            { id: relativePath.id, name: relativePath.name },
          ],
          relativePath.id
        );
        console.log(store.id);
      }
      i++;
    }
  }
  handleloading(false);
  handlereload(false);
};

const uploadFolder = (props: {
  folders: folders | DocumentData;
  handlereload: (reload: boolean) => void;
  handleloading: (reload: boolean) => void;
}) => {
  const auth = useContext(Authprovider);

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const len = e.target.files?.length;
    console.log(len);
    console.log(props.folders.path);
    props.handleloading(true);
    props.handlereload(true);
    upload(
      e.target.files,
      len,
      props.folders,
      props.handleloading,
      props.handlereload,
      auth.user.uid
    );
  };
  return (
    <div>
      {
        <label className="relative cursor-pointer overflow-hidden button text-black flex w-full gap-5 px-2 py-2 items-center text-3xl ">
          <LuFolderUp className="text-2xl" />
          <input
            type="file"
            className="absolute left-[-9999px]"
            onChange={handlechange}
            webkitdirectory=""
            multiple
            directory=""
          />
          <span className="text-sm font-bold">Upload Folder</span>
        </label>
      }
    </div>
  );
};

export default uploadFolder;
