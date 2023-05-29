
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Authprovider } from "../context/Authcontext"
import { useNavigate, useParams } from "react-router-dom";
import Model from "../components/Model"
// import { Modelcontext } from "../context/ModelProvider";
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { storage, store } from "../firebase/firebaseconfgig";
import Folders from "../components/Folders";
import { FirebaseError } from "firebase/app";
import { ref, uploadBytes } from "firebase/storage";
const Dashboard = () => {
  const { folderid } = useParams()
  // console.log(folderid);

  interface obj {
    foldername: string,
    parentid: string | null | undefined,
    path: string,
    childfolders: [string],
    childfiles: [string],
    Createdat: any,
    createdby: Number
  }
  interface folders {
    data: obj,
    uid: string
  }
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  const [count,setcount] = useState<number>(0)
  const [file, setfile] = useState<File | null>();
  const [loading, setloading] = useState<boolean>(false)
  const [folders, setfolders] = useState<Array<folders | DocumentData>>([{
    data: {
      foldername: "",
      parentid: "",
      childfolders: [""],
      childfiles: [""],
      path: "",
      Createdat: "",
      createdby: 0,
    },
    uid: ""
  }])
  // const value:string =  input
  // console.log("input"+"  "+ input);
  const handleclick = async (input: string) => {
    const state: obj = {
      foldername: input,
      parentid: folderid,
      path: "",
      childfolders: [""],
      childfiles: [""],
      Createdat: serverTimestamp(),
      createdby: auth.user.uid,
    }
    if (state.parentid === undefined) {
      state.parentid = null
    }

    const foldersref = await addDoc(collection(store, "folders"), {
      ...state
    })
    console.log(foldersref.id);
    // setfoldersref(foldersref.id);    
    // console.log(input);
    // console.log("clicked");
  }


  useEffect(() => {
    setfolders([])
    setloading(true)
    const getdata = async () => {
      try {
        if (folderid === undefined) {
          // console.log("here");

          const f = query(collection(store, "folders"), where('createdby', '==', auth.user.uid), where('parentid', '==', null))
          const querySnapshot = await getDocs(f)
          querySnapshot.forEach(q => {
            setfolders(prev => [...prev, { data: q.data(), uid: q.id }])
          })
          setloading(false)
        }
        else {
          const f = query(collection(store, "folders"), where('createdby', '==', auth.user.uid), where('parentid', '==', folderid))
          const querySnapshot = await getDocs(f)
          querySnapshot.forEach(q => {
            const s = {
              data: q.data(),
              uid: q.id
            }
            setfolders(prev => [...prev, s])
          })
          setloading(false)

        }
      }
      catch (error: unknown) {
        if (error instanceof FirebaseError) {
          console.log(error);

        }
      }
    }
    getdata()

  }, [folderid])
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setfile(e.target.files?.[0]);
  }
  const  handleupload = ()=>{
   setcount(prev=>prev+1)
  }
  useEffect(()=>{
      const uploadfile = async () => {

      if (folderid !== undefined) {
        const docref = doc(collection(store, "folders"), folderid)
        const data = await getDoc(docref);
        var info  = data.data();
        // console.log(info?.path);
        
      }
      const r = ref(storage, `${folderid === undefined ? "Root" : `/${info?.path}/${file?.name}`}`)
      uploadBytes(r, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
    uploadfile()
    },[folderid,count]);
    // const f = query(collection(store, "folders"),where('createdby', '==', auth.user.uid),where(d, '==', folderid))
  console.log(file);

  return (

    <>
      {
        loading ?
          <div>loading....</div>
          :
          <>
            <nav className="flex justify-around items-center my-5">
              <div className="font-Abel text-3xl">Dashboard</div>
              <h3 className="font-Abel text-2xl">{auth.user.email}</h3>
              <button className="logout underline font-Abel" onClick={() => {
                auth.logout().then((res: any) => {
                  console.log(res)
                }); navigate('/')
              }} >LOGOUT</button>
            </nav>
            <main>
              <nav className="foldernav">
                <Model btnText="createfolder" okBtn="save" closeBtn="cancel" modelText="create folder" onsave={handleclick} />
                <label className="relative">
                  <p className="border -2 border-blue-700 p-2 cursor-pointer absolute font-Abel uppercase -right-[20rem]">
                    choosefile
                  </p>
                  <input type="file" className="absolute right-[10000px]" onChange={handlechange} />
                </label>
                <button  onClick={handleupload}>upload</button>
              </nav>
              <Folders folder={folders} />

            </main >
          </>
      }
    </>
  )
}

export default Dashboard