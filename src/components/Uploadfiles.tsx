import { DocumentData } from "firebase/firestore";
import folders from "../types/folder";
import { AiFillFileAdd } from "react-icons/ai";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Authprovider } from "../context/Authcontext";
import * as f from "../queries/uploadfile";
import { useParams } from "react-router-dom";
const Uploadfiles = ({
  folders,
  handlereload,
  handleloading,
}: {
  folders: folders | DocumentData;
  handlereload: (reload: boolean) => void;
  handleloading: (reload: boolean) => void;
}) => {
  const { folderid } = useParams();
  const [file, setfile] = useState<File>();
  const auth = useContext(Authprovider);
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setfile(e.target.files[0]);
  };
  const handlestore = useCallback(async () => {
    // handlereload(false);
    handleloading(true);
    if (file === undefined) return;
    // handleloading(true);
    console.log(folderid);

    if (folderid === undefined) {
      await f.Store(auth.user.uid, file, ["Root"], null);
      handlereload(true);
      handleloading(false);
    } else {
      await f.Store(auth.user.uid, file, folders.path, folders.id);

      handleloading(false);
      handlereload(true);
    }

    // handlereload(false)
    // handlereload(true);
  }, [file]);
  // console.log(folders);
  useEffect(() => {
    handlestore();
  }, [file, handlestore]);
  return (
    <>
      <label className="relative cursor-pointer overflow-hidden button text-black flex w-full gap-5 px-2 py-2 items-center text-3xl border-b-2 border-black">
        <AiFillFileAdd />
        <input
          type="file"
          className="absolute left-[-9999px]"
          onChange={handlechange}
        />
        <span className="text-sm font-bold">Upload File</span>
      </label>
    </>
  );
};

export default Uploadfiles;
