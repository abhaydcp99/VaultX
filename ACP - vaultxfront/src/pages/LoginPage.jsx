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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  ChevronLeft,
  Mail,
  Phone,
  Lock,
  Timer,
  CheckCircle,
  UserCheck,
  Sparkles,
  ArrowRight,
  Building2,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";

const CustomerLogin = () => {
  const [loginStep, setLoginStep] = useState("credentials"); // 'credentials' | 'otp'
  const [loginMethod, setLoginMethod] = useState("email");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [developmentOtp] = useState("123456"); // Development OTP for testing
  const [credentials, setCredentials] = useState({
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    // Simulate registration success message
    const timer = setTimeout(() => {
      setShowSuccessMessage(true);
      setCredentials((prev) => ({ ...prev, email: "abhay@example.com" }));

      // Hide success message after 10 seconds
      setTimeout(() => setShowSuccessMessage(false), 10000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120); // 2 minutes

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login verification
      setTimeout(() => {
        setIsLoading(false);
        if (
          (loginMethod === "email" &&
            credentials.email &&
            credentials.password) ||
          (loginMethod === "phone" && credentials.phone && credentials.password)
        ) {
          setLoginStep("otp");
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
          alert(
            "Invalid credentials. Please check your email/phone and password."
          );
        }
      }, 1500);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      alert("Login failed. Please try again.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if OTP is correct (accept development OTP)
    if (otp === developmentOtp || otp === "123456") {
      setTimeout(() => {
        setIsLoading(false);
        alert("Login successful! Redirecting to dashboard...");
      }, 1500);
    } else {
      // Show error for wrong OTP
      setTimeout(() => {
        setIsLoading(false);
        alert("Invalid OTP. Use 123456 for testing or contact support.");
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

  if (loginStep === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl animate-pulse" />

        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setLoginStep("credentials")}
                className="flex items-center space-x-2 text-slate-700 hover:text-slate-500"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span className="text-xl font-bold text-slate-900">VaultX</span>
              </div>
              <div className="w-16" /> {/* Spacer for center alignment */}
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-900">
                Verify OTP
              </CardTitle>
              <CardDescription className="text-slate-600">
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
                  <Label htmlFor="otp" className="text-slate-900">
                    Enter OTP
                  </Label>
                  <div className="flex justify-center">
                    <div className="flex space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <Input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="w-12 h-12 text-center text-lg font-semibold"
                          value={otp[index] || ""}
                          onChange={(e) => {
                            const newOtp = otp.split("");
                            newOtp[index] = e.target.value;
                            setOtp(newOtp.join(""));

                            // Auto-focus next input
                            if (e.target.value && index < 5) {
                              const nextInput =
                                e.target.parentElement?.nextElementSibling?.querySelector(
                                  "input"
                                );
                              nextInput?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace
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

                  {/* Development Mode Helper */}
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-center flex items-center justify-center space-x-2 text-green-700">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        <strong>Development Mode:</strong> Use OTP{" "}
                        <code className="bg-green-200 px-1 rounded font-mono">
                          123456
                        </code>{" "}
                        for testing
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  {otpTimer > 0 ? (
                    <div className="flex items-center justify-center space-x-2 text-slate-600">
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
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                  disabled={otp.length !== 6 || isLoading}
                  onClick={handleOtpVerification}
                >
                  {isLoading ? (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-5 h-5 text-slate-700" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span className="text-xl font-bold text-slate-900">VaultX</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">New customer?</span>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700"
              >
                Open Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-8">
            <Alert className="bg-green-50 border border-green-200 max-w-md mx-auto">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Registration Successful!</strong> Your application has
                been submitted. You can now login to track your application
                status.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <UserCheck className="w-4 h-4 mr-2" />
            Customer Login
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Welcome Back to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
              VaultX Digital Banking
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Access your account securely and manage your finances with our
            advanced digital platform
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[calc(60vh)] px-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-slate-900 flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span>Welcome Back</span>
              </CardTitle>
              <CardDescription className="text-slate-600">
                Sign in to your VaultX account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs
                value={loginMethod}
                onValueChange={setLoginMethod}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="email"
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="phone"
                    className="flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Mobile</span>
                  </TabsTrigger>
                </TabsList>

                <div onSubmit={handleLogin} className="space-y-4 mt-6">
                  <TabsContent value="email" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-900">
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
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-900">
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
                        required
                      />
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-900">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
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
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                    disabled={isLoading}
                    onClick={handleLogin}
                  >
                    {isLoading ? (
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
                </div>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
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
};

export default CustomerLogin;
