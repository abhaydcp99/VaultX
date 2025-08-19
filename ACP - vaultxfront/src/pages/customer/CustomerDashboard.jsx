import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Shield,
  Eye,
  EyeOff,
  Send,
  Download,
  History,
  CreditCard,
  PieChart,
  Bell,
  Settings,
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Smartphone,
  Zap,
  Users,
  Wallet,
  TrendingUp,
  Gift,
  Banknote,
  FileText,
  CheckCircle,
  Minus,
  Clock,
  AlertCircle,
  UserCheck,
  Video,
  Lock,
  User,
} from "lucide-react";

const CustomerDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [canPerformOperations, setCanPerformOperations] = useState(true);
  const [transferDialog, setTransferDialog] = useState(false);
  const [addMoneyDialog, setAddMoneyDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);

  const [transferData, setTransferData] = useState({
    amount: "",
    recipient: "",
    note: "",
  });

  const [moneyAmount, setMoneyAmount] = useState("");
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      type: "credit",
      description: "Initial Deposit",
      amount: 50000,
      date: "2024-01-15",
      balance: 125000,
    },
    {
      id: 2,
      type: "debit",
      description: "Online Purchase",
      amount: 2500,
      date: "2024-01-14",
      balance: 122500,
    },
    {
      id: 3,
      type: "credit",
      description: "Salary Credit",
      amount: 75000,
      date: "2024-01-01",
      balance: 125000,
    },
  ]);

  const [application] = useState({
    personalInfo: {
      firstName: "Abhay",
      lastName: "Chavan",
    },
    contactInfo: {
      email: "abhay@example.com",
      phone: "+91 9876543210",
    },
    accountNumber: "VLTX123456789",
    balance: 125000,
    accountInfo: {
      accountType: "savings",
    },
    status: "approved",
    submittedDate: "2024-01-15",
    approvalDate: "2024-01-16",
  });

  const [profilePhoto] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  );

  const handleTransfer = () => {
    const amount = parseFloat(transferData.amount);
    if (amount && amount > 0 && amount <= application.balance) {
      const newTransaction = {
        id: Date.now(),
        type: "debit",
        description: `Transfer to ${transferData.recipient}`,
        amount: amount,
        date: new Date().toISOString().split("T")[0],
        balance: application.balance - amount,
      };
      setRecentTransactions((prev) => [newTransaction, ...prev]);

      setTransferDialog(false);
      setTransferData({ amount: "", recipient: "", note: "" });
      alert(`₹${amount.toLocaleString()} transferred successfully!`);
    } else {
      alert("Invalid amount or insufficient balance!");
    }
  };

  const handleAddMoney = () => {
    const amount = parseFloat(moneyAmount);
    if (amount && amount > 0) {
      const newTransaction = {
        id: Date.now(),
        type: "credit",
        description: "Money Added to Account",
        amount: amount,
        date: new Date().toISOString().split("T")[0],
        balance: application.balance + amount,
      };
      setRecentTransactions((prev) => [newTransaction, ...prev]);

      setAddMoneyDialog(false);
      setMoneyAmount("");
      alert(`₹${amount.toLocaleString()} added successfully!`);
    } else {
      alert("Please enter a valid amount!");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(moneyAmount);
    if (amount && amount > 0 && amount <= application.balance) {
      const newTransaction = {
        id: Date.now(),
        type: "debit",
        description: "Cash Withdrawal",
        amount: amount,
        date: new Date().toISOString().split("T")[0],
        balance: application.balance - amount,
      };
      setRecentTransactions((prev) => [newTransaction, ...prev]);

      setWithdrawDialog(false);
      setMoneyAmount("");
      alert(`₹${amount.toLocaleString()} withdrawn successfully!`);
    } else {
      alert("Invalid amount or insufficient balance!");
    }
  };

  const downloadStatement = () => {
    const statementContent = `
VaultX Bank Statement
Account: ${application.accountNumber}
Name: ${application.personalInfo.firstName} ${application.personalInfo.lastName}
Balance: ₹${application.balance.toLocaleString()}

Recent Transactions:
${recentTransactions
  .map(
    (t) =>
      `${t.date}: ${t.description} - ${
        t.type === "credit" ? "+" : "-"
      }₹${t.amount.toLocaleString()}`
  )
  .join("\n")}
    `;

    const blob = new Blob([statementContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vaultx-statement.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getKYCStatusInfo = () => {
    return {
      status: "Approved",
      description:
        "Your account has been approved! You can now perform all banking operations.",
      color: "green",
      nextStep: "All banking features are now available",
    };
  };

  const kycInfo = getKYCStatusInfo();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #06b6d4 50%, #10b981 75%, #059669 100%)",
      }}
    >
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">₹</span>
              </div>
              <span className="text-xl font-bold text-white">VaultX</span>
              <span className="text-white/80 text-sm">Customer Portal</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-sm text-white/80">
                  Welcome, {application.personalInfo.firstName}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  alert("Logged out successfully!");
                }}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Account Balance */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-600 text-sm">Account Balance</p>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-3xl font-bold text-slate-900">
                      {showBalance
                        ? `₹${application.balance.toLocaleString()}`
                        : "••••••••"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-slate-600 hover:bg-slate-100"
                    >
                      {showBalance ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Account: {application.accountNumber}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white border-0 w-full h-10 text-xs"
                  onClick={() => setAddMoneyDialog(true)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  <span className="truncate">Add Money</span>
                </Button>

                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white border-0 w-full h-10 text-xs"
                  onClick={() => setWithdrawDialog(true)}
                >
                  <Minus className="w-3 h-3 mr-1" />
                  <span className="truncate">Withdraw</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* KYC Status */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">KYC Status</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-xl font-bold text-slate-900">
                      Approved
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Verification complete
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* This Month */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">This Month</p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {recentTransactions.length}
                  </h3>
                  <p className="text-slate-500 text-sm">Total transactions</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          {/* Account Type */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Account Type</p>
                  <h3 className="text-2xl font-bold text-slate-900 capitalize">
                    {application.accountInfo.accountType}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {application.accountInfo.accountType === "savings"
                      ? "Savings Account"
                      : "Current Account"}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid md:grid-cols-6 gap-4">
            {[
              {
                icon: Send,
                label: "Fund Transfer",
                action: () => setTransferDialog(true),
              },
              {
                icon: Download,
                label: "Statements",
                action: downloadStatement,
              },
              {
                icon: Plus,
                label: "Add Money",
                action: () => setAddMoneyDialog(true),
              },
              {
                icon: CreditCard,
                label: "Apply Cards",
                action: () => alert("Card application submitted!"),
              },
              {
                icon: Smartphone,
                label: "Recharge",
                action: () => alert("Recharge feature coming soon!"),
              },
              {
                icon: PieChart,
                label: "Investments",
                action: () => alert("Investment options available!"),
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white/95"
                onClick={item.action}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-sm">{item.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="bg-white/90">
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            <TabsTrigger value="kyc">KYC Status</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "credit"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-600">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          Bal: ₹{transaction.balance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>KYC Verification Status</CardTitle>
                <CardDescription>
                  Track your account verification progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Documents Submitted</span>
                      <span className="text-xs text-gray-500">
                        ({application.submittedDate})
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        Video KYC Verification
                      </span>
                      <span className="text-xs text-gray-500">
                        ({application.approvalDate})
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Manager Approval</span>
                      <span className="text-xs text-gray-500">
                        ({application.approvalDate})
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Current Status
                    </h4>
                    <p className="text-green-700">{kycInfo.description}</p>
                    <p className="text-sm text-green-600 mt-2">
                      <strong>Next Step:</strong> {kycInfo.nextStep}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-white/95">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your account and personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Personal Information</h4>
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                      />
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong>{" "}
                          {application.personalInfo.firstName}{" "}
                          {application.personalInfo.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          {application.contactInfo.email}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {application.contactInfo.phone}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> 1990-01-01
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Account Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Account Type:</strong>{" "}
                        {application.accountInfo.accountType}
                      </p>
                      <p>
                        <strong>Account Number:</strong>{" "}
                        {application.accountNumber}
                      </p>
                      <p>
                        <strong>IFSC Code:</strong> VLTX0001234
                      </p>
                      <p>
                        <strong>Branch:</strong> Main Branch
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <Dialog open={transferDialog} onOpenChange={setTransferDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fund Transfer</DialogTitle>
              <DialogDescription>
                Transfer money to another account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Recipient Account</Label>
                <Input
                  placeholder="Enter account number"
                  value={transferData.recipient}
                  onChange={(e) =>
                    setTransferData((prev) => ({
                      ...prev,
                      recipient: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={transferData.amount}
                  onChange={(e) =>
                    setTransferData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
                <p className="text-xs text-slate-600 mt-1">
                  Available balance: ₹{application.balance.toLocaleString()}
                </p>
              </div>
              <div>
                <Label>Note</Label>
                <Input
                  placeholder="Transfer note"
                  value={transferData.note}
                  onChange={(e) =>
                    setTransferData((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setTransferDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleTransfer} className="flex-1">
                  Transfer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={addMoneyDialog} onOpenChange={setAddMoneyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money</DialogTitle>
              <DialogDescription>Add money to your account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setAddMoneyDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMoney}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Add Money
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Money</DialogTitle>
              <DialogDescription>
                Withdraw money from your account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                />
                <p className="text-xs text-slate-600 mt-1">
                  Available balance: ₹{application.balance.toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setWithdrawDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleWithdraw}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerDashboard;
