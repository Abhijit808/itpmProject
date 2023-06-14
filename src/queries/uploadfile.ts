import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {storage,store} from '../firebase/firebaseconfgig'
import { addDoc, collection } from "firebase/firestore";
export const Store = async(uid:string,file:File,path:[string],id:any)=>{
    let Path:string = "";
    console.log(path);
    
    if (path !== undefined) {
       path.forEach((p:any)=>{
        Path = Path+"/"+p
       })
     }
     console.log(Path);
     
    const storageref  = ref(storage,`${uid}/${Path}/${file.name}`);
    const snapshot = await uploadBytes(storageref,file);
    const download = await getDownloadURL(snapshot.ref);
    const fileobj = {
        createdby:uid,
        path:path,
        url:download,
        foldername:id,
        filename:file.name
    }
    console.log(download);
    const fileref = collection(store,"files");
    const doc = await addDoc(fileref,{
        ...fileobj
    })
    console.log(doc);
    return doc
       
     Path =""
}
