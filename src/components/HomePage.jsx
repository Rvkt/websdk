import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();
    const [paymentStatus] = useState(null);
    const [localPaymentData, setLocalPaymentData] = useState(null);
    const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

    const headerColor = localPaymentData?.status === "Success" ? "green" : localPaymentData?.status === "Failed" ? "red" : "#007BFF";


    useEffect(() => {
        // Check if the state is available and set paymentData
        if (location.state?.localPaymentData) {
            console.table(location.state.localPaymentData);
            setLocalPaymentData(location.state.localPaymentData);
            setShowDialog(true); // Show dialog when data is received
        }
        // eslint-disable-next-line

    }, [location.state]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {/* Card with Table to show payment details */}
            {localPaymentData && (
                <div
                    style={{
                        margin: "20px auto",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        width: "80%",
                        maxWidth: "600px",
                        backgroundColor: "#fff",
                    }}
                >
                    {/* Card Header */}
                    <div
                        style={{
                            backgroundColor: headerColor,
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "8px 8px 0 0",
                            textAlign: "center",
                        }}
                    >
                        <h2>Payment Details</h2>
                    </div>

                    {/* Table to show payment details */}
                    <table
                        style={{
                            marginTop: "0px",
                            borderCollapse: "collapse",
                            width: "100%",
                            borderRadius: "0px 0px 8px 8px",
                        }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                                    <strong>Status:</strong>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", }}>
                                    {localPaymentData.status}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                                    <strong>Order ID:</strong>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", }}>
                                    {localPaymentData.orderId}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                                    <strong>Amount:</strong>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", }}>
                                    ₹ {localPaymentData.amount}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                                    <strong>Date:</strong>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", }}>
                                    {localPaymentData.date}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                                    <strong>Time:</strong>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", }}>
                                    {localPaymentData.time}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                                    <strong>Remark:</strong>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "right", }}>
                                    {localPaymentData.remark}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HomePage;
