import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { store } from "../firebase/firebaseconfgig";
import { FirebaseError } from "firebase/app";

export const get_all_folders_created_by_a_user = async (uid: number) => {
  try {
    const f = query(
      collection(store, "folders"),
      where("createdby", "==", uid),
      where("parentid", "==", null),
      orderBy("Createdat")
    );
    const querySnapshot = await getDocs(f);
    return querySnapshot;
  } catch (e: unknown) {
    if (e instanceof FirebaseError) {
      console.log(e);
    }
  }
};
