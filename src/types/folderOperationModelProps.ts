import { DocumentData } from "firebase-admin/firestore";
import obj from "./obj";
import folders from "./folder";

export interface folderOperationModelprops {
  handlecreatefilesdropdown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Handlecreatefilesdropdown: boolean;
  handleclick: (input: string, currentfolder: obj) => Promise<void>;
  currentfolder: DocumentData | folders;
  forcereload: (reload: boolean) => void;
  forceloading: (loading: boolean) => void;
  icon: JSX.Element;
  dropdown: boolean;
  dropdownplace: number;
  id: number;
}
