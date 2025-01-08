import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const PaymentPage = () => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Payment</h1>
      <QRCode
        value="upi://pay?pa=example@upi&pn=Example%20Merchant&am=442.50&cu=INR"
        size={180}
        style={{ margin: "20px auto" }}
      />
      <div style={{ marginBottom: "10px", fontSize: "14px", color: "#555" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/UPI-Logo-vector.svg"
          alt="UPI Apps Supported"
          style={{ height: "20px", verticalAlign: "middle", marginRight: "5px" }}
        />
        100+ UPI Apps supported
      </div>
      <p style={{ fontSize: "16px", marginBottom: "5px" }}>
        Scan the QR Code and pay ₹442.50 using apps enabled with UPI QR.
      </p>
      <p style={{ color: "#d32f2f", fontSize: "16px", marginBottom: "5px" }}>
        Approve payment within <b>{formatTime(timeLeft)}</b>
      </p>
      <p style={{ fontSize: "14px", color: "#555" }}>
        Can't pay with UPI? <a href="#other-options">Choose other payment options</a>
      </p>
    </div>
  );
};

export default PaymentPage;
