import { DocumentData } from "firebase/firestore";
import files from "../types/file";
import { subfolders_and_files } from "../queries/getsubfolders";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { IoTrashOutline } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { RiArrowDropRightFill } from "react-icons/ri";
// interface dropdowntype {
//   id: string;
//   state: boolean;
// }
const Dropdown = ({
  file,
  handlereload,
  handleloading,
}: {
  file: files | DocumentData;
  handlereload: (reload: boolean) => void;
  handleloading: (loading: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handlefileDelete = async () => {
    console.log(file);

    handleloading(true);
    try {
      await subfolders_and_files(file.id);
      handleloading(false);
      handlereload(true);
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        navigate("/error");
      }
    }
  };
  return (
    <div className="absolute -right-[7rem] top-14x px-1  z-10 transition-all">
      <li className="val  list-none w-full hover:bg-white hover:text-black cursor-pointer transition-all px-2 py-2 border-2 border-b-black  pr-20 font-Abel uppercase flex items-center justify-start">
        <IoTrashOutline className="w-10 h-6" />
        <button onClick={handlefileDelete}>Move To Trash</button>
      </li>
      <li className="val  list-none w-full hover:bg-white hover:text-black cursor-pointer transition-all px-2  py-2 pr-20 font-Abel uppercase flex items-center justify-start">
        <IoTrashOutline className="w-10 h-6" />
        <button
          onClick={() => {
            console.log("hello");
          }}
        >
          Move To Trash
        </button>
      </li>
    </div>
  );
};

export default Dropdown;
