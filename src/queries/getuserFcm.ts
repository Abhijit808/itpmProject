import { collection, doc, getDoc } from "firebase/firestore";
import { store } from "../firebase/firebaseconfgig";

export const getFCM = async (userid: string) => {
  console.log(userid);

  const collectionref = collection(store, "UsersFcm");
  const docref = doc(collectionref, userid);
  const docdata = await getDoc(docref);
  console.log({ docData: docdata.data(), id: docdata.id });
  return docdata;
};
