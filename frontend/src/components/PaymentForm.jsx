import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CreditCard, Lock } from 'lucide-react';

const PaymentForm = ({ order, onPaymentSuccess, onCancel }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setProcessing(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      
      // Create payment intent
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order._id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret, paymentIntentId } = await response.json();

      // Simulate payment processing (replace with actual Stripe integration)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Confirm payment
      const confirmResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentIntentId
        }),
      });

      if (!confirmResponse.ok) {
        throw new Error('Payment confirmation failed');
      }

      const result = await confirmResponse.json();
      onPaymentSuccess(result.order);

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <Lock className="h-6 w-6 text-green-500 mr-2" />
        <h3 className="text-xl font-semibold text-white">Secure Payment</h3>
      </div>

      <div className="mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Product:</span>
              <span className="text-white">{order.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quantity:</span>
              <span className="text-white">{order.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery:</span>
              <span className="text-white">{order.deliveryLocation}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-600">
              <span className="text-white font-semibold">Total:</span>
              <span className="text-green-400 font-bold">${order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 text-sm">
              Demo Payment - Click "Pay Now" to simulate payment
            </span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handlePayment}
            disabled={processing}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            {processing ? 'Processing...' : `Pay ${order.totalAmount}`}
          </button>
          <button
            onClick={onCancel}
            disabled={processing}
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;