import {
  StorageError,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
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
  return { uploadTask, storageref };
  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     // handleloading(true);
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log("Upload is " + progress + "% done");
  //     switch (snapshot.state) {
  //       case "paused":
  //         console.log("Upload is paused");
  //         break;
  //       case "running":
  //         console.log("Upload is running");
  //         break;
  //     }
  //   },
  //   (error: StorageError) => {
  //     console.log(error.message);
  //   },
  //   () => {
  //     getDownloadURL(uploadTask.snapshot.ref)
  //       .then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         const fileobj = {
  //           createdby: uid,
  //           path: path,
  //           url: downloadURL,
  //           foldername: id,
  //           filename: file.name,
  //           ref: storageref.fullPath,
  //         };
  //         const fileref = collection(store, "files");
  //         addDoc(fileref, {
  //           ...fileobj,
  //         })
  //           .then((d) => {
  //             console.log(d);
  //           })
  //           .catch((err) => {
  //             throw new Error(err);
  //           });
  //       })
  //       .catch((err) => {
  //         throw new Error(err);
  //       });

  //     // handleloading(false);
  //     // handlereload(true);
  //   }
  // );
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
  const [uploadPercentage, setuploadPercentage] = useState<number>(0);
  const [success, setsuccess] = useState<boolean>(false);
  const handlestore = useCallback(() => {
    if (file === undefined) return;

    handleloading(true);
    console.log(folderid);
    const fileppath = {
      id: "Root",
      name: "Root",
    };

    if (folderid === undefined) {
      const { uploadTask, storageref } = UploadFiles(
        uid,
        file,
        [fileppath],
        null
      );
      // console.log(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setuploadPercentage(progress);
        },
        (error: StorageError) => {
          throw new Error(error.message);
        },
        () => {
          getDownloadURL(storageref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              const fileobj = {
                createdby: uid,
                path: [fileppath],
                url: downloadURL,
                foldername: null,
                filename: file.name,
                ref: storageref.fullPath,
              };
              const fileref = collection(store, "files");
              addDoc(fileref, {
                ...fileobj,
              })
                .then((d) => {
                  console.log(d);
                  setsuccess(true);
                  handlereload(true);
                })
                .catch((err) => {
                  setsuccess(false);
                  throw new Error(err);
                });
            })
            .catch((err) => {
              setsuccess(false);
              throw new Error(err);
            });
        }
      );
    } else {
      const { uploadTask, storageref } = UploadFiles(uid, file, folderPath, id);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setuploadPercentage(progress);
        },
        (error: StorageError) => {
          throw new Error(error.message);
        },
        () => {
          getDownloadURL(storageref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              const fileobj = {
                createdby: uid,
                path: folderPath,
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
                  setsuccess(true);
                  handlereload(true);
                })
                .catch((err) => {
                  // setsuccess(false);
                  throw new Error(err);
                });
            })
            .catch((err) => {
              // setsuccess(false);
              throw new Error(err);
            });
        }
      );
    }
    handleloading(false);
    //
  }, [file]);

  useEffect(() => {
    handlestore();
  }, [file, handlestore]);

  return { uploadPercentage, success };
}

export default useUploadFiles;
export { UploadFiles };
