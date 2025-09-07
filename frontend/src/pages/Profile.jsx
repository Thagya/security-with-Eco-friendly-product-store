import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [getAccessTokenSilently]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 flex items-center space-x-4">
              <img
                src={user?.picture || "/src/images/background.jpg"}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                <p className="text-blue-100">{user?.email}</p>
              </div>
            </div>

            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Username</label>
                  <p className="text-white text-lg">{userProfile?.username || user?.nickname || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Full Name</label>
                  <p className="text-white text-lg">{user?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                  <p className="text-white text-lg">{user?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Contact Number</label>
                  <p className="text-white text-lg">{userProfile?.contactNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Country</label>
                  <p className="text-white text-lg">{userProfile?.country || 'Sri Lanka'}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Member Since</label>
                  <p className="text-white text-lg">{user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/purchase"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
