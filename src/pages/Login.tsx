import { Link } from "react-router-dom"

const Login = () => {
    return (
        <aside className="flex justify-center items-center flex-col h-[100vh] gap-5 ">

            <form className="flex flex-wrap flex-col justify-between items-stretch w-fit gap-5 py-5 px-5 shadow-lg shadow-blue-700 ">
                <h3 className='text-3xl text-center'>LOGIN</h3>

                <div className="inputs flex gap-2 justify-between">
                    <span>username</span>
                    <input type="text" name="" id="" className="border-2 border-blue-700" />
                </div>
                <div className="inputs flex gap-2">
                    <span>password</span>
                    <input type="text" name="" id="" className="border-2 border-blue-700" />
                </div>
                <div className="btns flex flex-col gap-5 cursor-pointer">
                    <Link to='/Signup'>
                        <input type="submit" value="SIGNUP" className="border-2 border-blue-700 p-2 w-full cursor-pointer" />
                    </Link>
                    <Link to='/'>

                        <input type="submit" value="Login" className="border-2 border-blue-700 p-2 w-full cursor-pointer" />
                    </Link>
                </div>
            </form>
        </aside>
    )
}

export default Login