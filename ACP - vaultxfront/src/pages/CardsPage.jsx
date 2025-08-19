import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  CreditCard,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp,
  DollarSign,
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  Heart,
  Gift,
  Plane,
  ShoppingBag,
  Car,
  Home,
  Smartphone,
  Coffee,
  Music,
  Film,
  Gamepad2,
  Fuel,
  ShieldCheck,
  Lock,
  Eye,
  Settings,
} from "lucide-react";

const VaultXCards = () => {
  const [theme, setTheme] = useState("light");
  const [selectedCard, setSelectedCard] = useState(null);
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
      floatingElements: [
        "bg-blue-200/40",
        "bg-green-200/40",
        "bg-purple-200/40",
      ],
    };
  };

  const themeClasses = getThemeClasses();

  const cards = [
    {
      id: 1,
      name: "VaultX Platinum Elite",
      type: "Premium Credit Card",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      chipColor: "bg-yellow-400",
      features: [
        "Unlimited cashback",
        "Airport lounge access",
        "Concierge service",
        "Travel insurance",
      ],
      benefits: [
        "5% cashback on all purchases",
        "No foreign transaction fees",
        "24/7 premium support",
      ],
      annualFee: "₹5,999",
      creditLimit: "Up to ₹50 Lakhs",
      icon: Award,
      sparkles: true,
    },
    {
      id: 2,
      name: "VaultX Business Pro",
      type: "Business Credit Card",
      gradient: "from-blue-600 via-cyan-600 to-green-600",
      chipColor: "bg-silver-400",
      features: [
        "Business rewards",
        "Expense tracking",
        "Team cards",
        "Invoice payments",
      ],
      benefits: [
        "10% cashback on business expenses",
        "Flexible credit limits",
        "Advanced analytics",
      ],
      annualFee: "₹2,999",
      creditLimit: "Up to ₹25 Lakhs",
      icon: TrendingUp,
      sparkles: false,
    },
    {
      id: 3,
      name: "VaultX Student Smart",
      type: "Student Credit Card",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      chipColor: "bg-emerald-400",
      features: [
        "Student benefits",
        "Low fees",
        "Credit building",
        "Study abroad perks",
      ],
      benefits: [
        "No annual fee for 2 years",
        "Special student offers",
        "Financial literacy tools",
      ],
      annualFee: "Free for 2 years",
      creditLimit: "Up to ₹2 Lakhs",
      icon: Star,
      sparkles: false,
    },
    {
      id: 4,
      name: "VaultX Travel Master",
      type: "Travel Rewards Card",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      chipColor: "bg-gold-400",
      features: [
        "Travel rewards",
        "Flight discounts",
        "Hotel partnerships",
        "Travel protection",
      ],
      benefits: [
        "Earn miles on every purchase",
        "Free flight upgrades",
        "Travel concierge",
      ],
      annualFee: "₹3,999",
      creditLimit: "Up to ₹15 Lakhs",
      icon: Plane,
      sparkles: true,
    },
  ];

  const categories = [
    { name: "Shopping", icon: ShoppingBag, color: "from-pink-500 to-rose-500" },
    { name: "Travel", icon: Plane, color: "from-blue-500 to-cyan-500" },
    { name: "Fuel", icon: Fuel, color: "from-orange-500 to-red-500" },
    { name: "Dining", icon: Coffee, color: "from-amber-500 to-orange-500" },
    { name: "Entertainment", icon: Film, color: "from-purple-500 to-pink-500" },
    { name: "Utilities", icon: Home, color: "from-green-500 to-emerald-500" },
  ];

  const securityFeatures = [
    {
      title: "Advanced Chip Technology",
      description: "EMV chip provides superior security for all transactions",
      icon: ShieldCheck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Real-time Fraud Detection",
      description:
        "AI-powered monitoring alerts you instantly of suspicious activity",
      icon: Eye,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Biometric Authentication",
      description: "Fingerprint and face recognition for secure access",
      icon: Lock,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Contactless Payments",
      description: "Tap and pay securely without sharing your card details",
      icon: Smartphone,
      color: "from-orange-500 to-red-500",
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
                  VaultX Cards
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
                Compare Cards
              </button>
              <button
                className={`px-4 py-2 text-sm text-white rounded-lg ${themeClasses.primaryButton} transition-all duration-300 hover:scale-105`}
              >
                Apply Now
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
                <CreditCard className="w-4 h-4 mr-2 animate-bounce" />
                Premium Cards
                <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
              </div>

              <h1
                className={`text-4xl md:text-6xl font-bold ${themeClasses.primaryText} mb-6 transition-all duration-1000`}
              >
                Choose Your Perfect
                <span
                  className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block animate-pulse hover:scale-105 transition-transform duration-300`}
                >
                  Credit Card ✨
                </span>
              </h1>

              <p
                className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300`}
              >
                Discover premium credit cards designed to match your lifestyle.
                From cashback rewards to travel perks, find the perfect card
                that makes every purchase rewarding! 💳
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className={`px-8 py-3 text-white rounded-lg ${themeClasses.primaryButton} transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group`}
                >
                  <CreditCard className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Explore All Cards
                  <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" />
                </button>
                <button
                  className={`px-8 py-3 border rounded-lg ${themeClasses.secondaryButton} transform hover:scale-110 transition-all duration-300 flex items-center justify-center group`}
                >
                  <Shield className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Security Features
                  <Heart className="w-4 h-4 ml-2 group-hover:animate-pulse text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Showcase */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4 transition-colors duration-300`}
              >
                Our Premium Card Collection 💎
              </h2>
              <p
                className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto transition-colors duration-300`}
              >
                Each card is crafted with unique benefits and rewards tailored
                to your lifestyle
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="transform hover:scale-105 hover:-translate-y-4 transition-all duration-500 perspective-1000"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setSelectedCard(card.id)}
                  onMouseLeave={() => setSelectedCard(null)}
                >
                  <div className="relative group">
                    {/* Card */}
                    <div
                      className={`bg-gradient-to-r ${
                        card.gradient
                      } rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden transform ${
                        selectedCard === card.id ? "rotateY-12" : ""
                      }`}
                    >
                      {/* Sparkles Effect */}
                      {card.sparkles && (
                        <div className="absolute inset-0 pointer-events-none">
                          <Sparkles className="absolute top-4 right-4 w-6 h-6 text-white/50 animate-pulse" />
                          <Sparkles
                            className="absolute bottom-8 left-8 w-4 h-4 text-white/30 animate-pulse"
                            style={{ animationDelay: "1s" }}
                          />
                          <Sparkles
                            className="absolute top-1/2 right-1/3 w-3 h-3 text-white/40 animate-pulse"
                            style={{ animationDelay: "0.5s" }}
                          />
                        </div>
                      )}

                      {/* Holographic Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      {/* Card Content */}
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {card.name}
                            </h3>
                            <p className="text-white/80 text-sm">{card.type}</p>
                          </div>
                          <card.icon className="w-8 h-8 text-white" />
                        </div>

                        <div className="mb-8">
                          <div
                            className={`w-12 h-8 ${card.chipColor} rounded-md mb-4 shadow-lg`}
                          />
                          <div className="text-white/60 text-xs mb-2">
                            **** **** **** 1234
                          </div>
                          <div className="flex justify-between text-white/60 text-xs">
                            <span>12/28</span>
                            <span>CVV</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-white text-2xl font-bold">
                            VaultX
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div
                      className={`${themeClasses.cardBackground} border rounded-2xl mt-6 p-6 shadow-lg hover:shadow-xl transition-all duration-500`}
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className={`text-sm ${themeClasses.mutedText}`}>
                              Annual Fee
                            </p>
                            <p
                              className={`text-lg font-semibold ${themeClasses.primaryText}`}
                            >
                              {card.annualFee}
                            </p>
                          </div>
                          <div>
                            <p className={`text-sm ${themeClasses.mutedText}`}>
                              Credit Limit
                            </p>
                            <p
                              className={`text-lg font-semibold ${themeClasses.primaryText}`}
                            >
                              {card.creditLimit}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p
                            className={`text-sm ${themeClasses.mutedText} mb-2`}
                          >
                            Key Features
                          </p>
                          <div className="space-y-1">
                            {card.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center space-x-2"
                              >
                                <Check className="w-4 h-4 text-green-500" />
                                <span
                                  className={`text-sm ${themeClasses.secondaryText}`}
                                >
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p
                            className={`text-sm ${themeClasses.mutedText} mb-2`}
                          >
                            Benefits
                          </p>
                          <div className="space-y-1">
                            {card.benefits.map((benefit, benefitIndex) => (
                              <div
                                key={benefitIndex}
                                className="flex items-center space-x-2"
                              >
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span
                                  className={`text-sm ${themeClasses.secondaryText}`}
                                >
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          className={`w-full px-6 py-3 text-white rounded-lg ${themeClasses.primaryButton} transform hover:scale-105 transition-all duration-300 flex items-center justify-center group mt-4`}
                        >
                          Apply for {card.name.split(" ").slice(-1)}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rewards Categories */}
        <section
          className={`py-20 ${themeClasses.featureBackground} transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4 transition-colors duration-300`}
              >
                Earn Rewards in Every Category 🎯
              </h2>
              <p
                className={`text-xl ${themeClasses.secondaryText} transition-colors duration-300`}
              >
                Get cashback and rewards on all your favorite spending
                categories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="transform hover:scale-110 hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`${themeClasses.cardBackground} border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 transform hover:rotate-360 transition-all duration-500 shadow-lg`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`font-semibold ${themeClasses.primaryText} transition-colors duration-300`}
                    >
                      {category.name}
                    </h3>
                    <p className={`text-sm ${themeClasses.mutedText} mt-1`}>
                      Up to 5% cashback
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4 transition-colors duration-300`}
              >
                Bank-Grade Security 🔒
              </h2>
              <p
                className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto transition-colors duration-300`}
              >
                Your financial security is our top priority. Advanced protection
                for every transaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`${themeClasses.cardBackground} border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden h-full`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 transform hover:rotate-360 transition-all duration-500 shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`text-lg font-semibold ${themeClasses.primaryText} mb-3 transition-colors duration-300`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-sm ${themeClasses.mutedText} leading-relaxed transition-colors duration-300`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
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
              Ready to Get Your Perfect Card? 💳
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers and start earning rewards on
              every purchase. Apply now and get instant approval! ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group shadow-2xl">
                <CreditCard className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Apply Now - 2 Min Process 🚀
                <Sparkles className="w-5 h-5 ml-2 group-hover:animate-spin text-yellow-500" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white/20 rounded-lg transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm">
                <Gift className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Compare All Cards 📊
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
          <CreditCard className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>
      </div>

      {/* Card Comparison Modal Trigger */}
      <div className="fixed bottom-8 left-8 z-50">
        <button
          className={`px-4 py-2 ${themeClasses.cardBackground} border rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 group`}
        >
          <Settings
            className={`w-4 h-4 ${themeClasses.primaryText} group-hover:animate-spin`}
          />
          <span className={`text-sm ${themeClasses.primaryText} font-medium`}>
            Compare
          </span>
        </button>
      </div>
    </div>
  );
};

export default VaultXCards;
