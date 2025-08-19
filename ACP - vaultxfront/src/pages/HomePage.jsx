// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Smartphone,
  PieChart,
  Award,
  Lock,
  Star,
  Building2,
  UserCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const HomePage = () => {
  const { theme } = useTheme();

  const getThemeClasses = (currentTheme) => {
    if (currentTheme === "dark") {
      return {
        pageBackground:
          "bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white",
        headerBackground: "bg-slate-900/90 backdrop-blur-md",
        cardBackground: "bg-slate-800/50 backdrop-blur-sm border-slate-700",
        primaryText: "text-white",
        secondaryText: "text-slate-300",
        mutedText: "text-slate-400",
        accentGradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
        primaryButton:
          "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
        featureBackground: "bg-slate-900/30",
        featureCard:
          "bg-slate-800/60 backdrop-blur-sm border-slate-700 hover:border-slate-600",
        trustBackground: "bg-slate-900/50",
        footerBackground: "bg-slate-950",
        floatingElements: [
          "bg-gradient-to-r from-cyan-500/20 to-blue-600/20",
          "bg-gradient-to-r from-purple-500/20 to-pink-600/20",
          "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20",
        ],
        statsGradient:
          "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent",
      };
    } else {
      return {
        pageBackground:
          "bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50",
        headerBackground: "bg-white/90 backdrop-blur-md",
        cardBackground: "bg-white/80 backdrop-blur-sm",
        primaryText: "text-slate-800",
        secondaryText: "text-slate-600",
        mutedText: "text-slate-500",
        accentGradient: "bg-gradient-to-r from-blue-600 to-green-600",
        primaryButton:
          "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500",
        featureBackground: "bg-white/30",
        featureCard:
          "bg-white/70 backdrop-blur-sm border-slate-200 hover:border-slate-300",
        trustBackground: "bg-white/40",
        footerBackground: "bg-slate-800",
        floatingElements: [
          "bg-gradient-to-r from-blue-400/30 to-cyan-400/30",
          "bg-gradient-to-r from-purple-400/30 to-pink-400/30",
          "bg-gradient-to-r from-green-400/30 to-emerald-400/30",
        ],
        statsGradient:
          "bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent",
      };
    }
  };

  const themeClasses = getThemeClasses(theme);

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          {themeClasses.floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className={`absolute ${
                index === 0
                  ? "top-20 left-20 w-72 h-72"
                  : index === 1
                  ? "bottom-20 right-20 w-96 h-96"
                  : "top-1/2 left-1/4 w-64 h-64"
              } ${element} rounded-full blur-3xl`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 1.5,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              className={`inline-flex items-center space-x-2 ${themeClasses.cardBackground} rounded-full px-6 py-3 mb-8 border`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span
                className={`${themeClasses.primaryText} text-sm font-medium`}
              >
                India's Most Trusted Digital Bank
              </span>
            </motion.div>

            <div className="mb-12">
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span
                  className={`${themeClasses.accentGradient} bg-clip-text text-transparent`}
                >
                  VaultX
                </span>
              </motion.h1>
              <motion.p
                className={`text-2xl md:text-3xl ${themeClasses.secondaryText} mb-8 max-w-4xl mx-auto leading-relaxed`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience the future of banking with instant transactions,
                <br />
                AI-powered security, and seamless digital experiences.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/login">
                <motion.button
                  className={`w-64 ${themeClasses.primaryButton} text-white text-lg px-8 py-4 rounded-lg shadow-lg font-semibold flex items-center justify-center`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Building2 className="w-5 h-5 mr-3" />
                  System Login
                </motion.button>
              </Link>

              <Link to="/register">
                <motion.button
                  className={`w-64 ${themeClasses.accentGradient} text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg flex items-center justify-center`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserCheck className="w-5 h-5 mr-3" />
                  Open New Account
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { value: "10M+", label: "Happy Customers" },
                { value: "₹500Cr+", label: "Daily Transactions" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.h3
                    className={`text-3xl font-bold ${themeClasses.statsGradient}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className={`${themeClasses.mutedText} text-sm`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${themeClasses.featureBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-4xl md:text-5xl font-bold ${themeClasses.primaryText} mb-6`}
            >
              Why Choose VaultX?
            </h2>
            <p
              className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            >
              Experience banking reimagined with cutting-edge technology and
              unmatched security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description:
                  "256-bit encryption and multi-factor authentication protect your assets",
                gradient:
                  theme === "dark"
                    ? "bg-gradient-to-r from-emerald-400 to-cyan-500"
                    : "bg-gradient-to-r from-green-400 to-emerald-500",
              },
              {
                icon: Clock,
                title: "Instant KYC",
                description:
                  "Get verified in minutes with our AI-powered video KYC technology",
                gradient:
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                    : "bg-gradient-to-r from-blue-400 to-cyan-500",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description:
                  "Access your account anywhere, anytime with our responsive platform",
                gradient:
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-purple-400 to-pink-500",
              },
              {
                icon: PieChart,
                title: "Smart Analytics",
                description:
                  "Track expenses and manage finances with intelligent insights",
                gradient: "bg-gradient-to-r from-amber-400 to-orange-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${themeClasses.featureCard} rounded-lg border p-6 text-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div
                  className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3
                  className={`text-lg mb-3 font-semibold ${themeClasses.primaryText}`}
                >
                  {feature.title}
                </h3>
                <p className={`${themeClasses.secondaryText} text-sm`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className={`py-20 ${themeClasses.trustBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Award,
                title: "RBI Approved",
                description:
                  "Fully licensed and regulated by Reserve Bank of India",
                gradient:
                  theme === "dark"
                    ? "bg-gradient-to-r from-emerald-400 to-cyan-500"
                    : "bg-gradient-to-r from-green-400 to-emerald-500",
              },
              {
                icon: Lock,
                title: "DICGC Insured",
                description: "Your deposits are protected up to ₹5 lakhs",
                gradient:
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                    : "bg-gradient-to-r from-blue-400 to-cyan-500",
              },
              {
                icon: Star,
                title: "ISO Certified",
                description: "International standards for quality and security",
                gradient: "bg-gradient-to-r from-amber-400 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center ${themeClasses.primaryText}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-20 h-20 ${item.gradient} rounded-full flex items-center justify-center mb-6 shadow-xl`}
                >
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${themeClasses.primaryText}`}
                >
                  {item.title}
                </h3>
                <p className={`${themeClasses.secondaryText}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.footerBackground} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`w-10 h-10 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                      : "bg-gradient-to-r from-amber-400 to-orange-500"
                  } rounded-xl flex items-center justify-center`}
                >
                  <span className="text-xl font-bold text-white">₹</span>
                </div>
                <span className="text-2xl font-bold text-white">VaultX</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Your trusted partner for secure and modern banking solutions in
                the digital age.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">
                Services
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li className="cursor-pointer hover:text-white transition-colors">
                  Personal Banking
                </li>
                <li className="cursor-pointer hover:text-white transition-colors">
                  Business Banking
                </li>
                <li className="cursor-pointer hover:text-white transition-colors">
                  Digital Payments
                </li>
                <li className="cursor-pointer hover:text-white transition-colors">
                  Investment Services
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-slate-300">
                <li className="cursor-pointer hover:text-white transition-colors">
                  Customer Care
                </li>
                <li className="cursor-pointer hover:text-white transition-colors">
                  Branch Locator
                </li>
                <li className="cursor-pointer hover:text-white transition-colors">
                  Help Center
                </li>
                <li className="cursor-pointer hover:text-white transition-colors">
                  Security Center
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
              <ul className="space-y-3 text-slate-300">
                <li>1800-VAULTX-1</li>
                <li>support@vaultx.com</li>
                <li>Main Branch, Financial District</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div
            className={`border-t ${
              theme === "dark" ? "border-slate-700/50" : "border-white/20"
            } mt-12 pt-8 text-center text-slate-400`}
          >
            <p>
              &copy; 2024 VaultX. All rights reserved. | Privacy Policy | Terms
              of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
