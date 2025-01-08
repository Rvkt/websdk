import React, { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
// import { InitiateUpiTxnResponse } from "./initiateUpiTxn";
// import PaymentService from "./PaymentService";


const HomePage = () => {
    // const navigate = useNavigate(); // Correct placement of useNavigate hook
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);

    const [paymentData, setPaymentData] = useState(null);
    // Access the data returned from the PaymentPage

    useEffect(() => {
        // Check if the state is available and set paymentData
        if (location.state?.paymentData) {
            setPaymentData(location.state.paymentData);
            setPaymentStatus(paymentData.message);
        }
    }, [location.state, paymentData.message]);



    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Homepage</h1>
            {paymentData && (
                <p style={{ color: "green" }}>Payment Status: {paymentData.status}</p>
            )}
            {paymentStatus && (
                <p style={{ color: paymentStatus.startsWith("Success") ? "green" : "red" }}>
                    {paymentStatus}
                </p>
            )}
        </div>
    );
};

export default HomePage;
