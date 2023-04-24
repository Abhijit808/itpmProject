
import { useContext } from "react"
import { Authprovider } from "../context/Authcontext"
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useContext(Authprovider);
  return (
    <>
    <nav className="flex justify-around items-center my-5">
       <div className="font-Abel text-3xl">Dashboard</div>
       <button className="logout underline font-Abel" onClick={async()=>{await auth.logout(); navigate('/') }} >LOGOUT</button>
    </nav>
    <main>
      <h3>{auth.user.email}</h3>
    </main>
    </>
  )
}

export default Dashboard