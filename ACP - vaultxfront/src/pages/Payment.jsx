// PaymentPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Lock,
  Shield,
  Smartphone,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

// Add Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const { theme } = useTheme();
  const [paymentData, setPaymentData] = useState({
    amount: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    description: "",
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const getThemeClasses = (currentTheme) => {
    if (currentTheme === "dark") {
      return {
        pageBackground:
          "bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white",
        cardBackground: "bg-slate-800/50 backdrop-blur-sm border-slate-700",
        primaryText: "text-white",
        secondaryText: "text-slate-300",
        mutedText: "text-slate-400",
        accentGradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
        primaryButton:
          "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
        secondaryButton: "border-slate-600 text-slate-300 hover:bg-slate-800",
        inputBackground: "bg-slate-700/50 border-slate-600 text-white",
        highlightBackground: "bg-slate-800/70",
        errorText: "text-red-400",
      };
    } else {
      return {
        pageBackground:
          "bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50",
        cardBackground: "bg-white/80 backdrop-blur-sm border-slate-200",
        primaryText: "text-slate-800",
        secondaryText: "text-slate-600",
        mutedText: "text-slate-500",
        accentGradient: "bg-gradient-to-r from-blue-600 to-green-600",
        primaryButton:
          "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500",
        secondaryButton: "border-slate-300 text-slate-700 hover:bg-slate-50",
        inputBackground: "bg-white border-slate-300 text-slate-800",
        highlightBackground: "bg-blue-50",
        errorText: "text-red-600",
      };
    }
  };

  const themeClasses = getThemeClasses(theme);

  const createRazorpayOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: paymentData.amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await response.json();
      return orderData;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch("http://localhost:8080/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      const result = await response.text();
      return result;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true);
      setError("");

      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      // Create order
      const orderData = await createRazorpayOrder();

      const options = {
        key: "rzp_test_FD0lbeu7pDPNSH", // Your Razorpay key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Bank Payment System",
        description: paymentData.description || "Payment Transaction",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verificationResult = await verifyPayment(response);
            console.log("Payment verified:", verificationResult);

            // Show success
            setStep(4);
            setTimeout(() => {
              alert(
                `Payment successful! Transaction ID: ${response.razorpay_payment_id}`
              );
              setStep(1);
              setPaymentData({
                amount: "",
                recipientName: "",
                recipientEmail: "",
                recipientPhone: "",
                description: "",
              });
            }, 2000);
          } catch (error) {
            setError("Payment verification failed. Please contact support.");
            setStep(1);
          }
        },
        prefill: {
          name: paymentData.recipientName,
          email: paymentData.recipientEmail,
          contact: paymentData.recipientPhone,
        },
        theme: {
          color: theme === "dark" ? "#0891b2" : "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setStep(1);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
      setStep(1);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // Validate required fields
      if (
        !paymentData.amount ||
        !paymentData.recipientName ||
        !paymentData.recipientEmail
      ) {
        setError("Please fill in all required fields");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      await handleRazorpayPayment();
    }
  };

  const handleInputChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} pt-20`}>
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`inline-flex items-center space-x-2 ${themeClasses.cardBackground} rounded-full px-6 py-3 mb-6 border`}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              <span
                className={`${themeClasses.primaryText} text-sm font-medium`}
              >
                Secure Payment with Razorpay
              </span>
            </div>

            <h1
              className={`text-4xl md:text-6xl font-bold ${themeClasses.primaryText} mb-6`}
            >
              Make a
              <span
                className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block`}
              >
                Payment
              </span>
            </h1>

            <p
              className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            >
              Send money instantly and securely with Razorpay integration
            </p>
          </motion.div>

          <motion.div
            className={`border-0 shadow-2xl ${themeClasses.cardBackground} max-w-2xl mx-auto rounded-2xl overflow-hidden`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8">
              <div
                className={`text-2xl ${themeClasses.primaryText} flex items-center mb-8`}
              >
                <DollarSign className="w-6 h-6 mr-2" />
                {step === 1
                  ? "Payment Details"
                  : step === 2
                  ? "Confirm Payment"
                  : step === 3
                  ? "Processing..."
                  : "Payment Complete"}
              </div>

              {error && (
                <div
                  className={`mb-6 p-4 bg-red-100 border border-red-300 rounded-lg`}
                >
                  <p className={`${themeClasses.errorText} font-medium`}>
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText}`}
                        >
                          Amount (₹) *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100000"
                          value={paymentData.amount}
                          onChange={(e) =>
                            handleInputChange("amount", e.target.value)
                          }
                          placeholder="Enter amount"
                          required
                          className={`w-full px-4 py-4 ${themeClasses.inputBackground} border rounded-lg text-2xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText}`}
                        >
                          Recipient Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={paymentData.recipientName}
                            onChange={(e) =>
                              handleInputChange("recipientName", e.target.value)
                            }
                            placeholder="Enter recipient name"
                            required
                            className={`w-full pl-10 pr-4 py-3 ${themeClasses.inputBackground} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText}`}
                        >
                          Recipient Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={paymentData.recipientEmail}
                            onChange={(e) =>
                              handleInputChange(
                                "recipientEmail",
                                e.target.value
                              )
                            }
                            placeholder="Enter recipient email"
                            required
                            className={`w-full pl-10 pr-4 py-3 ${themeClasses.inputBackground} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText}`}
                        >
                          Recipient Phone (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={paymentData.recipientPhone}
                            onChange={(e) =>
                              handleInputChange(
                                "recipientPhone",
                                e.target.value
                              )
                            }
                            placeholder="Enter phone number"
                            className={`w-full pl-10 pr-4 py-3 ${themeClasses.inputBackground} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText}`}
                        >
                          Description (Optional)
                        </label>
                        <textarea
                          value={paymentData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Payment description or remarks"
                          rows={3}
                          className={`w-full px-4 py-3 ${themeClasses.inputBackground} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        className={`w-full ${themeClasses.primaryButton} text-white font-semibold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue to Payment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div
                      className={`p-6 ${themeClasses.highlightBackground} rounded-lg border`}
                    >
                      <h3
                        className={`text-lg font-semibold ${themeClasses.primaryText} mb-4`}
                      >
                        Payment Summary
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className={themeClasses.secondaryText}>
                            Amount:
                          </span>
                          <span
                            className={`font-bold text-2xl ${themeClasses.primaryText}`}
                          >
                            ₹{paymentData.amount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeClasses.secondaryText}>
                            To:
                          </span>
                          <span className={themeClasses.primaryText}>
                            {paymentData.recipientName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={themeClasses.secondaryText}>
                            Email:
                          </span>
                          <span className={themeClasses.primaryText}>
                            {paymentData.recipientEmail}
                          </span>
                        </div>
                        {paymentData.recipientPhone && (
                          <div className="flex justify-between">
                            <span className={themeClasses.secondaryText}>
                              Phone:
                            </span>
                            <span className={themeClasses.primaryText}>
                              {paymentData.recipientPhone}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className={themeClasses.secondaryText}>
                            Payment Method:
                          </span>
                          <span className={themeClasses.primaryText}>
                            Razorpay Gateway
                          </span>
                        </div>
                        {paymentData.description && (
                          <div className="flex justify-between">
                            <span className={themeClasses.secondaryText}>
                              Description:
                            </span>
                            <span className={themeClasses.primaryText}>
                              {paymentData.description}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <motion.button
                        type="button"
                        onClick={() => setStep(1)}
                        className={`flex-1 border ${themeClasses.secondaryButton} py-3 px-6 rounded-lg font-semibold transition-colors`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isProcessing}
                        className={`flex-1 ${themeClasses.primaryButton} text-white font-semibold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50`}
                        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      >
                        {isProcessing ? "Processing..." : "Pay with Razorpay"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className={`w-16 h-16 ${themeClasses.accentGradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: { duration: 1, repeat: Infinity },
                      }}
                    >
                      <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3
                      className={`text-xl font-semibold ${themeClasses.primaryText} mb-2`}
                    >
                      Initializing Razorpay...
                    </h3>
                    <p className={themeClasses.secondaryText}>
                      Please complete your payment in the Razorpay window
                    </p>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className={`w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3
                      className={`text-2xl font-semibold ${themeClasses.primaryText} mb-3`}
                    >
                      Payment Successful!
                    </h3>
                    <p className={`${themeClasses.secondaryText} mb-4`}>
                      ₹{paymentData.amount} has been successfully processed for{" "}
                      {paymentData.recipientName}
                    </p>
                    <div
                      className={`${themeClasses.highlightBackground} p-4 rounded-lg border`}
                    >
                      <p className={`text-sm ${themeClasses.mutedText}`}>
                        Transaction completed via Razorpay Gateway
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Razorpay Security",
                  description:
                    "Industry-standard encryption and PCI DSS compliance",
                },
                {
                  icon: Lock,
                  title: "Secure Processing",
                  description: "Multi-layer authentication and fraud detection",
                },
                {
                  icon: CheckCircle,
                  title: "Instant Confirmation",
                  description:
                    "Real-time payment verification and status updates",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`${themeClasses.cardBackground} border rounded-lg p-6 text-center`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-12 h-12 ${themeClasses.accentGradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className={`text-lg font-semibold ${themeClasses.primaryText} mb-2`}
                  >
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage;
