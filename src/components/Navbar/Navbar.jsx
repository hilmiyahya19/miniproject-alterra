import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

function Navbar() {
 const location = useLocation();
 const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
                      <NavItem to="/favorite" currentPath={location.pathname}>Favorite</NavItem>
                      <NavItem to="/logout" currentPath={location.pathname}>Logout</NavItem> 
                   </>
                 ) : (
                    <>
                      <NavItem to="/home" currentPath={location.pathname}>Home</NavItem>
                      <NavItem to="/movie" currentPath={location.pathname}>Movie</NavItem>
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
                    <NavItem to="/favorite" currentPath={location.pathname}>Favorite</NavItem>
                    <NavItem to="/logout" currentPath={location.pathname}>Logout</NavItem> 
                 </>
                ) : (
                 <>
                    <NavItem to="/home" currentPath={location.pathname}>Home</NavItem>
                    <NavItem to="/movie" currentPath={location.pathname}>Movie</NavItem>
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

