import { DocumentData } from "firebase/firestore";
import files from "../types/file";
import { subfolders_and_files } from "../queries/getsubfolders";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
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
      const files_and_folders = await subfolders_and_files(file.id);
      handleloading(false);
      handlereload(true);
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        navigate("/error");
      }
    }
  };
  return (
    <div className="absolute -right-[7rem] top-12 bg-blue-700 text-white py-4 px-1 z-10 transition-all">
      <li
        className="val  list-none w-full hover:bg-white hover:text-black cursor-pointer transition-all px-10 py-1 font-Abel uppercase"
        onClick={handlefileDelete}
      >
        Delete
      </li>
      {/* <li className="val  list-none w-full hover:bg-white hover:text-black cursor-pointer transition-all px-10 py-1 font-Abel uppercase">Delete</li>
        <li className="val  list-none w-full hover:bg-white hover:text-black cursor-pointer transition-all px-10 py-1 font-Abel uppercase">Delete</li> */}
    </div>
  );
};

export default Dropdown;
