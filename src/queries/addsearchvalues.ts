import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { store } from "../firebase/firebaseconfgig";

export const addSearch = async (
  id: string,
  name: string,
  Data: any
): Promise<boolean> => {
  const searchdataref = collection(store, "searchdetails");
  const docref = doc(searchdataref, id);
  const check = await getDoc(docref);
  if (check.exists()) {
    await updateDoc(docref, {
      data: Data,
    });
  } else {
    const datastore = await setDoc(docref, {
      id: id,
      name: name,
      data: Data,
    });
    console.log(datastore);
  }

  return Promise.resolve(true);
};
