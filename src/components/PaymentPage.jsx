import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentService from "./PaymentService";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(20);
  const [localPaymentData, setLocalPaymentData] = useState(null);

  const location = useLocation();
  const paymentData = location.state?.paymentData;

  useEffect(() => {

    console.log(paymentData)

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
      // eslint-disable-next-line
    }, 1000);

    const fetchPaymentStatus = async () => {
      console.log(paymentData.orderId);
      try {
        const paymentService = new PaymentService();
        if (paymentData?.orderId) {
          const result = await paymentService.checkTxnStatus(
            "i2ZxKJIljb0+XGmWttdP3F2U832t7HM9tVnAl+LDL5DlGne13/f5HRtPL3DhqAY6uheG0GFX4tuTIwyiI6CexZL4Dm20PqZa6G+9kRlcqCK8Bct+ZBxoCWmZ/tw41q3QwUiIee3lCSZyqX7hvt5dRiZ+EH9Aeq7L0Eysepxgko2Hi4NWJy6yDw5LqzkfW5hPhc/MO1QpreFH/99qh/vjnXzgy4pH32Bs9mo1PfosJ3eX0ceSyOb+dZUCIgpfVzznXN8GLWw0WAmFwA874GyF5Fo0JMwRsnStezgcbIxV+QT9QmzN0zz1n0zzTilA7mMhZp2hqtxGDYqSdhI6M/1NqQ==",
            paymentData.orderId
          );

          // console.log(result);
          if (!result || !result.data) {
            console.warn("Invalid API response:", result);
          }

          // Update payment data with the result
          setLocalPaymentData({
            status: result.data.status,
            orderId: result.data.orderId,
            identifire: result.data.identifire,
            amount: result.data.amount,
            rrn: result.data.rrn,
            responseCode: result.data.responseCode,
            payeeVpa: result.data.payeeVpa,
            date: result.data.date,
            time: result.data.time,
            remark: result.data.remark,
            qrString: result.data.qrString,
            companyName: result.data.companyName,
            logo: result.data.logo,
          });
        }
      } catch (error) {
        console.error("Error fetching transaction status:", error);
      }
    };

    // Call fetchPaymentStatus every 10 seconds
    const statusInterval = setInterval(() => {
      fetchPaymentStatus();
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
    // eslint-disable-next-line
  }, [paymentData.orderId]);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/home", { state: { localPaymentData } });
    }
    // eslint-disable-next-line
  }, [timeLeft, paymentData, navigate]);

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
            value={paymentData.qrString || ""}
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
