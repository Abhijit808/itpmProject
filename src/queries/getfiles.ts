import { collection, getDocs, query, where } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"
import { FirebaseError } from "firebase/app"

export const getFiles = async(folderid:string|undefined,uid:any)=>{
    try {
        if (folderid === undefined) {
          const f = query(collection(store, "files"), where('createdby', '==', uid), where('foldername', '==', null))
          const querySnapshot = await getDocs(f)
        return querySnapshot
        }
        else {
          const f = query(collection(store, "files"), where('createdby', '==', uid), where('foldername', '==', folderid))
          const querySnapshot = await getDocs(f)
       
          return querySnapshot
        }
    }
    catch(e:unknown){
            if(e  instanceof(FirebaseError)){
                    console.log(e);
                    
            }
    }
}