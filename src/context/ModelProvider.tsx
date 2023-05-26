import { ReactElement, createContext, useState} from "react"


interface obj{
    input:string|undefined,
    setinput: React.Dispatch<React.SetStateAction<string>>
}
export const Modelcontext = createContext<any>({})
const ModelProvider = ({children}:{children:ReactElement,inputval?:string}) => {
    const [input,setinput] =useState<string>("")
    const value:obj={
        setinput,
        input,
    }
    // console.log(input);
    
  return (
    <>
        <Modelcontext.Provider value= {value}>
            {children}
        </Modelcontext.Provider>
    </>
  )
}

export default ModelProvider