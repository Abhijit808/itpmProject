import { addDoc, collection } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"

export const addData=async(obj:any)=>{
        const collectionref = collection(store,"folders");
        const data = await addDoc(collectionref,{
            ...obj
        })
        return data
        
}