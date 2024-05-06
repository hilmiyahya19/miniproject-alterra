import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NavItem from './NavItem';

function Navbar() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenAvatarDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAvatarDropdown = () => {
    setOpenAvatarDropdown(!openAvatarDropdown);
  };

  return (
    <>
      <header className="bg-gray-100 shadow-lg">
        <div className="mx-2 sm:mx-5 md:mx-5 lg:mx-5">
          <div className="container mx-auto flex justify-between items-center py-5">
            <div className="header-left">
              <h1 className='text-3xl text-blue-600 font-semibold'>Movie App</h1>
            </div>
            <div className="header-right md:text-center text-blue-600 mx-3 text-xl">
              <nav>
                <ul className="space-x-3 hidden md:flex lg:flex">
                 {isAuthenticated ? (
                    <>
                      <NavItem to="/dashboard" currentPath={location.pathname}>Dashboard</NavItem>
                      <NavItem to="/create" currentPath={location.pathname}>Create</NavItem>
                      <NavItem to="/update" currentPath={location.pathname}>Update</NavItem>
                      <NavItem to="/delete" currentPath={location.pathname}>Delete</NavItem>
                      <NavItem to="/logout" currentPath={location.pathname}>Logout</NavItem> 
                   </>
                 ) : (
                    <>
                      <NavItem to="/home" currentPath={location.pathname}>Home</NavItem>
                      <div ref={dropdownRef} onClick={toggleAvatarDropdown} className="relative transition-all duration-500">
                        <span className="cursor-pointer font-semibold">Movie</span>
                        <div className={`absolute ${openAvatarDropdown ? 'block' : 'hidden'} bg-slate-200 rounded shadow-lg mt-2 space-y-2 px-3`}>
                        <div className='p-4 flex flex-col text-slate-700'>
                          <NavLink to="/movie/popular" className="hover:text-blue-600">Popular</NavLink>
                          <NavLink to="/movie/now-playing" className="hover:text-blue-600">Now Playing</NavLink>
                          <NavLink to="/movie/upcoming" className="hover:text-blue-600">Upcoming</NavLink>
                          <NavLink to="/movie/top-rated" className="hover:text-blue-600">Top Rated</NavLink>
                        </div>
                      </div>
                      </div>
                      <NavItem to="/content" currentPath={location.pathname}>Content</NavItem>
                      <NavItem to="/chat" currentPath={location.pathname}>Chat</NavItem>
                      <NavItem to="/about" currentPath={location.pathname}>About</NavItem>
                      <NavItem to="/login" currentPath={location.pathname}>Login</NavItem>
                    </>
                 )}
                </ul>
                <button onClick={toggleMobileMenu} className="md:hidden lg:hidden">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
                </button>
              </nav>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden lg:hidden pb-4">
              <ul className="flex flex-col space-y-3">
                {isAuthenticated ? (
                 <>
                    <NavItem to="/dashboard" currentPath={location.pathname}>Dashboard</NavItem>
                    <NavItem to="/create" currentPath={location.pathname}>Create</NavItem>
                    <NavItem to="/update" currentPath={location.pathname}>Update</NavItem>
                    <NavItem to="/delete" currentPath={location.pathname}>Delete</NavItem>
                    <NavItem to="/logout" currentPath={location.pathname}>Logout</NavItem> 
                 </>
                ) : (
                 <>
                    <NavItem to="/home" currentPath={location.pathname}>Home</NavItem>
                    <div  ref={dropdownRef}onClick={toggleAvatarDropdown} className="relative transition-all duration-500">
                      <span className="cursor-pointer font-semibold">Movie</span>
                      <div className={`absolute ${openAvatarDropdown ? 'block' : 'hidden'} bg-slate-200 rounded shadow-lg mt-2 space-y-2`}>
                        <div className='p-4 flex flex-col text-slate-700'>
                          <NavLink to="/movie/popular" className="hover:text-blue-600">Popular</NavLink>
                          <NavLink to="/movie/now-playing" className="hover:text-blue-600">Now Playing</NavLink>
                          <NavLink to="/movie/upcoming" className="hover:text-blue-600">Upcoming</NavLink>
                          <NavLink to="/movie/top-rated" className="hover:text-blue-600">Top Rated</NavLink>
                        </div>
                      </div>
                    </div>
                    <NavItem to="/content" currentPath={location.pathname}>Content</NavItem>
                    <NavItem to="/chat" currentPath={location.pathname}>Chat</NavItem>
                    <NavItem to="/about" currentPath={location.pathname}>About</NavItem>
                    <NavItem to="/login" currentPath={location.pathname}>Login</NavItem>
                 </>
                )}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
 );
}

export default Navbar;

