import { addDoc, collection } from "firebase/firestore";
import { store } from "../firebase/firebaseconfgig";

export const adduserFCM = async (obj: any) => {
  const collectionref = collection(store, "UsersFcm");
  const data = await addDoc(collectionref, {
    ...obj,
  });
  return data;
};
