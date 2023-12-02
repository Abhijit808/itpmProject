import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { store } from "../firebase/firebaseconfgig";
import { FirebaseError } from "firebase/app";

export const getData = async (folderid: string | undefined, uid: number) => {
  try {
    if (folderid === undefined) {
      const f = query(
        collection(store, "folders"),
        where("createdby", "==", uid),
        where("parentid", "==", null),
        orderBy("Createdat")
      );
      const querySnapshot = await getDocs(f);
      return querySnapshot;
    } else {
      const f = query(
        collection(store, "folders"),
        where("createdby", "==", uid),
        where("parentid", "==", folderid),
        orderBy("Createdat")
      );
      const querySnapshot = await getDocs(f);

      return querySnapshot;
    }
  } catch (e: unknown) {
    if (e instanceof FirebaseError) {
      console.log(e);
    }
  }
};
