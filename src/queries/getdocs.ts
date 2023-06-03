import { collection, getDocs, query, where } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"
import { FirebaseError } from "firebase/app"

export const getData = async(folderid:string|undefined,uid:any)=>{
    try {
        if (folderid === undefined) {
          const f = query(collection(store, "folders"), where('createdby', '==', uid), where('parentid', '==', null))
          const querySnapshot = await getDocs(f)
        return querySnapshot
        }
        else {
          const f = query(collection(store, "folders"), where('createdby', '==', uid), where('parentid', '==', folderid))
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