import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();
    const [paymentStatus] = useState(null);
    const [localPaymentData, setLocalPaymentData] = useState(null);
    const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

    useEffect(() => {
        // Check if the state is available and set paymentData
        if (location.state?.localPaymentData) {
            console.table(location.state.localPaymentData);
            setLocalPaymentData(location.state.localPaymentData);
            setShowDialog(true); // Show dialog when data is received
        }
                // eslint-disable-next-line

    }, [location.state]);

    const closeDialog = () => {
        setShowDialog(false); // Close dialog
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Homepage</h1>
            {localPaymentData && (
                <p style={{ color: "green" }}>Payment Status: {localPaymentData.status}</p>
            )}
            {paymentStatus && (
                <p style={{ color: paymentStatus.startsWith("Success") ? "green" : "red" }}>
                    {paymentStatus}
                </p>
            )}

            {/* Dialog Box */}
            {showDialog && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "80%",
                            maxWidth: "400px",
                            textAlign: "center",
                        }}
                    >
                        <h2>Payment Details</h2>
                        <p><strong>Status:</strong> {localPaymentData.status}</p>
                        <p><strong>Order ID:</strong> {localPaymentData.orderId}</p>
                        <p><strong>Amount:</strong> ₹{localPaymentData.amount}</p>
                        <p><strong>Payee VPA:</strong> {localPaymentData.payeeVpa}</p>
                        <p><strong>Date:</strong> {localPaymentData.date}</p>
                        <p><strong>Time:</strong> {localPaymentData.time}</p>
                        <p><strong>Remark:</strong> {localPaymentData.remark}</p>
                        <button
                            onClick={closeDialog}
                            style={{
                                padding: "10px 20px",
                                marginTop: "20px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
