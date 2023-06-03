import { collection, doc, getDoc } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"

export const getsingledoc = async(folderid:string)=>{
   const collectionref = collection(store,"folders");
   const docref = doc(collectionref,folderid)
   const docdata = await getDoc(docref);
//    console.log({...docdata.data(),id:docdata.id});
   return docdata
   
}