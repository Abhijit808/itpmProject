import { DocumentData } from "firebase/firestore";
import folders from "../types/folder";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import {
  ChangeEvent,
  useContext,

  // useEffect,
  useState,
} from "react";
import { Authprovider } from "../context/Authcontext";

import useUploadFiles from "../Hooks/useUploadFiles";
import { percentageProvider } from "../context/PercentageContext";

const Uploadfiles = ({
  folders,
  handlereload,
  handleloading,
  setPercentage,
  setSuccess,
}: {
  folders: folders | DocumentData;
  handlereload: (reload: boolean) => void;
  handleloading: (reload: boolean) => void;
  setPercentage: (value: number) => void;
  setSuccess: (value: boolean) => void;
}) => {
  const [file, setfile] = useState<File>();
  const auth = useContext(Authprovider);
  const per = useContext(percentageProvider);
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setfile(e.target.files[0]);
  };

  const { uploadPercentage, success } = useUploadFiles(
    auth.user.uid,
    file,
    folders.id,
    folders.path,
    handleloading,
    handlereload
  );

  setPercentage(uploadPercentage);
  setSuccess(success);
  per?.setPercentage(uploadPercentage);
  return (
    <>
      <label className="relative cursor-pointer overflow-hidden button text-black flex w-full gap-5 px-2 py-2 items-center text-3xl ">
        <BsFileEarmarkArrowUp className="text-2xl" />
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
