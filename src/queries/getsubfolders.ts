import { collection, getDocs, query, where } from "firebase/firestore"
import { store } from "../firebase/firebaseconfgig"

export const getsubfolders_and_files =async(id:string)=>{
    const files_and_folders:string|undefined[] = []
    const folders = query(collection(store, "folders"),  where('parentid', '==', id))
    const querySnapshot1 = await getDocs(folders);
    querySnapshot1?.forEach((d: any) => {
        files_and_folders.push(d.id);
      })
      const files = query(collection(store, "folders"),  where('parentid', '==', id))
      const querySnapshot2 = await getDocs(files)
      querySnapshot2?.forEach((d: any) => {
          files_and_folders.push(d.id);
        })
    return files_and_folders
}