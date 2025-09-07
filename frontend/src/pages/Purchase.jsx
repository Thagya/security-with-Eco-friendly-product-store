import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { WATCH_PRODUCTS, SRI_LANKA_DISTRICTS, DELIVERY_TIMES, isValidPurchaseDate, getMinDate } from '../utils';
import { orderAPI } from '../utils';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Purchase = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    purchaseDate: '',
    deliveryTime: DELIVERY_TIMES[0],
    deliveryLocation: '',
    productName: '',
    quantity: 1,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedWatch = WATCH_PRODUCTS.find(w => w.name === formData.productName);
  const totalAmount = selectedWatch ? selectedWatch.price * formData.quantity : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, message } = isValidPurchaseDate(formData.purchaseDate);
    if (!valid) return alert(message);

    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await orderAPI.create({
        ...formData,
        totalAmount,
        username: user?.nickname || user?.email
      });
      setSuccess(true);
      setFormData({
        purchaseDate: '',
        deliveryTime: DELIVERY_TIMES[0],
        deliveryLocation: '',
        productName: '',
        quantity: 1,
        message: ''
      });
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to place order. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {success && (
            <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
              <h3 className="font-semibold">Order Placed Successfully!</h3>
              <p>Your watch will be delivered according to your preferences.</p>
            </div>
          )}

          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Purchase Watch</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Purchase Date */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Purchase Date *</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={e => setFormData({ ...formData, purchaseDate: e.target.value })}
                    min={getMinDate()}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-gray-400 text-xs mt-1">Sundays are not available for delivery</p>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Delivery Time *</label>
                  <select
                    value={formData.deliveryTime}
                    onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    {DELIVERY_TIMES.map(time => <option key={time} value={time}>{time}</option>)}
                  </select>
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Delivery Location *</label>
                  <select
                    value={formData.deliveryLocation}
                    onChange={e => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select District</option>
                    {SRI_LANKA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {/* Watch Model */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Watch Model *</label>
                  <select
                    value={formData.productName}
                    onChange={e => setFormData({ ...formData, productName: e.target.value })}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Watch</option>
                    {WATCH_PRODUCTS.map(w => (
                      <option key={w.id} value={w.name}>{w.name} - ${w.price}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Quantity *</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    min="1"
                    max="10"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Total Amount */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Total Amount</label>
                  <div className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-green-400 font-bold text-lg">
                    ${totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Special Message */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Special Message (Optional)</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Any special instructions for delivery..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  to="/orders"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Orders
                </Link>
                <button
                  type="submit"
                  disabled={loading || !selectedWatch}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {loading ? 'Processing...' : `Purchase for ${totalAmount.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Purchase;
