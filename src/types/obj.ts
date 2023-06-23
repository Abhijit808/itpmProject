import { Timestamp } from "firebase/firestore";

export default interface obj {
    foldername: string,
    parentid: string|null|undefined,
    path:any,
    Createdat: Timestamp,
    createdby: number
}