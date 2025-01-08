import React, { useEffect, useState } from 'react';
import PaymentService from './PaymentService';
// import PaymentPage from './PaymentPage';
import { InitiateUpiTxnResponse } from './initiateUpiTxn';
import { useNavigate } from 'react-router-dom';

// MainApp component as the entry point of the SDK
const MainApp = ({ token, amount, remark, identifier, orderId, onSuccess, onFailure }) => {
  const [paymentData, setPaymentData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Format time to mm:ss format
  // const formatTime = (time) => {
  //   return `${Math.floor(time / 60)}:${time % 60}`;
  // };

  // Function to initiate payment
  const initiatePayment = async () => {
    try {
      setLoading(true);
      const service = new PaymentService();
      const response = await service.initiatePayment(token, amount, remark, identifier, orderId);
  
      // Log null first (for debugging purposes)
      console.log('Response:', response); // Logs the entire response object
      if (response.data === null) {
        console.error('Response data is null');
      } else {
        console.log('Response data:', response.data); // Log the actual response data
      }
  
      if (response.data === null) {
        // alert(response.message || 'Payment initiation failed');
        console.error(response.data);
      } else {
        const upiTxnResponse = InitiateUpiTxnResponse({
          amount: response.data.amount,
          companyName: response.data.companyName,
          identifire: response.data.identifire,
          orderId: response.data.orderId,
          qrString: response.data.qrString,
          logo: response.data.logo,
          raiseRequest: response.data.raiseRequest,
          remark: response.data.remark,
          sellerName: response.data.sellerName,
        });
  
        if (response.success) {
          setPaymentData(upiTxnResponse);
          setPaymentSuccess(true);
          if (onSuccess) {
            onSuccess(response.data); // Callback on success
          }
        } else {
          alert(response.message || 'Payment initiation failed');
          if (onFailure) {
            onFailure(response.message || 'Payment initiation failed'); // Callback on failure
          }
        }
      }
  
    } catch (error) {
      console.error('Payment initiation error:', error.message);
      alert('An error occurred while initiating the payment. Please try again.');
      if (onFailure) {
        onFailure(error.message); // Callback on failure
      }
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    initiatePayment();
    // eslint-disable-next-line
  }, []);

  // If payment is successful, render the payment page
  useEffect(() => {
    if (paymentSuccess && paymentData) {
      navigate('/payment', { state: { paymentData } });
    }
  }, [paymentSuccess, paymentData, navigate]);


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Initiate Payment</h1>
      <button onClick={initiatePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Initiate Payment'}
      </button>
    </div>
  );
};

export default MainApp;

