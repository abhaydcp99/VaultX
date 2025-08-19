import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
  Calendar,
  Headphones,
  Globe,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";

const VaultXContact = () => {
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getThemeClasses = () => {
    if (theme === "dark") {
      return {
        pageBackground:
          "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        headerBackground: "bg-slate-900/80 border-slate-700 backdrop-blur-xl",
        cardBackground: "bg-slate-800/80 border-slate-700 backdrop-blur-xl",
        featureBackground: "bg-slate-800/50 backdrop-blur-sm",
        ctaBackground:
          "bg-gradient-to-r from-blue-600 via-purple-600 to-green-600",
        primaryText: "text-white",
        secondaryText: "text-slate-300",
        mutedText: "text-slate-400",
        accentGradient: "bg-gradient-to-r from-blue-500 to-green-500",
        primaryButton:
          "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg hover:shadow-xl",
        secondaryButton:
          "border-slate-400 text-slate-200 hover:bg-slate-800/50 backdrop-blur-sm",
        inputBackground:
          "bg-slate-800/80 border-slate-600 text-white backdrop-blur-sm",
        floatingElements: [
          "bg-blue-400/20",
          "bg-green-400/20",
          "bg-purple-400/20",
        ],
      };
    }
    return {
      pageBackground: "bg-gradient-to-br from-blue-50 via-white to-green-50",
      headerBackground: "bg-white/80 border-gray-200 backdrop-blur-xl",
      cardBackground: "bg-white/80 border-gray-200 backdrop-blur-xl",
      featureBackground: "bg-gray-50/50 backdrop-blur-sm",
      ctaBackground:
        "bg-gradient-to-r from-blue-600 via-purple-600 to-green-600",
      primaryText: "text-gray-900",
      secondaryText: "text-gray-600",
      mutedText: "text-gray-500",
      accentGradient: "bg-gradient-to-r from-blue-500 to-green-500",
      primaryButton:
        "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg hover:shadow-xl",
      secondaryButton:
        "border-gray-300 text-gray-700 hover:bg-gray-50/80 backdrop-blur-sm",
      inputBackground:
        "bg-white/80 border-gray-300 text-gray-900 backdrop-blur-sm",
      floatingElements: [
        "bg-blue-200/40",
        "bg-green-200/40",
        "bg-purple-200/40",
      ],
    };
  };

  const themeClasses = getThemeClasses();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: [
        "CDAC Mumbai",
        "Pune University Campus",
        "Ganeshkhind, Pune - 411007",
        "Maharashtra, India",
      ],
      color: "from-blue-500 to-cyan-500",
      animation: "hover:rotate-12 hover:scale-110",
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: [
        "+91 1800-VAULTX-1",
        "+91 20-2570-4000",
        "24/7 Customer Support",
        "Emergency Helpline",
      ],
      color: "from-green-500 to-emerald-500",
      animation: "hover:bounce",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: [
        "support@vaultx.com",
        "business@vaultx.com",
        "careers@vaultx.com",
        "press@vaultx.com",
      ],
      color: "from-purple-500 to-pink-500",
      animation: "hover:pulse hover:scale-105",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
        "24/7 Online Banking",
      ],
      color: "from-orange-500 to-red-500",
      animation: "hover:wiggle",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create sparkle effect
    const sparkles = document.createElement("div");
    sparkles.className = "fixed inset-0 pointer-events-none z-50";
    sparkles.innerHTML = Array(20)
      .fill(0)
      .map(
        () =>
          `<div class="absolute animate-ping" style="left: ${
            Math.random() * 100
          }%; top: ${Math.random() * 100}%; animation-delay: ${
            Math.random() * 2
          }s;">⭐</div>`
      )
      .join("");
    document.body.appendChild(sparkles);

    setTimeout(() => document.body.removeChild(sparkles), 3000);

    alert(
      "🎉 Thank you for your message! We will get back to you within 24 hours."
    );
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "What are your customer support hours?",
      answer:
        "Our customer support is available 24/7 for all your banking needs. You can reach us via phone, email, or live chat.",
      icon: Clock,
    },
    {
      question: "How do I open a new account?",
      answer:
        "You can open an account online in minutes or visit our nearest branch. Just have your ID and address proof ready.",
      icon: User,
    },
    {
      question: "Is my money safe with VaultX?",
      answer:
        "Yes, all deposits are insured and we use bank-grade security measures including 256-bit encryption to protect your data.",
      icon: Shield,
    },
    {
      question: "Do you offer business banking services?",
      answer:
        "Yes, we provide comprehensive business banking solutions including current accounts, loans, and merchant services.",
      icon: Building,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${themeClasses.pageBackground} relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 ${themeClasses.floatingElements[0]} rounded-full blur-3xl opacity-30 animate-pulse`}
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className={`absolute w-80 h-80 ${themeClasses.floatingElements[1]} rounded-full blur-3xl opacity-30 animate-pulse`}
          style={{
            right: mousePosition.x / 15,
            bottom: mousePosition.y / 15,
            transform: "translate(50%, 50%)",
            animationDelay: "1s",
          }}
        />
        <div
          className={`absolute w-64 h-64 ${themeClasses.floatingElements[2]} rounded-full blur-3xl opacity-30 animate-bounce`}
          style={{
            left: "20%",
            top: "60%",
            animationDuration: "4s",
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`${themeClasses.headerBackground} border-b sticky top-0 z-50 transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <ChevronLeft
                className={`w-5 h-5 ${themeClasses.primaryText} group-hover:-translate-x-2 transition-transform duration-300`}
              />
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 ${themeClasses.accentGradient} rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg`}
                >
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span
                  className={`text-xl font-bold ${themeClasses.primaryText} transition-colors duration-300`}
                >
                  VaultX
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition-all duration-300 hover:scale-110 hover:rotate-12`}
              >
                {theme === "dark" ? (
                  <Sun
                    className="w-5 h-5 animate-spin"
                    style={{ animationDuration: "8s" }}
                  />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                className={`px-4 py-2 text-sm border rounded-lg ${themeClasses.secondaryButton} transition-all duration-300 hover:scale-105`}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 text-sm text-white rounded-lg ${themeClasses.primaryButton} transition-all duration-300 hover:scale-105`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        {/* Hero Section */}
        <section
          className={`relative py-20 lg:py-32 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div
                className={`inline-flex items-center space-x-2 ${themeClasses.cardBackground} border rounded-full px-6 py-3 mb-8 shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <Headphones className="w-4 h-4 mr-2 animate-bounce" />
                Contact Us
                <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
              </div>

              <h1
                className={`text-4xl md:text-6xl font-bold ${themeClasses.primaryText} mb-6 transition-all duration-1000`}
              >
                Get in Touch
                <span
                  className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block animate-pulse hover:scale-105 transition-transform duration-300`}
                >
                  We're Here to Help ✨
                </span>
              </h1>

              <p
                className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300`}
              >
                Have questions about our services? Need technical support? Want
                to explore business partnerships? Our team is ready to assist
                you 24/7 with love and dedication! 💙
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className={`px-8 py-3 text-white rounded-lg ${themeClasses.primaryButton} transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group`}
                >
                  <Phone className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Call Now: 1800-VAULTX-1
                  <Zap className="w-4 h-4 ml-2 group-hover:animate-ping" />
                </button>
                <button
                  className={`px-8 py-3 border rounded-lg ${themeClasses.secondaryButton} transform hover:scale-110 transition-all duration-300 flex items-center justify-center group`}
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:animate-spin" />
                  Schedule Meeting
                  <Heart className="w-4 h-4 ml-2 group-hover:animate-pulse text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4 transition-colors duration-300`}
              >
                Contact Information
              </h2>
              <p
                className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto transition-colors duration-300`}
              >
                Multiple ways to reach us. Choose what works best for you! 🚀
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`transform hover:scale-110 transition-all duration-500 ${info.animation}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`${themeClasses.cardBackground} border rounded-xl shadow-lg p-6 text-center h-full hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-125 hover:rotate-360 transition-all duration-500 shadow-lg`}
                    >
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`text-xl font-semibold ${themeClasses.primaryText} mb-4 transition-colors duration-300`}
                    >
                      {info.title}
                    </h3>
                    <div className="space-y-2">
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className={`text-sm ${themeClasses.mutedText} transition-colors duration-300 hover:${themeClasses.primaryText} cursor-pointer`}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section
          className={`py-20 ${themeClasses.featureBackground} transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="transform hover:scale-105 transition-all duration-500">
                <div
                  className={`${themeClasses.cardBackground} border rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500`}
                >
                  <div className="p-6 border-b">
                    <h3
                      className={`text-2xl font-semibold ${themeClasses.primaryText} flex items-center transition-colors duration-300`}
                    >
                      <MessageSquare className="w-6 h-6 mr-2 animate-pulse" />
                      Send us a Message 💌
                    </h3>
                    <p
                      className={`${themeClasses.secondaryText} mt-2 transition-colors duration-300`}
                    >
                      Fill out the form below and we'll get back to you within
                      24 hours with lots of love!
                    </p>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText} transition-colors duration-300`}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter your magical name ✨"
                          required
                          className={`w-full px-3 py-3 rounded-lg border ${themeClasses.inputBackground} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText} transition-colors duration-300`}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your-awesome-email@example.com 📧"
                          required
                          className={`w-full px-3 py-3 rounded-lg border ${themeClasses.inputBackground} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className={`block text-sm font-medium ${themeClasses.primaryText} transition-colors duration-300`}
                        >
                          Your Message *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Share your thoughts, dreams, and how we can help make them come true! 🌟"
                          required
                          rows={6}
                          className={`w-full px-3 py-3 rounded-lg border ${themeClasses.inputBackground} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        className={`w-full px-6 py-4 text-white rounded-lg ${themeClasses.primaryButton} transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group font-semibold text-lg`}
                      >
                        <Send className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Send Message with Love 💝
                        <Sparkles className="w-5 h-5 ml-2 group-hover:animate-spin" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Enhanced Google Map Section */}
              <div className="transform hover:scale-105 transition-all duration-500">
                <div
                  className={`${themeClasses.cardBackground} border rounded-xl shadow-2xl h-full hover:shadow-3xl transition-all duration-500`}
                >
                  <div className="p-6 border-b">
                    <h3
                      className={`text-2xl font-semibold ${themeClasses.primaryText} flex items-center transition-colors duration-300`}
                    >
                      <MapPin className="w-6 h-6 mr-2 animate-bounce" />
                      Our Location 📍
                    </h3>
                    <p
                      className={`${themeClasses.secondaryText} mt-2 transition-colors duration-300`}
                    >
                      Visit us at our beautiful headquarters! We'd love to meet
                      you in person! 🏢
                    </p>
                  </div>
                  <div className="relative">
                    <div className="h-96 rounded-b-xl overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588517239!2d73.85674287501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sGaneshkhind%2C%20Pune%2C%20Maharashtra%20411007!5e0!3m2!1sen!2sin!4v1697000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="transition-all duration-500 hover:brightness-110"
                      ></iframe>
                    </div>

                    {/* Floating Info Card */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div
                        className={`${themeClasses.cardBackground} p-4 rounded-lg shadow-xl border backdrop-blur-lg transform hover:scale-105 transition-all duration-300`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center animate-pulse">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4
                              className={`font-semibold ${themeClasses.primaryText} transition-colors duration-300`}
                            >
                              VaultX Headquarters 🏦
                            </h4>
                            <p
                              className={`text-sm ${themeClasses.mutedText} transition-colors duration-300`}
                            >
                              CDAC Mumbai Campus
                            </p>
                            <p
                              className={`text-sm ${themeClasses.mutedText} transition-colors duration-300`}
                            >
                              Pune University Campus, Ganeshkhind
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full text-xs animate-pulse">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Open Now ✨
                              </span>
                              <span
                                className={`text-xs ${themeClasses.mutedText} transition-colors duration-300`}
                              >
                                9:00 AM - 6:00 PM
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4 transition-colors duration-300`}
              >
                Quick Answers ⚡
              </h2>
              <p
                className={`text-xl ${themeClasses.secondaryText} transition-colors duration-300`}
              >
                Find instant answers to common questions with a sprinkle of
                magic! ✨
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`${themeClasses.cardBackground} border rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 transform group-hover:rotate-360 transition-transform duration-500">
                        <faq.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold ${themeClasses.primaryText} mb-3 transition-colors duration-300 group-hover:text-blue-500`}
                        >
                          {faq.question}
                        </h4>
                        <p
                          className={`text-sm ${themeClasses.mutedText} leading-relaxed transition-colors duration-300`}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section
          className={`py-20 ${themeClasses.ctaBackground} relative overflow-hidden`}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-96 h-96 bg-white/10 rounded-full blur-3xl absolute top-10 left-10 animate-pulse" />
              <div
                className="w-80 h-80 bg-white/10 rounded-full blur-3xl absolute bottom-10 right-10 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse">
              Still Have Questions? 🤔
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our expert team is standing by to help you with any questions
              about our banking services. We're here to make your financial
              dreams come true! 💫
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group shadow-2xl">
                <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Call Us Now 📞
                <Zap className="w-5 h-5 ml-2 group-hover:animate-ping text-yellow-500" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white/20 rounded-lg transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm">
                <Star className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Live Chat Support 💬
                <Heart className="w-5 h-5 ml-2 group-hover:animate-pulse text-red-400" />
              </button>
            </div>
          </div>

          {/* Animated Background Elements */}
          <div
            className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          />
          <div
            className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/20 rounded-full animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          />
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className={`w-14 h-14 ${themeClasses.primaryButton} rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-125 transition-all duration-300 flex items-center justify-center group`}
        >
          <MessageSquare className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default VaultXContact;
