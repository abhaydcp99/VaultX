import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LoanCardsPage = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loanDialog, setLoanDialog] = useState(false);
  const [cardDialog, setCardDialog] = useState(false);
  const [loanCalculator, setLoanCalculator] = useState({
    amount: "",
    tenure: "",
    rate: "",
  });

  const loans = [
    {
      id: 1,
      name: "Home Loan",
      icon: "🏠",
      rate: "8.5%",
      maxAmount: "₹1 Crore",
      tenure: "30 Years",
      description: "Make your dream home a reality with our competitive rates",
      features: ["No prepayment charges", "Quick approval", "Flexible EMI"],
      color: "bg-blue-600",
      eligibility: "Salary > ₹30,000/month",
      processing: "0.5% of loan amount",
    },
    {
      id: 2,
      name: "Car Loan",
      icon: "🚗",
      rate: "9.2%",
      maxAmount: "₹75 Lakhs",
      tenure: "7 Years",
      description: "Drive your dream car with instant approval",
      features: ["100% financing", "Zero down payment", "Quick disbursal"],
      color: "bg-red-600",
      eligibility: "Salary > ₹25,000/month",
      processing: "1% of loan amount",
    },
    {
      id: 3,
      name: "Education Loan",
      icon: "🎓",
      rate: "7.5%",
      maxAmount: "₹50 Lakhs",
      tenure: "15 Years",
      description: "Invest in your future with our education loans",
      features: [
        "Moratorium period",
        "Tax benefits",
        "No collateral up to ₹4L",
      ],
      color: "bg-green-600",
      eligibility: "Admission confirmed",
      processing: "₹5,000 flat",
    },
    {
      id: 4,
      name: "Business Loan",
      icon: "💼",
      rate: "11.5%",
      maxAmount: "₹2 Crores",
      tenure: "5 Years",
      description: "Grow your business with flexible funding solutions",
      features: [
        "Minimal documentation",
        "Quick approval",
        "Flexible repayment",
      ],
      color: "bg-purple-600",
      eligibility: "Business vintage > 2 years",
      processing: "2% of loan amount",
    },
  ];

  const creditCards = [
    {
      id: 1,
      name: "VaultX Premium",
      type: "Premium Card",
      annualFee: "₹5,000",
      rewards: "5x Rewards",
      description: "Premium lifestyle benefits with exclusive privileges",
      features: [
        "Airport lounge access",
        "Concierge services",
        "Travel insurance",
        "Golf privileges",
      ],
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      limit: "₹10 Lakhs",
      cashback: "5% on dining & entertainment",
    },
    {
      id: 2,
      name: "VaultX Travel",
      type: "Travel Card",
      annualFee: "₹2,500",
      rewards: "10x Miles",
      description: "Designed for frequent travelers and globetrotters",
      features: [
        "Zero forex markup",
        "Airline miles",
        "Hotel discounts",
        "Travel insurance",
      ],
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      limit: "₹5 Lakhs",
      cashback: "10x miles on travel bookings",
    },
    {
      id: 3,
      name: "VaultX Cashback",
      type: "Cashback Card",
      annualFee: "₹999",
      rewards: "5% Cashback",
      description: "Maximum cashback on your everyday purchases",
      features: [
        "5% cashback on groceries",
        "2% on online shopping",
        "1% on all spends",
        "No cashback cap",
      ],
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      limit: "₹3 Lakhs",
      cashback: "5% on groceries & fuel",
    },
    {
      id: 4,
      name: "VaultX Student",
      type: "Student Card",
      annualFee: "₹0",
      rewards: "2x Points",
      description: "Perfect starter card for students and young professionals",
      features: [
        "Zero annual fee",
        "Build credit history",
        "Student discounts",
        "Low interest rates",
      ],
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      limit: "₹1 Lakh",
      cashback: "2x points on online purchases",
    },
  ];

  const calculateEMI = () => {
    const { amount, tenure, rate } = loanCalculator;
    if (!amount || !tenure || !rate) return 0;

    const p = parseFloat(amount);
    const r = parseFloat(rate) / (12 * 100);
    const n = parseFloat(tenure) * 12;

    if (r === 0) return p / n;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const totalAmount =
    calculateEMI() * (parseFloat(loanCalculator.tenure) * 12 || 0);
  const totalInterest = totalAmount - (parseFloat(loanCalculator.amount) || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full blur-sm animate-pulse"></div>

          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
              Loans & Credit Cards
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock your financial potential with our comprehensive range of
              loans and premium credit cards designed for your success
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                ₹500Cr+
              </div>
              <div className="text-gray-600 font-medium">Loans Disbursed</div>
              <div className="text-2xl mt-2">📈</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                10L+
              </div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
              <div className="text-2xl mt-2">⭐</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                24 Hours
              </div>
              <div className="text-gray-600 font-medium">Quick Approval</div>
              <div className="text-2xl mt-2">⏰</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="loans" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm shadow-lg border border-blue-100 rounded-2xl p-2 max-w-md mx-auto">
            <TabsTrigger
              value="loans"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-semibold"
            >
              Loans
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-semibold"
            >
              Credit Cards
            </TabsTrigger>
            <TabsTrigger
              value="calculator"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-semibold"
            >
              Calculator
            </TabsTrigger>
          </TabsList>

          {/* Loans Tab */}
          <TabsContent value="loans">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  Choose Your Perfect Loan
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  From dream homes to career growth, we have the perfect loan
                  solution for every milestone in your journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {loans.map((loan) => (
                  <Card
                    key={loan.id}
                    className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 rounded-2xl overflow-hidden group"
                  >
                    <CardHeader className="pb-4 relative">
                      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

                      <div
                        className={`w-14 h-14 ${loan.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-2xl">{loan.icon}</span>
                      </div>

                      <CardTitle className="text-xl font-bold text-gray-800">
                        {loan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {loan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                          <span className="text-sm font-medium text-gray-600">
                            Interest Rate
                          </span>
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none shadow-sm">
                            From {loan.rate}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Max Amount
                          </span>
                          <span className="font-bold text-gray-800">
                            {loan.maxAmount}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Tenure</span>
                          <span className="font-bold text-gray-800">
                            Up to {loan.tenure}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          Key Features:
                        </h4>
                        {loan.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-green-600 text-lg">✓</span>
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg border-none py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                        onClick={() => {
                          setSelectedLoan(loan);
                          setLoanDialog(true);
                        }}
                      >
                        Apply Now →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Credit Cards Tab */}
          <TabsContent value="cards">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  Premium Credit Cards Collection
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Experience premium lifestyle with our range of credit cards
                  designed for every need and aspiration
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {creditCards.map((card) => (
                  <Card
                    key={card.id}
                    className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 rounded-2xl overflow-hidden"
                  >
                    <CardHeader className="p-0">
                      {/* Credit Card Visual */}
                      <div
                        className={`h-48 ${card.color} relative overflow-hidden flex flex-col justify-between p-6`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                        <div className="relative z-10">
                          <div className="text-white text-lg font-bold">
                            VaultX Bank
                          </div>
                          <div className="text-white/80 text-sm">
                            {card.type}
                          </div>
                        </div>

                        <div className="relative z-10 text-center">
                          <div className="text-white text-2xl font-bold mb-1">
                            {card.name}
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-5 bg-white/20 rounded"></div>
                            <div className="w-8 h-5 bg-white/30 rounded"></div>
                          </div>
                        </div>

                        <div className="absolute bottom-4 right-4">
                          <span className="text-white/60 text-3xl">💳</span>
                        </div>
                      </div>

                      <div className="p-6 pb-4">
                        <CardTitle className="flex justify-between items-start mb-2">
                          <span className="text-xl font-bold text-gray-800">
                            {card.name}
                          </span>
                          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-none">
                            ⭐ Premium
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {card.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl">
                          <span className="text-sm text-gray-600 font-medium block">
                            Annual Fee
                          </span>
                          <div className="font-bold text-gray-800 text-lg">
                            {card.annualFee}
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl">
                          <span className="text-sm text-gray-600 font-medium block">
                            Credit Limit
                          </span>
                          <div className="font-bold text-gray-800 text-lg">
                            {card.limit}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                        <div className="text-sm font-bold text-purple-800 mb-2 flex items-center">
                          🎁 Special Offer
                        </div>
                        <div className="text-sm text-purple-700 font-medium">
                          {card.cashback}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 text-sm flex items-center">
                          🛡️ Premium Benefits:
                        </h4>
                        {card.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-purple-600 text-lg">✨</span>
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg border-none py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                        onClick={() => {
                          setSelectedCard(card);
                          setCardDialog(true);
                        }}
                      >
                        Apply for Card 💳
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* EMI Calculator Tab */}
          <TabsContent value="calculator">
            <div className="max-w-5xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-100 shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 p-8 border-b border-blue-100">
                  <CardTitle className="flex items-center text-3xl font-bold text-gray-800">
                    <span className="text-4xl mr-3">🧮</span>
                    EMI Calculator
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg mt-2">
                    Calculate your loan EMI and plan your finances better with
                    our advanced calculator
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Input Section */}
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <Label className="text-lg font-semibold text-gray-800 flex items-center">
                          💰 Loan Amount (₹)
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter loan amount (e.g., 1000000)"
                          value={loanCalculator.amount}
                          onChange={(e) =>
                            setLoanCalculator((prev) => ({
                              ...prev,
                              amount: e.target.value,
                            }))
                          }
                          className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-lg font-semibold text-gray-800 flex items-center">
                          🎯 Interest Rate (% per annum)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Enter interest rate (e.g., 8.5)"
                          value={loanCalculator.rate}
                          onChange={(e) =>
                            setLoanCalculator((prev) => ({
                              ...prev,
                              rate: e.target.value,
                            }))
                          }
                          className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-lg font-semibold text-gray-800 flex items-center">
                          ⏰ Tenure (Years)
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter loan tenure (e.g., 20)"
                          value={loanCalculator.tenure}
                          onChange={(e) =>
                            setLoanCalculator((prev) => ({
                              ...prev,
                              tenure: e.target.value,
                            }))
                          }
                          className="text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-gradient-to-br from-blue-50/50 to-green-50/50 p-8 rounded-2xl border border-blue-100">
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                        🏆 Calculation Results
                      </h3>

                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">
                              Monthly EMI
                            </span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                              ₹{calculateEMI().toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">
                              Total Amount Payable
                            </span>
                            <span className="text-xl font-bold text-gray-800">
                              ₹{totalAmount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">
                              Total Interest
                            </span>
                            <span className="text-xl font-bold text-red-600">
                              ₹{totalInterest.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {calculateEMI() > 0 && (
                        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                          <div className="flex items-center space-x-3 text-green-800 mb-3">
                            <span className="text-green-600 text-2xl">✅</span>
                            <span className="font-bold text-lg">
                              EMI Calculated Successfully!
                            </span>
                          </div>
                          <p className="text-green-700 font-medium">
                            Your monthly EMI will be{" "}
                            <span className="font-bold">
                              ₹{calculateEMI().toLocaleString("en-IN")}
                            </span>{" "}
                            for{" "}
                            <span className="font-bold">
                              {loanCalculator.tenure} years
                            </span>
                          </p>

                          <div className="mt-4 p-4 bg-white/60 rounded-xl">
                            <div className="text-sm text-green-700">
                              <strong>Loan Breakdown:</strong> Principal ₹
                              {parseFloat(
                                loanCalculator.amount || 0
                              ).toLocaleString("en-IN")}{" "}
                              + Interest ₹
                              {totalInterest.toLocaleString("en-IN")} = Total ₹
                              {totalAmount.toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Loan Application Dialog */}
        <Dialog open={loanDialog} onOpenChange={setLoanDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-6">
              <DialogTitle className="flex items-center text-2xl font-bold text-gray-800">
                <span className="text-2xl mr-3">{selectedLoan?.icon}</span>
                Apply for {selectedLoan?.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-lg">
                Fill out this quick form to start your loan application. Our
                team will contact you within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  👤 Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      placeholder="Enter your full name"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      placeholder="Enter your phone number"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      placeholder="Enter your email address"
                      type="email"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  💰 Financial Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Loan Amount Required
                    </Label>
                    <Input
                      placeholder="Enter loan amount"
                      type="number"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Monthly Income
                    </Label>
                    <Input
                      placeholder="Enter monthly income"
                      type="number"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Employment Type
                    </Label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors bg-white">
                      <option>Salaried</option>
                      <option>Self Employed</option>
                      <option>Business Owner</option>
                      <option>Professional</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Work Experience
                    </Label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors bg-white">
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5+ years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Loan Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                  🛡️ {selectedLoan?.name} Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white/70 p-3 rounded-xl">
                    <div className="text-gray-600">Interest Rate</div>
                    <div className="font-bold text-blue-600">
                      {selectedLoan?.rate}
                    </div>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl">
                    <div className="text-gray-600">Max Amount</div>
                    <div className="font-bold text-green-600">
                      {selectedLoan?.maxAmount}
                    </div>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl">
                    <div className="text-gray-600">Eligibility</div>
                    <div className="font-bold text-gray-700">
                      {selectedLoan?.eligibility}
                    </div>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl">
                    <div className="text-gray-600">Processing Fee</div>
                    <div className="font-bold text-purple-600">
                      {selectedLoan?.processing}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setLoanDialog(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg border-none py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    setLoanDialog(false);
                    alert(
                      "Loan application submitted successfully! Our team will contact you within 24 hours."
                    );
                  }}
                >
                  Submit Application ✅
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Credit Card Application Dialog */}
        <Dialog open={cardDialog} onOpenChange={setCardDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-6">
              <DialogTitle className="flex items-center text-2xl font-bold text-gray-800">
                💳 Apply for {selectedCard?.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-lg">
                Complete your credit card application in just a few steps. Get
                approved instantly!
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  👤 Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      placeholder="Enter your full name"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      placeholder="Enter your phone number"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      placeholder="Enter your email address"
                      type="email"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  💰 Financial Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Annual Income
                    </Label>
                    <Input
                      placeholder="Enter annual income"
                      type="number"
                      className="p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      Employment Status
                    </Label>
                    <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors bg-white">
                      <option>Employed</option>
                      <option>Self Employed</option>
                      <option>Student</option>
                      <option>Business Owner</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card Benefits Summary */}
              <div
                className={`${selectedCard?.color} p-6 rounded-2xl text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                <h4 className="font-bold mb-4 text-xl">
                  💳 Card Benefits Summary
                </h4>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-white/80">Annual Fee</div>
                    <div className="font-bold text-lg">
                      {selectedCard?.annualFee}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/80">Credit Limit</div>
                    <div className="font-bold text-lg">
                      {selectedCard?.limit}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/80">Reward Rate</div>
                    <div className="font-bold text-lg">
                      {selectedCard?.rewards}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/80">Special Offer</div>
                    <div className="font-bold text-lg">
                      {selectedCard?.cashback}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCardDialog(false)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg border-none py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    setCardDialog(false);
                    alert(
                      "Credit card application submitted successfully! You will receive your card within 7-10 working days."
                    );
                  }}
                >
                  Submit Application ✅
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoanCardsPage;
