import { collection, deleteDoc, doc } from "firebase/firestore";
import { storage, store } from "../firebase/firebaseconfgig";
import { deleteObject, ref } from "firebase/storage";

export const deletefile = async(Ref:string,folderid:string)=>{
   
        const storageref = ref(storage,Ref);
        const deletefile = await deleteObject(storageref);
        
        const collectionref = collection(store,"folders");
        const docref = doc(collectionref,folderid);
        const docdata = await deleteDoc(docref);
        
     
}