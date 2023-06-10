import { addDoc, collection } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"
import obj from "../types/obj";

export const uploadEntireFolder = async(Folder:obj)=>{
     const collectionref = collection(store,"folders");
     const data = await addDoc(collectionref,{
        ...Folder
     })
     return data
     
}