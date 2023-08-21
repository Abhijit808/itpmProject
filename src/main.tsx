// import React, { } from 'react'
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import router from './router/router.tsx'
import Authcontext from "./context/Authcontext.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Protectedroute from "./router/Protectedroute.tsx";

// import Authcontext from './context/Authcontext.tsx'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Authcontext>
      <Routes>
        <Route
          path={"/"}
          element={
            <Protectedroute>
              <Dashboard />
            </Protectedroute>
          }
        />
        <Route
          path={"/folders/:folderid"}
          element={
            <Protectedroute>
              <Dashboard />
            </Protectedroute>
          }
        />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/Signup"} element={<Signup />} />
        <Route path={"*"} element={<div>404</div>} />
        <Route
          path={"/error"}
          element={
            <div className="w-[100vw] h-[100vh] text-3xl font-Abel flex justify-center items-center">
              Error
            </div>
          }
        />
      </Routes>
    </Authcontext>
  </BrowserRouter>
  // </React.StrictMode>
);
