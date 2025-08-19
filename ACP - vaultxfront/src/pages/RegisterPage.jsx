import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Upload,
  ChevronLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  UserCheck,
  Sparkles,
  Star,
  CheckCircle,
  Building2,
  Lock,
  Globe,
  Moon,
  Sun,
  Timer,
  Eye,
  EyeOff,
  AlertCircle,
  Home,
  Calendar,
  Users,
  Briefcase,
  X,
} from "lucide-react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("register"); // 'register' or 'login' or 'otp'
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [otp, setOtp] = useState("");
  const [developmentOtp] = useState("123456");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // Registration form data based on User.java entity
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneno: "",
    role: "CUSTOMER", // Default role
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    accountType: "",
    agreeTerms: false,
    agreeMarketing: false,
  });

  // Login credentials
  const [credentials, setCredentials] = useState({
    email: "",
    phone: "",
    password: "",
  });

  // Validation patterns
  const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    pincode: /^[1-9][0-9]{5}$/,
    name: /^[a-zA-Z\s]{2,30}$/,
  };

  // Validation functions
  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim())
          return `${field === "firstName" ? "First" : "Last"} name is required`;
        if (!validationPatterns.name.test(value))
          return "Name must be 2-30 characters, letters only";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!validationPatterns.email.test(value))
          return "Please enter a valid email address";
        return "";

      case "phoneno":
        if (!value.trim()) return "Phone number is required";
        if (!validationPatterns.phone.test(value))
          return "Enter valid 10-digit mobile number starting with 6-9";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (!validationPatterns.password.test(value))
          return "Password must be 8+ chars with uppercase, lowercase, number & special character";
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";

      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) return "You must be at least 18 years old";
        if (age > 100) return "Please enter a valid date of birth";
        return "";

      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 10)
          return "Address must be at least 10 characters";
        return "";

      case "city":
        if (!value.trim()) return "City is required";
        if (!validationPatterns.name.test(value))
          return "Please enter a valid city name";
        return "";

      case "state":
        if (!value) return "Please select a state";
        return "";

      case "pincode":
        if (!value.trim()) return "PIN code is required";
        if (!validationPatterns.pincode.test(value))
          return "Enter valid 6-digit PIN code";
        return "";

      case "accountType":
        if (!value) return "Please select an account type";
        return "";

      default:
        return "";
    }
  };

  const validateStep = (stepNumber) => {
    const stepFields = {
      1: ["firstName", "lastName", "email", "phoneno"],
      2: ["dateOfBirth", "address", "city", "state", "pincode"],
      3: ["accountType", "password", "confirmPassword"],
    };

    const errors = {};
    const fields = stepFields[stepNumber] || [];

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    if (stepNumber === 3 && !formData.agreeTerms) {
      errors.agreeTerms = "You must agree to terms and conditions";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    const error = validateField(field, formData[field]);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const nextStep = () => {
    if (validateStep(step) && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentPage("login");
      // Show success message
      setTimeout(() => {
        const successAlert = document.createElement("div");
        successAlert.className =
          "fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg";
        successAlert.innerHTML =
          "Registration successful! Please login to continue.";
        document.body.appendChild(successAlert);
        setTimeout(() => successAlert.remove(), 3000);
      }, 100);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (
        (loginMethod === "email" &&
          credentials.email &&
          credentials.password) ||
        (loginMethod === "phone" && credentials.phone && credentials.password)
      ) {
        setCurrentPage("otp");
        // Start OTP timer
        const timer = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert("Please fill all required fields");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (otp === developmentOtp || otp === "123456") {
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Login successful! Welcome to VaultX Dashboard!");
      }, 1500);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Invalid OTP. Use 123456 for testing.");
      }, 1500);
    }
  };

  const resendOtp = () => {
    setOtpTimer(120);
    alert(`Development Mode: Your OTP is ${developmentOtp}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const themeClasses = darkMode
    ? "dark bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50";

  // Animated background elements
  const backgroundElements = (
    <>
      <div
        className={`absolute top-20 left-10 w-32 h-32 ${
          darkMode ? "bg-blue-500/20" : "bg-blue-200/30"
        } rounded-full blur-3xl animate-pulse`}
      />
      <div
        className={`absolute bottom-20 right-10 w-40 h-40 ${
          darkMode ? "bg-purple-500/20" : "bg-green-200/30"
        } rounded-full blur-3xl animate-pulse`}
      />
      <div
        className={`absolute top-1/2 left-1/4 w-24 h-24 ${
          darkMode ? "bg-green-500/20" : "bg-purple-200/30"
        } rounded-full blur-3xl animate-pulse`}
      />
    </>
  );

  // Registration form steps content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Basic Information
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  onBlur={() => handleBlur("firstName")}
                  placeholder="Enter first name"
                  className={`transition-all duration-300 ${
                    fieldErrors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  } ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : ""
                  }`}
                />
                {fieldErrors.firstName && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{fieldErrors.firstName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  onBlur={() => handleBlur("lastName")}
                  placeholder="Enter last name"
                  className={`transition-all duration-300 ${
                    fieldErrors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  } ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : ""
                  }`}
                />
                {fieldErrors.lastName && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{fieldErrors.lastName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={darkMode ? "text-gray-200" : "text-slate-900"}
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Enter email address"
                className={`transition-all duration-300 ${
                  fieldErrors.email ? "border-red-500 focus:border-red-500" : ""
                } ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : ""
                }`}
              />
              {fieldErrors.email && (
                <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phoneno"
                className={darkMode ? "text-gray-200" : "text-slate-900"}
              >
                Mobile Number *
              </Label>
              <Input
                id="phoneno"
                type="tel"
                value={formData.phoneno}
                onChange={(e) => handleInputChange("phoneno", e.target.value)}
                onBlur={() => handleBlur("phoneno")}
                placeholder="Enter 10-digit mobile number"
                className={`transition-all duration-300 ${
                  fieldErrors.phoneno
                    ? "border-red-500 focus:border-red-500"
                    : ""
                } ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : ""
                }`}
              />
              {fieldErrors.phoneno && (
                <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.phoneno}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Personal & Address Details
              </h3>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateOfBirth"
                className={darkMode ? "text-gray-200" : "text-slate-900"}
              >
                Date of Birth *
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                onBlur={() => handleBlur("dateOfBirth")}
                className={`transition-all duration-300 ${
                  fieldErrors.dateOfBirth
                    ? "border-red-500 focus:border-red-500"
                    : ""
                } ${darkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
              />
              {fieldErrors.dateOfBirth && (
                <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.dateOfBirth}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className={darkMode ? "text-gray-200" : "text-slate-900"}
              >
                Address *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                onBlur={() => handleBlur("address")}
                placeholder="Enter complete address"
                className={`transition-all duration-300 ${
                  fieldErrors.address
                    ? "border-red-500 focus:border-red-500"
                    : ""
                } ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : ""
                }`}
              />
              {fieldErrors.address && (
                <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.address}</span>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  City *
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
                  placeholder="Enter city"
                  className={`transition-all duration-300 ${
                    fieldErrors.city
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  } ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : ""
                  }`}
                />
                {fieldErrors.city && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{fieldErrors.city}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="state"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  State *
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange("state", value)}
                >
                  <SelectTrigger
                    className={`transition-all duration-300 ${
                      fieldErrors.state
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    } ${
                      darkMode ? "bg-gray-800 border-gray-600 text-white" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent
                    className={darkMode ? "bg-gray-800 border-gray-600" : ""}
                  >
                    <SelectItem
                      value="maharashtra"
                      className={darkMode ? "text-white hover:bg-gray-700" : ""}
                    >
                      Maharashtra
                    </SelectItem>
                    <SelectItem
                      value="karnataka"
                      className={darkMode ? "text-white hover:bg-gray-700" : ""}
                    >
                      Karnataka
                    </SelectItem>
                    <SelectItem
                      value="delhi"
                      className={darkMode ? "text-white hover:bg-gray-700" : ""}
                    >
                      Delhi
                    </SelectItem>
                    <SelectItem
                      value="tamil-nadu"
                      className={darkMode ? "text-white hover:bg-gray-700" : ""}
                    >
                      Tamil Nadu
                    </SelectItem>
                    <SelectItem
                      value="gujarat"
                      className={darkMode ? "text-white hover:bg-gray-700" : ""}
                    >
                      Gujarat
                    </SelectItem>
                    <SelectItem
                      value="rajasthan"
                      className={darkMode ? "text-white hover:bg-gray-700" : ""}
                    >
                      Rajasthan
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.state && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{fieldErrors.state}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="pincode"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  PIN Code *
                </Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  onBlur={() => handleBlur("pincode")}
                  placeholder="6-digit PIN"
                  className={`transition-all duration-300 ${
                    fieldErrors.pincode
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  } ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : ""
                  }`}
                />
                {fieldErrors.pincode && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{fieldErrors.pincode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Account & Security Setup
              </h3>
            </div>

            <div className="space-y-2">
              <Label className={darkMode ? "text-gray-200" : "text-slate-900"}>
                Account Type *
              </Label>
              <RadioGroup
                value={formData.accountType}
                onValueChange={(value) =>
                  handleInputChange("accountType", value)
                }
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SAVINGS" id="savings" />
                  <Label
                    htmlFor="savings"
                    className={darkMode ? "text-gray-300" : "text-slate-600"}
                  >
                    Savings Account
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CURRENT" id="current" />
                  <Label
                    htmlFor="current"
                    className={darkMode ? "text-gray-300" : "text-slate-600"}
                  >
                    Current Account
                  </Label>
                </div>
              </RadioGroup>
              {fieldErrors.accountType && (
                <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.accountType}</span>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  Create Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => handleBlur("password")}
                    placeholder="Enter strong password"
                    className={`transition-all duration-300 pr-10 ${
                      fieldErrors.password
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    } ${
                      darkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {fieldErrors.password && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs animate-pulse">
                    <AlertCircle className="w-3 h-3" />
                    <span>{fieldErrors.password}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className={darkMode ? "text-gray-200" : "text-slate-900"}
                >
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Confirm password"
                    className={`transition-all duration-300 pr-10 ${
                      fieldErrors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    } ${
                      darkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {fieldErrors.confirmPassword && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span>{fieldErrors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`space-y-4 p-6 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <h4
                className={`font-semibold flex items-center space-x-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>Terms and Conditions</span>
              </h4>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeTerms", checked)
                  }
                />
                <Label
                  htmlFor="agreeTerms"
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  I agree to the{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    Privacy Policy
                  </span>
                </Label>
              </div>
              {fieldErrors.agreeTerms && (
                <div className="flex items-center space-x-1 text-red-500 text-sm animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.agreeTerms}</span>
                </div>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeMarketing", checked)
                  }
                />
                <Label
                  htmlFor="agreeMarketing"
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  I agree to receive promotional communications via email and
                  SMS (Optional)
                </Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // OTP Page
  if (currentPage === "otp") {
    return (
      <div className={`min-h-screen ${themeClasses} relative overflow-hidden`}>
        {backgroundElements}

        {/* Header */}
        <header
          className={`${
            darkMode
              ? "bg-gray-900/90 border-gray-700"
              : "bg-white/90 border-slate-200"
          } backdrop-blur-sm border-b sticky top-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setCurrentPage("login")}
                className={`flex items-center space-x-2 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-slate-700 hover:text-slate-500"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  VaultX
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={
                  darkMode ? "text-gray-300 hover:text-white" : "text-slate-700"
                }
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <Card
            className={`w-full max-w-md shadow-2xl border-0 ${
              darkMode ? "bg-gray-800/95" : "bg-white/95"
            } backdrop-blur-sm`}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className={`text-2xl ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Verify OTP
              </CardTitle>
              <CardDescription
                className={darkMode ? "text-gray-400" : "text-slate-600"}
              >
                We've sent a 6-digit verification code to{" "}
                <span className="font-medium text-blue-600">
                  {loginMethod === "email"
                    ? credentials.email
                    : credentials.phone}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="otp"
                    className={darkMode ? "text-gray-200" : "text-slate-900"}
                  >
                    Enter OTP
                  </Label>
                  <div className="flex justify-center">
                    <div className="flex space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Input
                          key={index}
                          type="text"
                          maxLength="1"
                          className={`w-12 h-12 text-center text-lg font-semibold transition-all duration-300 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : ""
                          }`}
                          value={otp[index] || ""}
                          onChange={(e) => {
                            const newOtp = otp.split("");
                            newOtp[index] = e.target.value;
                            setOtp(newOtp.join(""));

                            if (e.target.value && index < 5) {
                              const nextInput =
                                e.target.parentElement?.nextElementSibling?.querySelector(
                                  "input"
                                );
                              nextInput?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Backspace" &&
                              !otp[index] &&
                              index > 0
                            ) {
                              const prevInput =
                                e.target.parentElement?.previousElementSibling?.querySelector(
                                  "input"
                                );
                              prevInput?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    className={`mt-3 p-3 rounded-lg border ${
                      darkMode
                        ? "bg-green-900/30 border-green-800"
                        : "bg-green-50 border-green-200"
                    }`}
                  >
                    <p
                      className={`text-sm text-center flex items-center justify-center space-x-2 ${
                        darkMode ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        <strong>Development Mode:</strong> Use OTP{" "}
                        <code
                          className={`px-1 rounded font-mono ${
                            darkMode ? "bg-green-800" : "bg-green-200"
                          }`}
                        >
                          123456
                        </code>{" "}
                        for testing
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  {otpTimer > 0 ? (
                    <div
                      className={`flex items-center justify-center space-x-2 ${
                        darkMode ? "text-gray-400" : "text-slate-600"
                      }`}
                    >
                      <Timer className="w-4 h-4" />
                      <span className="text-sm">
                        Resend OTP in {formatTime(otpTimer)}
                      </span>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="link"
                      onClick={resendOtp}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg transition-all duration-300"
                  disabled={otp.length !== 6 || isSubmitting}
                  onClick={handleOtpVerification}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Login
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Login Page
  if (currentPage === "login") {
    return (
      <div className={`min-h-screen ${themeClasses} relative overflow-hidden`}>
        {backgroundElements}

        {/* Header */}
        <header
          className={`${
            darkMode
              ? "bg-gray-900/90 border-gray-700"
              : "bg-white/90 border-slate-200"
          } backdrop-blur-sm border-b sticky top-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  VaultX
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className={
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-slate-700"
                  }
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  New customer?
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage("register")}
                  className={`${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-slate-300 text-slate-700"
                  }`}
                >
                  Open Account
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <Badge
              className={`mb-4 ${
                darkMode
                  ? "bg-blue-900/50 text-blue-300 border-blue-800"
                  : "bg-blue-100 text-blue-800 border-blue-200"
              }`}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Customer Login
            </Badge>

            <h1
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Welcome Back to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
                VaultX Digital Banking
              </span>
            </h1>

            <p
              className={`text-lg max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Access your account securely and manage your finances with our
              advanced digital platform
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[calc(60vh)] px-4">
            <Card
              className={`w-full max-w-md shadow-2xl border-0 ${
                darkMode ? "bg-gray-800/95" : "bg-white/95"
              } backdrop-blur-sm`}
            >
              <CardHeader className="text-center">
                <CardTitle
                  className={`text-2xl flex items-center justify-center space-x-2 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <span>Welcome Back</span>
                </CardTitle>
                <CardDescription
                  className={darkMode ? "text-gray-400" : "text-slate-600"}
                >
                  Sign in to your VaultX account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={loginMethod}
                  onValueChange={setLoginMethod}
                  className="mb-6"
                >
                  <TabsList
                    className={`grid w-full grid-cols-2 ${
                      darkMode ? "bg-gray-700" : ""
                    }`}
                  >
                    <TabsTrigger
                      value="email"
                      className={`flex items-center space-x-2 ${
                        darkMode
                          ? "data-[state=active]:bg-gray-600 text-gray-300"
                          : ""
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="phone"
                      className={`flex items-center space-x-2 ${
                        darkMode
                          ? "data-[state=active]:bg-gray-600 text-gray-300"
                          : ""
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Mobile</span>
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleLogin} className="space-y-4 mt-6">
                    <TabsContent value="email" className="space-y-4 mt-0">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className={
                            darkMode ? "text-gray-200" : "text-slate-900"
                          }
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={credentials.email}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className={
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : ""
                          }
                          required
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-4 mt-0">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className={
                            darkMode ? "text-gray-200" : "text-slate-900"
                          }
                        >
                          Mobile Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your mobile number"
                          value={credentials.phone}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className={
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : ""
                          }
                          required
                        />
                      </div>
                    </TabsContent>

                    <div className="space-y-2">
                      <Label
                        htmlFor="loginPassword"
                        className={
                          darkMode ? "text-gray-200" : "text-slate-900"
                        }
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="loginPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          className={
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : ""
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        Forgot password?
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Tabs>

                <div className="mt-6 text-center">
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Don't have an account?{" "}
                    <span
                      className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => setCurrentPage("register")}
                    >
                      Open Account
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Registration Page (Main)
  return (
    <div className={`min-h-screen ${themeClasses} relative overflow-hidden`}>
      {backgroundElements}

      {/* Header */}
      <header
        className={`${
          darkMode
            ? "bg-gray-900/90 border-gray-700"
            : "bg-white/90 border-slate-200"
        } backdrop-blur-sm border-b sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <ChevronLeft
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-slate-700"
                }`}
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  VaultX
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={
                  darkMode ? "text-gray-300 hover:text-white" : "text-slate-700"
                }
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Need help?
              </span>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-slate-300 text-slate-700"
                }`}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <Badge
            className={`mb-4 ${
              darkMode
                ? "bg-blue-900/50 text-blue-300 border-blue-800"
                : "bg-blue-100 text-blue-800 border-blue-200"
            }`}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Create Your Account
          </Badge>

          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Join the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
              Digital Banking
            </span>
          </h1>

          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            Open your VaultX account in minutes and experience banking
            reimagined with cutting-edge technology
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm font-medium ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Step {step} of 3
            </span>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              {Math.round((step / 3) * 100)}% Complete
            </span>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-4">
            {[User, Home, Shield].map((Icon, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                    index + 1 <= step
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                      : darkMode
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs ${
                    index + 1 <= step
                      ? darkMode
                        ? "text-white"
                        : "text-slate-900"
                      : darkMode
                      ? "text-gray-500"
                      : "text-slate-400"
                  }`}
                >
                  {["Basic Info", "Address", "Security"][index]}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`w-full rounded-full h-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card
          className={`shadow-2xl border-0 ${
            darkMode ? "bg-gray-800/95" : "bg-white/95"
          } backdrop-blur-sm`}
        >
          <CardHeader className="text-center">
            <CardTitle
              className={`text-2xl flex items-center justify-center space-x-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span>Open Your Bank Account</span>
            </CardTitle>
            <CardDescription
              className={darkMode ? "text-gray-400" : "text-slate-600"}
            >
              Fill in the details below to start your banking journey with us
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className={`${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg transition-all duration-300"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg transition-all duration-300"
                    disabled={!formData.agreeTerms || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
