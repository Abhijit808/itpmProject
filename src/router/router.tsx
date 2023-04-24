import {
    createBrowserRouter,
  } from "react-router-dom";
import App from '../pages/App'
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
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
    path:'*',
    element:<Notfound/>
  }
])

export default router