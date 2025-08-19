import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Wallet,
  LogIn,
  ChevronDown,
  PiggyBank,
  Building2,
  Sparkles,
  Mail,
  Info,
  CreditCard,
  Zap,
  Home,
  Star,
  Heart,
  TrendingUp,
} from "lucide-react";

const VaultXNavbar = () => {
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState("");
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    // Check current page
    const checkCurrentPage = () => {
      const pathname = window.location.pathname;
      setCurrentPage(pathname);
    };

    checkCurrentPage();
    window.addEventListener("popstate", checkCurrentPage);
    return () => window.removeEventListener("popstate", checkCurrentPage);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const getThemeClasses = () => {
    if (theme === "dark") {
      return {
        navBackground: scrolled
          ? "bg-slate-900/95 border-slate-700/50"
          : "bg-gradient-to-r from-slate-900/30 via-slate-800/40 to-slate-900/30",
        cardBackground: "bg-slate-800/95 border-slate-700/50 backdrop-blur-xl",
        primaryText: "text-white",
        secondaryText: "text-slate-300",
        mutedText: "text-slate-400",
        hoverBg: "hover:bg-slate-800/60",
        dropdownBg: "bg-slate-800/98 border-slate-700/60",
      };
    }
    return {
      navBackground: scrolled
        ? "bg-white/95 border-gray-200/50"
        : "bg-gradient-to-r from-white/30 via-blue-50/40 to-white/30",
      cardBackground: "bg-white/95 border-gray-200/50 backdrop-blur-xl",
      primaryText: "text-gray-900",
      secondaryText: "text-gray-600",
      mutedText: "text-gray-500",
      hoverBg: "hover:bg-gray-100/60",
      dropdownBg: "bg-white/98 border-gray-200/60",
    };
  };

  const themeClasses = getThemeClasses();

  const navItems = [
    {
      title: "Accounts",
      icon: Wallet,
      color: "from-blue-500 to-cyan-500",
      items: [
        {
          label: "Savings Account",
          icon: PiggyBank,
          href: "/register",
          desc: "High-yield savings with amazing returns",
          color: "from-green-500 to-emerald-500",
        },
        {
          label: "Current Account",
          icon: Building2,
          href: "/register",
          desc: "Business banking made simple",
          color: "from-blue-500 to-indigo-500",
        },
        {
          label: "Premium Account",
          icon: Sparkles,
          href: "/register",
          desc: "Exclusive benefits & rewards",
          color: "from-purple-500 to-pink-500",
        },
      ],
    },
  ];

  const staticLinks = [
    {
      label: "About",
      icon: Info,
      href: "/about",
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Contact",
      icon: Mail,
      href: "/contact",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Loans",
      icon: Zap,
      href: "/loans",
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Payment",
      icon: TrendingUp,
      href: "/payment",
      color: "from-green-500 to-teal-500",
    },
    {
      label: "Cards",
      icon: CreditCard,
      href: "/cards",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  // Show dashboard button on specific pages
  const shouldShowDashboard = [
    "/about",
    "/payment",
    "/contact",
    "/loans",
    "/cards",
  ].includes(currentPage);

  return (
    <>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-30">
        <div
          className={`absolute w-72 h-72 ${
            theme === "dark" ? "bg-blue-400/3" : "bg-blue-200/15"
          } rounded-full blur-3xl opacity-70 animate-float`}
          style={{
            left: mousePosition.x / 30,
            top: mousePosition.y / 30,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className={`absolute w-60 h-60 ${
            theme === "dark" ? "bg-green-400/3" : "bg-green-200/15"
          } rounded-full blur-3xl opacity-70 animate-float-delayed`}
          style={{
            right: mousePosition.x / 35,
            bottom: mousePosition.y / 35,
            transform: "translate(50%, 50%)",
          }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          themeClasses.navBackground
        } ${scrolled ? "backdrop-blur-2xl border-b shadow-xl py-2" : "py-3"}`}
        style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Compact Logo Section */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none group"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden`}
                >
                  {/* Animated glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 opacity-0 group-hover:opacity-40 blur-lg transition-all duration-500`}
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <span className="text-lg font-black text-white drop-shadow-md relative z-10 animate-spin-slow">
                    ₹
                  </span>
                </div>

                {/* Floating sparkles */}
                {logoHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-ping" />
                    <Star
                      className="absolute -bottom-1 -left-1 w-2.5 h-2.5 text-green-400 animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col leading-tight">
                <div
                  className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 group-hover:scale-105`}
                  style={{
                    backgroundSize: "200% auto",
                    animation: "shine 2s ease-in-out infinite",
                  }}
                >
                  Vault<span className="animate-pulse-slow">X</span>
                </div>
                <div
                  className={`text-[10px] font-bold tracking-[0.15em] ${themeClasses.mutedText} uppercase transition-colors duration-300`}
                >
                  Premium Banking ✨
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Compact */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((nav) => (
                <div
                  key={nav.title}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(nav.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`group flex items-center gap-2 px-4 py-2 rounded-xl ${themeClasses.primaryText} font-semibold transition-all duration-300 hover:scale-105 ${themeClasses.hoverBg} backdrop-blur-sm relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${nav.color} rounded-lg flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <nav.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="relative z-10 text-sm">{nav.title}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-300 relative z-10 ${
                        activeDropdown === nav.title
                          ? "rotate-180 text-blue-500"
                          : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === nav.title && (
                    <div
                      className={`absolute left-0 mt-2 w-80 rounded-2xl ${themeClasses.dropdownBg} backdrop-blur-2xl border shadow-2xl p-3 z-50 transform animate-slideDown`}
                    >
                      <div className="space-y-1">
                        {nav.items.map((item, index) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${themeClasses.hoverBg} relative overflow-hidden`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center shadow-md group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
                            >
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="relative z-10">
                              <div
                                className={`font-bold ${themeClasses.primaryText} text-sm group-hover:text-blue-500 transition-colors duration-300`}
                              >
                                {item.label}
                              </div>
                              <div
                                className={`text-xs ${themeClasses.mutedText} mt-0.5`}
                              >
                                {item.desc}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {staticLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg ${themeClasses.primaryText} font-semibold transition-all duration-300 hover:scale-105 ${themeClasses.hoverBg} backdrop-blur-sm relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                  <div
                    className={`w-5 h-5 bg-gradient-to-r ${link.color} rounded-md flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <link.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-300 text-sm">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`group p-2.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-white group-hover:animate-spin relative z-10" />
                ) : (
                  <Moon className="w-4 h-4 text-white group-hover:animate-pulse relative z-10" />
                )}
              </button>

              {shouldShowDashboard ? (
                <a
                  href="/"
                  className="group hidden sm:flex items-center gap-2 px-4 py-2.5 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg rounded-xl font-bold transition-all duration-300 hover:scale-110 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <Home className="w-4 h-4 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10 text-sm">Dashboard</span>
                </a>
              ) : (
                <a
                  href="/login"
                  className="group hidden sm:flex items-center gap-2 px-4 py-2.5 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg rounded-xl font-bold transition-all duration-300 hover:scale-110 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <LogIn className="w-4 h-4 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10 text-sm">Login</span>
                  <Heart className="w-3 h-3 group-hover:animate-pulse text-pink-200 relative z-10" />
                </a>
              )}

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`group p-2.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                  {mobileOpen ? (
                    <X className="w-5 h-5 text-white group-hover:animate-spin relative z-10" />
                  ) : (
                    <Menu className="w-5 h-5 text-white group-hover:animate-pulse relative z-10" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Compact */}
        {mobileOpen && (
          <div
            className={`lg:hidden px-4 pb-4 space-y-3 ${themeClasses.cardBackground} border-t backdrop-blur-2xl animate-slideDown`}
          >
            {/* Accounts Section */}
            <div className="space-y-2">
              <div
                className={`text-base font-bold ${themeClasses.primaryText} flex items-center gap-2 mb-2`}
              >
                <Wallet className="w-4 h-4" />
                Accounts
              </div>
              {navItems[0].items.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${themeClasses.hoverBg} relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="relative z-10">
                    <div
                      className={`font-bold ${themeClasses.primaryText} text-sm`}
                    >
                      {item.label}
                    </div>
                    <div className={`text-xs ${themeClasses.mutedText} mt-0.5`}>
                      {item.desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Static Links */}
            <div className="space-y-1 pt-3 border-t border-white/10">
              {staticLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${themeClasses.hoverBg} relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <link.icon className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className={`font-bold ${themeClasses.primaryText} text-sm relative z-10`}
                  >
                    {link.label}
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="pt-3 border-t border-white/10">
              {shouldShowDashboard ? (
                <a
                  href="/"
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg rounded-xl p-3 font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  Go to Dashboard
                </a>
              ) : (
                <a
                  href="/login"
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg rounded-xl p-3 font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login to VaultX
                  <Heart className="w-3 h-3 text-pink-200" />
                </a>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes shine {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(8px) rotate(-1deg);
          }
          66% {
            transform: translateY(-5px) rotate(1deg);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 2s;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default VaultXNavbar;
