import React from "react";
import { logout } from "../firebase/auth";
import { useHistory, Link } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

export const Header = () => {
  const history = useHistory();
  const { user } = useSession();
  const logoutUser = async () => {
    await logout();
    history.push("/login");
  };
  return (
    <header className='text-gray-500 bg-gray-900 body-font'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          to='/'
          className='flex title-font font-medium items-center text-white mb-4
          md:mb-0'
        >
          <img className='w-7' src='/logo.png' />
          <span className='ml-3 text-xl'>VB CMS</span>
        </Link>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          <Link to='/' className='mr-5 hover:text-white'>
            Dashboard
          </Link>
          <Link to='/' className='mr-5 hover:text-white'>
            Reports
          </Link>
          <Link to='/' className='mr-5 hover:text-white'>
            Hotspots
          </Link>
          <Link to='/' className='mr-5 hover:text-white'>
            Media
          </Link>
          <Link to='/' className='mr-5 hover:text-white'>
            Account
          </Link>
        </nav>
        {!!user && (
          <button
            onClick={logoutUser}
            className='inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0'
          >
            Logout
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-1'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};
