import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className='bg-white shadow-lg border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex-shrink-0'>
              <Link to='/' className='flex items-center'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3'>
                  <span className='text-red-500 text-3xl'>+</span>
                </div>
                <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                  SantéLink
                </span>
              </Link>
            </div>

            <div className='hidden md:flex items-center space-x-8'>
              <Link
                to='#'
                className='text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium'
              >
                About
              </Link>
              <Link
                to='#'
                className='text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium'
              >
                Services
              </Link>
              <Link
                to='#'
                className='text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium'
              >
                Contact
              </Link>
              <Link
                to='#'
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
              >
                Login
              </Link>
            </div>

            <div className='md:hidden'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <XMarkIcon className='w-6 h-6' />
                ) : (
                  <Bars3Icon className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        />

        <div
          className={`fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className='flex items-center justify-between p-6 border-b border-gray-200'>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3'>
                <span className='text-red-600 text-3xl'>+</span>
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                SantéLink
              </span>
            </div>
            <button
              onClick={closeMenu}
              className='text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
            >
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>

          <div className='py-6'>
            <div className='space-y-1'>
              <Link
                to='#'
                className='block px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium'
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                to='#'
                className='block px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium'
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                to='#'
                className='block px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium'
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>

            <div className='px-6 pt-6'>
              <Link
                to='#'
                className='block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md'
                onClick={closeMenu}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};
