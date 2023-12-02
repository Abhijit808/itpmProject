import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { storage, store } from "../firebase/firebaseconfgig";
import { deleteObject, ref } from "firebase/storage";

const deleteFiles = async (Ref: string) => {
  const deleteRef = ref(storage, Ref);
  await deleteObject(deleteRef);
};
const deleteEverything = async (id: string, type: string) => {
  const collectionref = collection(store, type);

  const deleteRef = doc(collectionref, id);
  await deleteDoc(deleteRef);
};
export const subfolders_and_files = async (id: any) => {
  const Files = [] as any;
  Files.push(id);
  const getsubfolders_and_files = async (id: any) => {
    const files_and_folders: any[] = [];
    if (id === undefined) {
      console.log("undefined");

      return files_and_folders;
    }
    const files = query(
      collection(store, "files"),
      where("foldername", "==", id)
    );
    const querySnapshot2 = await getDocs(files);
    querySnapshot2?.forEach((d: any) => {
      console.log(d.data());
      deleteFiles(d.data()?.ref);
      deleteEverything(d.id, "files");
      files_and_folders.push({ id: d.id, ref: d.data()?.ref });
    });

    const folders = query(
      collection(store, "folders"),
      where("parentid", "==", id)
    );
    const querySnapshot1 = await getDocs(folders);
    querySnapshot1?.forEach(async (d: any) => {
      files_and_folders.push(d.id);
      console.log("folders ", d.data());

      deleteEverything(d.id, "folders");
      getsubfolders_and_files(d.id);
    });

    Files.push(files_and_folders);
    return Files;
  };
  await getsubfolders_and_files(id);

  if (Files[0] === id) {
    deleteEverything(id, "folders");
    deleteEverything(id, "files");
  }
};
