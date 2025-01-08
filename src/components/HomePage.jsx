import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();
    const [paymentStatus] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        // Check if the state is available and set paymentData
        if (location.state?.paymentData) {
            setPaymentData(location.state.paymentData);
        }
    }, [location.state]);

    // Log paymentData whenever it changes
    useEffect(() => {
        if (paymentData) {
            console.log(paymentData);
        }
    }, [paymentData]);

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
