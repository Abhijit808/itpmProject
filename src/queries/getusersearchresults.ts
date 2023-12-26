import { collection, doc, getDoc } from "firebase/firestore";
import { store } from "../firebase/firebaseconfgig";
import { DocumentData } from "firebase-admin/firestore";

export const getusersearchdetails = async (
  id: string
): Promise<DocumentData | undefined> => {
  const searchdataref = collection(store, "searchdetails");
  const docref = doc(searchdataref, id);
  const data = await getDoc(docref);

  return Promise.resolve(data.data());
};
