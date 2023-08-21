import { ReactElement, ReactNode, createContext, useState } from "react"


export const reloadcontext = createContext<any>({})
const Reloadcontext = ({children}:{children:ReactNode}):ReactElement => {
    const [reload,setreload] = useState<boolean>(false)
    const [loading,setloading] = useState<boolean>(false)

    const value = {
        reload:setreload,
        loading:setloading
    }
  return (
    <reloadcontext.Provider value = {value}>
        {children}
    </reloadcontext.Provider>
  )
}

export default Reloadcontext