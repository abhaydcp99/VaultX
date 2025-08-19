// src/App.jsx
import React, { useState, createContext, useContext } from "react";
import {
  Shield,
  Users,
  Clock,
  CreditCard,
  PieChart,
  Smartphone,
  Lock,
  Award,
  Star,
  TrendingUp,
  UserCheck,
  Building2,
  Sparkles,
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  Calendar,
  Headphones,
  Globe,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  Menu,
  X,
  Home,
  Info,
  Contact,
  DollarSign,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Calculator,
  FileText,
  CreditCardIcon,
  Banknote,
  Percent,
  HandCoins,
  Car,
} from "lucide-react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Theme + Router Contexts
import { ThemeProvider } from "./context/ThemeContext";

import Router from "./context/RouterContext";

// Components
import AppNavbar from "./components/AppNavbar";
//import Navigation from "./components/Navigation";

// Public Pages
import VaultXAbout from "./pages/AboutUs";
import CustomerLogin from "./pages/LoginPage";
import CustomerRegister from "./pages/RegisterPage";
import LoanCardsPage from "./pages/LoansPage";
import VaultXContact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Payment from "./pages/Payment";
import CardsPage from "./pages/CardsPage";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ViewCustomers from "./pages/admin/ViewCustomers";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminAccountStatusPage from "./pages/admin/AdminAccountStatusPage";

// Clerk Pages
import ClerkDashboard from "./pages/clerk/ClerkDashboard";
import PendingKYCs from "./pages/clerk/PendingKYCs";
import VideoVerification from "./pages/clerk/VideoVerification";
import ClerkVideoKYC from "./pages/clerk/ClerkVideoKYC";

// Manager Pages
import ManagerDashboard from "./pages/manager/Dashboard";
import PendingKycReview from "./pages/manager/PendingKycReview";
import ApprovedKycs from "./pages/manager/ApprovedKycs";
import RejectedKycs from "./pages/manager/RejectedKycs";
import ManagerKycReview from "./pages/manager/ManagerKycReview";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ApplyKyc from "./pages/customer/ApplyKyc";
import ApprovedKyc from "./pages/customer/ApprovedKyc";
import AccountInfo from "./pages/customer/AccountInfo";
import Deposit from "./pages/customer/Deposit";
import Withdraw from "./pages/customer/Withdraw";
import Transfer from "./pages/customer/Transfer";
import CustomerVideoKYC from "./pages/customer/CustomerVideoKYC";
import TransactionHistory from "./pages/customer/TransactionHistory";

import UnauthorizedPage from "./pages/UnauthorizedPage";

// Main App Pages Renderer (Optional Navigation usage)
const VaultXApp = () => {
  return (
    <>
      <AppNavbar />
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/loans" element={<LoanCardsPage />} />
        <Route path="/about" element={<VaultXAbout />} />
        <Route path="/contact" element={<VaultXContact />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cards" element={<CardsPage />} />
        {/* ---------- Admin Routes ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-customers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ViewCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AuditLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/status-page"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAccountStatusPage />
            </ProtectedRoute>
          }
        />

        {/* ---------- Clerk Routes ---------- */}
        <Route
          path="/clerk"
          element={
            <ProtectedRoute allowedRoles={["CLERK"]}>
              <ClerkDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clerk/pending-kycs"
          element={
            <ProtectedRoute allowedRoles={["CLERK"]}>
              <PendingKYCs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clerk/kyc/:id"
          element={
            <ProtectedRoute allowedRoles={["CLERK"]}>
              <ClerkVideoKYC />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clerk/verify/:applicationId"
          element={
            <ProtectedRoute allowedRoles={["CLERK"]}>
              <VideoVerification />
            </ProtectedRoute>
          }
        />

        {/* ---------- Manager Routes ---------- */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/review-kycs"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <PendingKycReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/review-kyc/:id"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerKycReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/approved-kycs"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ApprovedKycs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/rejected-kycs"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <RejectedKycs />
            </ProtectedRoute>
          }
        />

        {/* ---------- Customer Routes ---------- */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/apply-kyc"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <ApplyKyc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/approved-kyc"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <ApprovedKyc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/account-info"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <AccountInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/deposit"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <Deposit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/withdraw"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <Withdraw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/transfer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <Transfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/video-kyc"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerVideoKYC />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/transactions"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </>
  );
};

// Root App Export with Theme & Router Context
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <BrowserRouter>
          <VaultXApp />
        </BrowserRouter>
      </Router>
    </ThemeProvider>
  );
}
