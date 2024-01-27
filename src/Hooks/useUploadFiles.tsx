import {
  StorageError,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useEffect } from "react";
import { storage, store } from "../firebase/firebaseconfgig";
import { addDoc, collection } from "firebase/firestore";
import { fileppaths } from "../types/fileppaths";
import { useParams } from "react-router-dom";
const UploadFiles = (uid: string, file: File, path: fileppaths[], id: any) => {
  let Path = "";
  console.log(path);
  if (path !== undefined) {
    path.forEach((p: any) => {
      Path = Path + "/" + p;
    });
  }
  console.log(uid, file, id, path);
  const storageref = ref(storage, `${uid}/${Path}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageref, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // handleloading(true);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error: StorageError) => {
      console.log(error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          console.log("File available at", downloadURL);
          const fileobj = {
            createdby: uid,
            path: path,
            url: downloadURL,
            foldername: id,
            filename: file.name,
            ref: storageref.fullPath,
          };
          const fileref = collection(store, "files");
          addDoc(fileref, {
            ...fileobj,
          })
            .then((d) => {
              console.log(d);
            })
            .catch((err) => {
              throw new Error(err);
            });
        })
        .catch((err) => {
          throw new Error(err);
        });

      // handleloading(false);
      // handlereload(true);
    }
  );
};
function useUploadFiles(
  uid: string,
  file: File | undefined,
  id: any,
  folderPath: any,
  handleloading: (reload: boolean) => void,
  handlereload: (reload: boolean) => void
) {
  const { folderid } = useParams();

  const handlestore = useCallback(() => {
    if (file === undefined) return;

    handleloading(true);
    console.log(folderid);
    const fileppath = {
      id: "Root",
      name: "Root",
    };

    if (folderid === undefined) {
      UploadFiles(uid, file, [fileppath], null);
    } else {
      UploadFiles(uid, file, folderPath, id);
    }
    handleloading(false);
    handlereload(true);
  }, [file]);
  useEffect(() => {
    handlestore();
  }, [file, handlestore]);
}

export default useUploadFiles;
export { UploadFiles };
