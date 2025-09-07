import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Star } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const featuredWatches = [
    { id: 1, name: "Rolex Submariner", price: "$8,500", image: "/src/images/watch1.jpg", rating: 4.9 },
    { id: 2, name: "Omega Speedmaster", price: "$5,200", image: "/src/images/watch2.jpg", rating: 4.8 },
    { id: 3, name: "Tag Heuer Formula 1", price: "$1,200", image: "/src/images/watch3.jpg", rating: 4.7 },
    { id: 4, name: "Seiko Prospex", price: "$350", image: "/src/images/watch4.jpg", rating: 4.5 },
    { id: 5, name: "Casio G-Shock", price: "$150", image: "/src/images/watch5.jpg", rating: 4.2 },
    { id: 6, name: "Apple Watch Series 9", price: "$400", image: "/src/images/watch6.jpg", rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/src/images/background.jpg')",
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Premium Watch Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Discover luxury timepieces with secure authentication and worldwide delivery
          </p>
          {isAuthenticated ? (
            <div className="space-x-4">
              <Link
                to="/purchase"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
              >
                Shop Now
              </Link>
              <Link
                to="/orders"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block border border-gray-600"
              >
                My Orders
              </Link>
            </div>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Login to Start Shopping
            </button>
          )}
        </div>
      </div>

      {/* Featured Watches Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Featured Collection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWatches.map((watch) => (
              <div key={watch.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={watch.image} alt={watch.name} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{watch.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-500">{watch.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-gray-400 ml-1">{watch.rating}</span>
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <Link
                      to="/purchase"
                      className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
                    >
                      Purchase Now
                    </Link>
                  ) : (
                    <button
                      onClick={() => loginWithRedirect()}
                      className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Login to Purchase
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
