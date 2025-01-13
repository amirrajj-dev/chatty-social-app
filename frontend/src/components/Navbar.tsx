import { IoLogOut, IoSettings } from "react-icons/io5";
import { useAuth } from "../store/useAuth";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser } = useAuth();
  return (
    <div className="drawer drawer-end">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 dark:bg-base-200 shadow-md">
          <div className="navbar-start">
            <div className="flex items-center gap-2">
              <img src="/logo/virvo.svg" alt="chatty logo" className="h-10" />
              <h2 className="text-lg font-bold text-primary">Chatty</h2>
            </div>
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
                <Link to={'/profile'} className="btn">
                  <FaUser className="text-xl -translate-y-[2px]" />
                  <span className="badge badge-sm bg-transparent text-nowrap">Profile</span>
                </Link>
                <Link to={'/setings'} className="btn">
                  <IoSettings className="text-xl" />
                  <span className="badge badge-sm bg-transparent text-nowrap">Settings</span>
                </Link>
                <Link to={'/'} className="btn">
                  <IoLogOut className="text-xl" />
                  <span className="badge badge-sm bg-transparent text-nowrap">Log Out</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button className="btn btn-primary">Sign In</button>
                <button className="btn btn-outline btn-primary">Sign Up</button>
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
                <button className="flex items-center gap-2">
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