import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Contact,
  DollarSign,
  CreditCard,
  CreditCardIcon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "../context/RouterContext";
import { Link } from "./UI";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

const Navigation = () => {
  const { theme } = useTheme();
  const { currentPage } = useRouter();
  const themeClasses = useTheme().getThemeClasses(theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`${themeClasses.headerBackground} border-b sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="home" className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${themeClasses.accentGradient} rounded-xl flex items-center justify-center`}
            >
              <span className="text-xl font-bold text-white">₹</span>
            </div>
            <span className={`text-2xl font-bold ${themeClasses.primaryText}`}>
              VaultX
            </span>
            <span
              className={`${themeClasses.secondaryText} text-sm font-medium hidden sm:block`}
            >
              Digital Banking
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="home"
              className={`${
                currentPage === "home"
                  ? themeClasses.primaryText
                  : themeClasses.secondaryText
              } transition-colors`}
            >
              <Home className="w-4 h-4 inline mr-1" />
              Home
            </Link>
            <Link
              to="payment"
              className={`${
                currentPage === "payment"
                  ? themeClasses.primaryText
                  : themeClasses.secondaryText
              } transition-colors`}
            >
              <CreditCard className="w-4 h-4 inline mr-1" />
              Payment
            </Link>
            <Link
              to="loans"
              className={`${
                currentPage === "loans"
                  ? themeClasses.primaryText
                  : themeClasses.secondaryText
              } transition-colors`}
            >
              <DollarSign className="w-4 h-4 inline mr-1" />
              Loans
            </Link>
            <Link
              to="cards"
              className={`${
                currentPage === "cards"
                  ? themeClasses.primaryText
                  : themeClasses.secondaryText
              } transition-colors`}
            >
              <CreditCardIcon className="w-4 h-4 inline mr-1" />
              Cards
            </Link>
            <Link
              to="about"
              className={`${
                currentPage === "about"
                  ? themeClasses.primaryText
                  : themeClasses.secondaryText
              } transition-colors`}
            >
              <Info className="w-4 h-4 inline mr-1" />
              About
            </Link>
            <Link
              to="contact"
              className={`${
                currentPage === "contact"
                  ? themeClasses.primaryText
                  : themeClasses.secondaryText
              } transition-colors`}
            >
              <Contact className="w-4 h-4 inline mr-1" />
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link
              to="home"
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="payment"
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Payment
            </Link>
            <Link
              to="loans"
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Loans
            </Link>
            <Link
              to="cards"
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Cards
            </Link>
            <Link
              to="about"
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="contact"
              className="block px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-4 py-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
