import React, {  } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.tsx'
import Authcontext from './context/Authcontext.tsx'
// import Authcontext from './context/Authcontext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <React.StrictMode>
      <Authcontext>
        <RouterProvider router = {router}/>
      </Authcontext>
    </React.StrictMode>
   
)
