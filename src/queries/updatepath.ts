import { collection, doc, updateDoc } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"

export const updatepath = async(folder:any)=>{
    const collectionref = collection(store,"folders");
    const docref = doc(collectionref,folder.id);
    const updatedPath = await updateDoc(docref,{
        "path":`/${folder.id}`
    })
    return updatedPath
}