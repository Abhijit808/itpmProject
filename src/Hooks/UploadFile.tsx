import {
  StorageError,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, store } from "../firebase/firebaseconfgig";
import { fileppaths } from "../types/fileppaths";
import { addDoc, collection } from "firebase/firestore";

export const UploadFile = (
  uid: string,
  file: File,
  path: fileppaths[],
  id: any,
  handleloading: any
  // handlereload: any
) => {
  handleloading(true);
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
