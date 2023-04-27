import React, { } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import router from './router/router.tsx'
import Authcontext from './context/Authcontext.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Protectedroute from './router/Protectedroute.tsx'
// import Authcontext from './context/Authcontext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <BrowserRouter>
      <Authcontext>
        <Routes>

          <Route path={'/'}
            element={
              (
                <Protectedroute>
                  <Dashboard />
                </Protectedroute>
              )}
          />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </Authcontext>
    </BrowserRouter>
  </React.StrictMode>

)
