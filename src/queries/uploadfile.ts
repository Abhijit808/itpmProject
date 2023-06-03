import { ref, uploadBytes } from "firebase/storage";
import {storage} from '../firebase/firebaseconfgig'
export const store = async(uid:string,file:File,path:[string])=>{
    let Path:string = "";
    if (path !== undefined) {
        path.forEach((element:any) => {
            Path = path+"/"+element+"/"
        });
     }
    const storageref  = ref(storage,`${uid}/${Path}/${file.name}`);
    const snapshot = await uploadBytes(storageref,file);
    console.log(snapshot);
     
}
