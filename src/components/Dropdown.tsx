import { DocumentData } from "firebase/firestore";
import files from "../types/file";
import { subfolders_and_files } from "../queries/getsubfolders";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { IoMoveOutline, IoTrashOutline } from "react-icons/io5";
import { RiArrowDropRightFill } from "react-icons/ri";

const Dropdown = ({
  file,
  handlereload,
  handleloading,
  id,
}: {
  file: files | DocumentData;
  handlereload: (reload: boolean) => void;
  handleloading: (loading: boolean) => void;
  id: any;
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
    <div className="absolute   z-10 transition-all md:w-[15rem] w-full">
      {file.id === id && (
        <ul>
          <li className="val  list-none w-full hover:bg-white hover:text-black cursor-pointer transition-all px-2 py-2 border-2 border-b-black  pr-1 font-Abel uppercase flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <IoMoveOutline />
              <button>Open With</button>
            </div>

            <RiArrowDropRightFill className="w-10 h-6 rotate-0" />
          </li>
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
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
