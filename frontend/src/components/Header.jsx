import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Watch, User, ShoppingBag, LogIn, LogOut, Home } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Watch className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">WatchStore</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile') 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/orders"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/orders') 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>My Orders</span>
                </Link>
                <Link
                  to="/purchase"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/purchase') 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Purchase</span>
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium text-white transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && (
          <div className="md:hidden pb-3">
            <div className="flex space-x-1">
              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/profile') ? 'bg-gray-700 text-white' : 'text-gray-300'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/orders"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/orders') ? 'bg-gray-700 text-white' : 'text-gray-300'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Orders</span>
              </Link>
              <Link
                to="/purchase"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/purchase') ? 'bg-gray-700 text-white' : 'text-gray-300'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Purchase</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;