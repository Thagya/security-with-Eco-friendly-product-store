import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { orderAPI, WATCH_PRODUCTS, ORDER_STATUS, formatDate } from '../utils';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Orders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      alert('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getWatchImage = (productName) => {
    const watch = WATCH_PRODUCTS.find(w => w.name === productName);
    return watch ? `/images/${watch.image}` : '/images/background.jpg';
  };

  const statusColor = (status) => {
    switch (status) {
      case ORDER_STATUS.PENDING: return 'text-yellow-400';
      case ORDER_STATUS.PROCESSING: return 'text-blue-400';
      case ORDER_STATUS.COMPLETED: return 'text-green-400';
      case ORDER_STATUS.CANCELLED: return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

          {loading ? (
            <div className="text-white">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-gray-300">No orders found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map(order => (
                <div key={order._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={getWatchImage(order.productName)}
                    alt={order.productName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-white">{order.productName}</h2>
                    <p className="text-gray-400">Quantity: {order.quantity}</p>
                    <p className="text-gray-400">Delivery: {order.deliveryLocation}</p>
                    <p className="text-gray-400">Date: {formatDate(order.purchaseDate)}</p>
                    <p className="font-bold text-green-400 mt-2">Total: ${order.totalAmount.toLocaleString()}</p>
                    <p className={`mt-2 font-semibold ${statusColor(order.status)}`}>
                      Status: {order.status}
                    </p>
                    {order.message && (
                      <p className="text-gray-300 mt-1 italic">"{order.message}"</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
