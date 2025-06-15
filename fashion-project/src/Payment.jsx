import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

// GPay logo URL (publicly available)
const GPAY_LOGO = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Pay_Logo.svg";
// Use a free QR code API for demonstration
const QR_TEXT = "welcome to fashionista";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(QR_TEXT)}`;

function Payment() {
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const price = location.state?.price || "";

  const handlePayNow = () => {
    setPaid(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="payment-bg">
      <div className="payment-card">
        <div className="payment-title-row">
          <h2 className="payment-title">UPI Payment</h2>
          <img src="data:image/png;base64,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" alt="GPay" className="gpay-logo" />
        </div>
        <div className="payment-qr-section">
          <img src={QR_URL} alt="UPI QR Code" className="payment-qr" />
          <div className="payment-qr-text">Scan this QR code with any UPI app</div>
        </div>
        {price && <div className="payment-price">Amount: <span>{price}</span></div>}
        {!paid ? (
          <button className="payment-pay-btn" onClick={handlePayNow}>Pay Now</button>
        ) : (
          <div className="payment-success">Payment Successful! Redirecting to Home...</div>
        )}
      </div>
    </div>
  );
}

export default Payment;
