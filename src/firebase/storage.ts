import { storage } from "./firebaseconfgig";
// import { Authprovider } from "../context/Authcontext";
// import { useContext } from "react";
import { ref } from "firebase/storage";
// const auth = useContext(Authprovider)
const reference = ref(storage,'demo')
console.log(reference);
export {reference}