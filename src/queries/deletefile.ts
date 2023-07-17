import { collection, deleteDoc, doc } from "firebase/firestore";
import { storage, store } from "../firebase/firebaseconfgig";
import { deleteObject, ref } from "firebase/storage";
import { FirebaseError } from "firebase/app";

export const deletefile = async(Ref:string,folderid:string)=>{
try {
        
          const storageref = ref(storage,Ref);
          const deletefile = await deleteObject(storageref);
          console.log(deletefile);
          if(deletefile === undefined){

            const collectionref = collection(store,"files");
            const docref = doc(collectionref,folderid);
            const docdata = await deleteDoc(docref);
            console.log(docdata);
          }
        
        
} 
catch (error) {
  if (error instanceof(FirebaseError)) {
        console.log(error);
        
  }       
}
     
}