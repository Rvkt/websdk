import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentService from "./PaymentService";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(20);
  const { paymentData } = location.state || {};  // Fallback if state or result is undefined
  const [checkTxnData, setCheckTxnData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          // If timeLeft reaches 0, navigate to the home page
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    const fetchPaymentStatus = async () => {
      try {
        const paymentService = new PaymentService();
        if (paymentData?.orderId) {
          const result = await paymentService.checkTxnStatus(
            "i2ZxKJIljb0+XGmWttdP3F2U832t7HM9tVnAl+LDL5DlGne13/f5HRtPL3DhqAY6uheG0GFX4tuTIwyiI6CexZL4Dm20PqZa6G+9kRlcqCK8Bct+ZBxoCWmZ/tw41q3QwUiIee3lCSZyqX7hvt5dRiZ+EH9Aeq7L0Eysepxgko2Hi4NWJy6yDw5LqzkfW5hPhc/MO1QpreFH/99qh/vjnXzgy4pH32Bs9mo1PfosJ3eX0ceSyOb+dZUCIgpfVzznXN8GLWw0WAmFwA874GyF5Fo0JMwRsnStezgcbIxV+QT9QmzN0zz1n0zzTilA7mMhZp2hqtxGDYqSdhI6M/1NqQ==",
            paymentData.orderId
          );


          const paymentData = {
            status: result.data.status,
            orderId: result.data.orderId,
            identifire: result.data.identifire,
            amount: result.data.amount,
            rrn: result.data.rrn,
            responseCode: result.data.responseCode,
            payeeVpa: result.data.payeeVpa,
            date: result.data.date,
            time: result.data.time,
            remark: result.data.remark
          };


          setCheckTxnData(result.data);  // Update state with the transaction result
        }
      } catch (error) {
        console.error("Error fetching transaction status:", error);
      }
    };

    // Call fetchPaymentStatus every 10 seconds
    const statusInterval = setInterval(() => {
      fetchPaymentStatus();
    }, 10000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
  }, [paymentData?.orderId]);  // Removed navigate and checkTxnData from dependencies

  // Use a separate useEffect to log the checkTxnData whenever it changes
  useEffect(() => {
    if (checkTxnData) {
      console.table(checkTxnData);  // Log the updated checkTxnData
    }
  }, [checkTxnData]);

  // Use a separate useEffect to navigate after setting state
  useEffect(() => {
    if (timeLeft === 0) {
      // navigate("/home", { state: { checkTxnData } });
    }
  }, [timeLeft, checkTxnData, navigate]);  // Trigger navigation once state is updated and timeLeft reaches 0

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handlePaymentSuccess = () => {
    const paymentData = { status: "Success", transactionId: "12345" };
    navigate("/home", { state: { paymentData } });
  };

  const handlePaymentFailure = () => {
    const paymentData = { status: "Failed", transactionId: null };
    navigate("/", { state: { paymentData } });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Payment Page</h1>
          <p><strong>Order ID:</strong> {paymentData.orderId}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
            <img
              src={`data:image/png;base64,${paymentData.logo}`}
              alt="Company Logo"
              style={{ width: "36px", height: "36px" }}
            />
            <p style={{ marginLeft: "16px", fontWeight: "bold" }}>
              {paymentData.companyName}
            </p>
          </div>
          <QRCode
            value={paymentData.qrString}
            size={240}
            style={{ margin: "20px auto" }}
          />
          <p style={{ fontSize: "16px", marginBottom: "5px" }}>
            Scan the QR Code and pay <strong> ₹ {paymentData.amount}</strong> using apps enabled with UPI QR.
          </p>
          <p style={{ color: "#d32f2f", fontSize: "16px", marginBottom: "5px" }}>
            Approve payment within <b>{formatTime(timeLeft)}</b>
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Can't pay with UPI? <a href="#other-options">Choose other payment options</a>
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={handlePaymentSuccess}
          style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}
        >
          Simulate Success
        </button>
        <button
          onClick={handlePaymentFailure}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Simulate Failure
        </button>
      </div>
    </>
  );
};

export default PaymentPage;
