import { IoLogOut, IoSettings } from "react-icons/io5";
import { useAuth } from "../store/useAuth";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const { authUser , logout , isLoggingOut } = useAuth();

  const handleLogout = async ()=>{
    const isSure = confirm('are you sure ?')
    if (isSure){
      const res = await logout() 
      if (res.data.success){
        toast('logged out successfully' , {
          position: 'bottom-center'
        })
      }
    }
  }

  return (
    <div className="drawer drawer-end">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 dark:bg-base-200 shadow-md">
          <div className="navbar-start">
            <Link to={'/'} className="flex items-center gap-2">
              <img src="/logo/virvo.svg" alt="chatty logo" className="h-10" />
              <h2 className="text-lg font-bold text-primary">Chatty</h2>
            </Link>
          </div>
          <div className="navbar-end lg:hidden">
            <label htmlFor="navbar-drawer" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
          </div>
          <div className="navbar-end hidden lg:flex">
            {authUser ? (
              <div className="flex items-center gap-4">
                <Link to={'/profile'} className="btn rounded-md">
                  <FaUser className="text-xl -translate-y-[2px]" />
                  <span className="text-nowrap">Profile</span>
                </Link>
                <Link to={'/settings'} className="btn rounded-md">
                  <IoSettings className="text-xl" />
                  <span className="text-nowrap">Settings</span>
                </Link>
                <button className="btn rounded-md" onClick={()=>handleLogout()}>
                  <IoLogOut className="text-xl" />
                  <span className="text-nowrap">{isLoggingOut ? 'Logging Out ...' : 'Log Out'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={'/signin'} className="btn btn-primary">Sign In</Link>
                <Link to={'/signup'} className="btn btn-outline btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 dark:bg-base-200">
          {authUser ? (
            <>
              <li>
                <Link to="/profile" className="flex items-center gap-2">
                  <FaUser className="text-lg" /> Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center gap-2">
                  <IoSettings className="text-lg" /> Settings
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2">
                  <IoLogOut className="text-lg" /> Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin" className="btn btn-outline btn-primary w-full">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary w-full">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;