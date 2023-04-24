import {
    createBrowserRouter,
  } from "react-router-dom";
import App from '../pages/App'
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import Dashboard from "../pages/Dashboard";
import Protectedroute from "./Protectedroute";
const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<App/>
  },
  {
    path:'/Dashboard',
    element:(
      <Protectedroute>
            <Dashboard/>
      </Protectedroute>
    )
  },
  {
    path:'*',
    element:<Notfound/>
  }
])

export default router