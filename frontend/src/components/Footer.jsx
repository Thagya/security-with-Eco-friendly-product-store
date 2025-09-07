import React from 'react';
import { Link } from 'react-router-dom';
import { Watch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Watch className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold text-white">WatchStore</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium watches for every occasion. Secure, reliable, and stylish.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/purchase" className="text-gray-400 hover:text-white text-sm">Purchase</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-white text-sm">My Orders</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400 text-sm">Email: support@watchstore.com</span></li>
              <li><span className="text-gray-400 text-sm">Phone: +94 11 123 4567</span></li>
              <li><span className="text-gray-400 text-sm">Mon-Fri: 9AM-6PM</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 WatchStore. All rights reserved. | Secure & Authenticated
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;