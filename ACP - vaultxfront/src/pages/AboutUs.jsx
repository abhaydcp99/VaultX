import AbhayImg from "../assets/Abhay22.jpeg";
import DhanashreeImg from "../assets/Dhanashree.jpeg";
import ParasImg from "../assets/paras.jpeg";
import Ashutosh from "../assets/Ashutosh.jpeg";
import ChaitanyaImg from "../assets/Chait.jpeg";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Shield,
  Heart,
  Globe,
  Zap,
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  Target,
  Eye,
  Lightbulb,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AboutPage = () => {
  const [theme, setTheme] = useState("dark");
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getThemeClasses = (currentTheme) => {
    if (currentTheme === "dark") {
      return {
        pageBackground:
          "bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white",
        cardBackground: "bg-slate-800/50 backdrop-blur-sm border-slate-700",
        primaryText: "text-white",
        secondaryText: "text-slate-300",
        mutedText: "text-slate-400",
        accentGradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
        primaryButton:
          "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
        secondaryButton: "border-slate-600 text-slate-300 hover:bg-slate-800",
        featureBackground: "bg-slate-900/30",
        statsGradient:
          "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent",
        highlightGradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
        teamCardBg: "bg-gradient-to-br from-slate-800/60 to-slate-900/60",
        teamCardHover: "hover:from-slate-700/80 hover:to-slate-800/80",
        overlayBg: "bg-black/90",
      };
    } else {
      return {
        pageBackground:
          "bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50",
        cardBackground: "bg-white/80 backdrop-blur-sm border-slate-200",
        primaryText: "text-slate-800",
        secondaryText: "text-slate-600",
        mutedText: "text-slate-500",
        accentGradient: "bg-gradient-to-r from-blue-600 to-green-600",
        primaryButton:
          "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500",
        secondaryButton: "border-slate-300 text-slate-700 hover:bg-slate-50",
        featureBackground: "bg-white/30",
        statsGradient:
          "bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent",
        highlightGradient: "bg-gradient-to-r from-blue-600 to-green-600",
        teamCardBg: "bg-gradient-to-br from-white/90 to-blue-50/90",
        teamCardHover: "hover:from-white hover:to-blue-50",
        overlayBg: "bg-white/95",
      };
    }
  };

  const themeClasses = getThemeClasses(theme);

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "Advanced encryption and multi-layer security protecting your financial data 24/7.",
    },
    {
      icon: Heart,
      title: "Customer Centric",
      description:
        "Every feature designed with our customers' needs and convenience in mind.",
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description:
        "Banking services accessible to everyone, anywhere, breaking geographical barriers.",
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description:
        "Constantly evolving with cutting-edge technology and user-centric solutions.",
    },
  ];

  const achievements = [
    { number: "10M+", label: "Happy Customers" },
    { number: "₹2.5B+", label: "Transactions Processed" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" },
  ];

  const milestones = [
    {
      year: "2020",
      title: "VaultX Founded",
      description:
        "Started with a vision to revolutionize digital banking in India",
    },
    {
      year: "2021",
      title: "1M Users",
      description: "Reached our first million users within the first year",
    },
    {
      year: "2022",
      title: "RBI License",
      description: "Obtained full banking license from Reserve Bank of India",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched AI-powered fraud detection and customer support",
    },
    {
      year: "2024",
      title: "10M+ Users",
      description: "Became one of India's fastest-growing digital banks",
    },
  ];

  // Enhanced team members with more details and placeholder images
  const teamMembers = [
    {
      name: "Abhay Chavan",
      position: "CEO & Founder",
      description: "",
      image: AbhayImg,
      bio: "",
      skills: ["Strategic Leadership", "Fintech Innovation", "Risk Management"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "abhay@vaultx.com",
      },
      achievements: [
        "Forbes 30 Under 30",
        "Best CEO Award 2023",
        "Fintech Leader of the Year",
      ],
    },
    {
      name: "Dhanashree Dagade",
      position: "CTO",
      description: "",
      image: DhanashreeImg,
      bio: "Dhanashree is a technology visionary with 12+ years at Google, where she led several high-impact projects. She specializes in scalable systems, AI/ML, and blockchain technology.",
      skills: ["System Architecture", "AI/ML", "Blockchain", "Cloud Computing"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "dhanashree@vaultx.com",
      },
      achievements: [
        "Google Distinguished Engineer",
        "Women in Tech Leader",
        "Patent Holder - 15 Patents",
      ],
    },
    {
      name: "Paras Kuranjekar",
      position: "Head of Security",
      description: "",
      image: ParasImg,
      bio: "Paras is a cybersecurity veteran with 10+ years protecting financial institutions. He previously worked with RBI and has expertise in fraud detection and regulatory compliance.",
      skills: [
        "Cybersecurity",
        "Fraud Detection",
        "Compliance",
        "Risk Assessment",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "paras@vaultx.com",
      },
      achievements: [
        "CISA Certified",
        "Security Excellence Award",
        "Published Researcher",
      ],
    },
    {
      name: "Chaitanya Shyamkuvar",
      position: "Head of Customer Experience",
      description: "",
      image: ChaitanyaImg,
      bio: "Chaitanya has revolutionized customer experience across multiple industries. With her user-centric approach, she has improved customer satisfaction scores by 40% in her previous roles.",
      skills: [
        "Customer Experience",
        "User Research",
        "Product Design",
        "Team Leadership",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "chaitanya@vaultx.com",
      },
      achievements: [
        "CX Excellence Award",
        "Customer Champion 2023",
        "UX Innovation Leader",
      ],
    },
    {
      name: "Ashutosh Upadhyay",
      position: "Head of Product",
      description: "",
      image: Ashutosh,
      bio: "Ashutosh is a product management expert with 8+ years building consumer-facing financial products. He has successfully launched 10+ products that serve millions of users.",
      skills: [
        "Product Strategy",
        "User Experience",
        "Market Research",
        "Agile Development",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ashutosh@vaultx.com",
      },
      achievements: [
        "Product Manager of the Year",
        "Innovation Excellence",
        "User Choice Award",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentTeamSlide(
      (prev) => (prev + 1) % Math.ceil(teamMembers.length / 3)
    );
  };

  const prevSlide = () => {
    setCurrentTeamSlide((prev) =>
      prev === 0 ? Math.ceil(teamMembers.length / 3) - 1 : prev - 1
    );
  };

  const TeamMemberModal = ({ member, onClose }) => {
    if (!member) return null;

    return (
      <div
        className={`fixed inset-0 ${themeClasses.overlayBg} backdrop-blur-md z-50 flex items-center justify-center p-4`}
        onClick={onClose}
      >
        <div
          className={`${themeClasses.teamCardBg} backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full border shadow-2xl transform transition-all duration-300`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className={`text-3xl font-bold ${themeClasses.primaryText}`}>
              {member.name}
            </h3>
            <button
              onClick={onClose}
              className={`${themeClasses.mutedText} hover:${themeClasses.primaryText} transition-colors`}
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
              />
            </div>

            <div className="flex-1">
              <p
                className={`text-lg font-semibold ${themeClasses.statsGradient} mb-4`}
              >
                {member.position}
              </p>

              <p
                className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}
              >
                {member.bio}
              </p>

              <div className="mb-6">
                <h4
                  className={`text-lg font-semibold ${themeClasses.primaryText} mb-3`}
                >
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${themeClasses.featureBackground} ${themeClasses.mutedText} border`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4
                  className={`text-lg font-semibold ${themeClasses.primaryText} mb-3`}
                >
                  Achievements
                </h4>
                <ul className={`${themeClasses.secondaryText} space-y-1`}>
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <a
                  href={member.social.linkedin}
                  className={`${themeClasses.highlightGradient} p-3 rounded-full text-white hover:scale-110 transition-transform`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.social.twitter}
                  className={`${themeClasses.highlightGradient} p-3 rounded-full text-white hover:scale-110 transition-transform`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className={`${themeClasses.highlightGradient} p-3 rounded-full text-white hover:scale-110 transition-transform`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${themeClasses.pageBackground} pt-20 relative`}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out;
        }

        .team-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-card:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .team-image {
          transition: all 0.5s ease;
        }

        .team-card:hover .team-image {
          transform: scale(1.1);
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)
            infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          80%,
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-24 right-4 z-50 ${themeClasses.primaryButton} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform`}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              id="hero-badge"
              className={`inline-flex items-center space-x-2 ${
                themeClasses.cardBackground
              } rounded-full px-6 py-3 mb-6 border ${
                visibleElements.has("hero-badge")
                  ? "animate-fade-in"
                  : "opacity-0"
              }`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span
                className={`${themeClasses.primaryText} text-sm font-medium`}
              >
                About VaultX
              </span>
            </div>

            <h1
              id="hero-title"
              className={`text-4xl md:text-6xl font-bold ${
                themeClasses.primaryText
              } mb-6 ${
                visibleElements.has("hero-title")
                  ? "animate-slide-up"
                  : "opacity-0"
              }`}
            >
              Revolutionizing
              <span
                className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block`}
              >
                Digital Banking
              </span>
            </h1>

            <p
              id="hero-description"
              className={`text-xl ${
                themeClasses.secondaryText
              } max-w-3xl mx-auto mb-8 ${
                visibleElements.has("hero-description")
                  ? "animate-slide-up"
                  : "opacity-0"
              }`}
            >
              VaultX is India's premier digital banking platform, combining
              cutting-edge technology with personalized financial services.
              We're building the future of banking, one innovation at a time.
            </p>

            <div
              id="hero-buttons"
              className={`flex flex-col sm:flex-row gap-4 justify-center ${
                visibleElements.has("hero-buttons")
                  ? "animate-slide-up"
                  : "opacity-0"
              }`}
            >
              <button
                className={`${themeClasses.primaryButton} text-white font-semibold px-8 py-4 rounded-lg shadow-lg flex items-center hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                className={`border ${themeClasses.secondaryButton} font-semibold px-8 py-4 rounded-lg flex items-center hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
              >
                <Globe className="w-4 h-4 mr-2" />
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${themeClasses.featureBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                className={`text-center ${
                  visibleElements.has(`stat-${index}`)
                    ? "animate-scale-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`text-3xl md:text-4xl font-bold ${themeClasses.statsGradient} mb-2`}
                >
                  {achievement.number}
                </div>
                <div className={`${themeClasses.secondaryText} font-medium`}>
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              id="mission-card"
              className={`${
                themeClasses.cardBackground
              } rounded-2xl p-8 border h-full ${
                visibleElements.has("mission-card")
                  ? "animate-slide-left"
                  : "opacity-0"
              }`}
            >
              <div
                className={`w-16 h-16 ${themeClasses.highlightGradient} rounded-full flex items-center justify-center mb-6`}
              >
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3
                className={`text-2xl font-bold ${themeClasses.primaryText} mb-4`}
              >
                Our Mission
              </h3>
              <p className={`${themeClasses.secondaryText} leading-relaxed`}>
                To democratize banking by providing accessible, secure, and
                innovative financial services that empower individuals and
                businesses to achieve their financial goals through cutting-edge
                technology.
              </p>
            </div>

            <div
              id="vision-card"
              className={`${
                themeClasses.cardBackground
              } rounded-2xl p-8 border h-full ${
                visibleElements.has("vision-card")
                  ? "animate-slide-right"
                  : "opacity-0"
              }`}
            >
              <div
                className={`w-16 h-16 ${themeClasses.highlightGradient} rounded-full flex items-center justify-center mb-6`}
              >
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3
                className={`text-2xl font-bold ${themeClasses.primaryText} mb-4`}
              >
                Our Vision
              </h3>
              <p className={`${themeClasses.secondaryText} leading-relaxed`}>
                To become India's most trusted digital banking platform, setting
                new standards for customer experience, security, and innovation
                in the financial services industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="values-header"
            className={`text-center mb-16 ${
              visibleElements.has("values-header")
                ? "animate-slide-up"
                : "opacity-0"
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}
            >
              Our Core Values
            </h2>
            <p
              className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            >
              The principles that guide every decision we make and every service
              we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                id={`value-${index}`}
                className={`${
                  themeClasses.cardBackground
                } rounded-2xl p-6 text-center border h-full hover:shadow-xl transition-all duration-300 group hover:scale-105 hover:-translate-y-2 ${
                  visibleElements.has(`value-${index}`)
                    ? "animate-scale-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 ${themeClasses.highlightGradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeClasses.primaryText} mb-3`}
                >
                  {value.title}
                </h3>
                <p className={`${themeClasses.secondaryText}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`py-20 ${themeClasses.featureBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="timeline-header"
            className={`text-center mb-16 ${
              visibleElements.has("timeline-header")
                ? "animate-slide-up"
                : "opacity-0"
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}
            >
              Our Journey
            </h2>
            <p
              className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            >
              From startup to India's leading digital bank
            </p>
          </div>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${themeClasses.highlightGradient}`}
            ></div>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                id={`milestone-${index}`}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "" : "flex-row-reverse"
                } ${
                  visibleElements.has(`milestone-${index}`)
                    ? index % 2 === 0
                      ? "animate-slide-left"
                      : "animate-slide-right"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-1 px-8">
                  <div
                    className={`${themeClasses.cardBackground} rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  >
                    <div
                      className={`text-2xl font-bold ${themeClasses.statsGradient} mb-2`}
                    >
                      {milestone.year}
                    </div>
                    <h3
                      className={`text-xl font-semibold ${themeClasses.primaryText} mb-2`}
                    >
                      {milestone.title}
                    </h3>
                    <p className={themeClasses.secondaryText}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 ${themeClasses.highlightGradient} rounded-full relative z-10 pulse-ring`}
                ></div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Team Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-6 floating-element"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="team-header"
            className={`text-center mb-20 ${
              visibleElements.has("team-header")
                ? "animate-slide-up"
                : "opacity-0"
            }`}
          >
            <div
              className={`inline-flex items-center space-x-2 ${themeClasses.cardBackground} rounded-full px-6 py-3 mb-6 border`}
            >
              <Users className="w-4 h-4" />
              <span
                className={`${themeClasses.primaryText} text-sm font-medium`}
              >
                Meet Our Team
              </span>
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold ${themeClasses.primaryText} mb-6`}
            >
              Visionary
              <span
                className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block`}
              >
                Leadership Team
              </span>
            </h2>

            <p
              className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto`}
            >
              Meet the exceptional individuals who are driving VaultX's mission
              to revolutionize digital banking
            </p>
          </div>

          {/* Mobile Team Carousel */}
          <div className="lg:hidden mb-8">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTeamSlide * 100}%)`,
                  }}
                >
                  {teamMembers.map((member, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div
                        className={`team-card group relative ${themeClasses.teamCardBg} ${themeClasses.teamCardHover} backdrop-blur-lg rounded-3xl p-8 border border-opacity-20 shadow-2xl cursor-pointer overflow-hidden`}
                        onClick={() => setActiveTeamMember(member)}
                      >
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>

                        {/* Profile Image with Advanced Effects */}
                        <div className="relative mb-6">
                          <div className="w-32 h-32 mx-auto relative">
                            <div
                              className={`absolute inset-0 ${themeClasses.highlightGradient} rounded-full animate-pulse`}
                            ></div>
                            <img
                              src={member.image}
                              alt={member.name}
                              className="team-image w-full h-full rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                            />
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>

                          {/* Achievement Badge */}
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg">
                            <Star className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Member Info */}
                        <div className="text-center relative z-10">
                          <h3
                            className={`text-2xl font-bold ${themeClasses.primaryText} mb-2 group-hover:scale-105 transition-transform duration-300`}
                          >
                            {member.name}
                          </h3>

                          <div
                            className={`text-sm font-semibold ${themeClasses.statsGradient} mb-4 px-4 py-2 rounded-full ${themeClasses.cardBackground} border`}
                          >
                            {member.position}
                          </div>

                          <p
                            className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}
                          >
                            {member.description}
                          </p>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {member.skills
                              .slice(0, 2)
                              .map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className={`text-xs px-3 py-1 rounded-full ${themeClasses.featureBackground} ${themeClasses.mutedText} border`}
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>

                          {/* Social Links */}
                          <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <a
                              href={member.social.linkedin}
                              className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                              href={member.social.twitter}
                              className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                            <a
                              href={`mailto:${member.social.email}`}
                              className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${themeClasses.primaryButton} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-10`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${themeClasses.primaryButton} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-10`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: teamMembers.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTeamSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTeamSlide
                      ? themeClasses.highlightGradient
                      : `${themeClasses.mutedText} bg-current opacity-30`
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Team Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {teamMembers.slice(0, 3).map((member, index) => (
                <div
                  key={index}
                  id={`team-member-${index}`}
                  className={`team-card group relative ${
                    themeClasses.teamCardBg
                  } ${
                    themeClasses.teamCardHover
                  } backdrop-blur-lg rounded-3xl p-8 border border-opacity-20 shadow-2xl cursor-pointer overflow-hidden ${
                    visibleElements.has(`team-member-${index}`)
                      ? "animate-scale-in"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => setActiveTeamMember(member)}
                >
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>

                  {/* Profile Image with Advanced Effects */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto relative">
                      <div
                        className={`absolute inset-0 ${themeClasses.highlightGradient} rounded-full animate-pulse`}
                      ></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-image w-full h-full rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                      />
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Achievement Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center relative z-10">
                    <h3
                      className={`text-2xl font-bold ${themeClasses.primaryText} mb-2 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {member.name}
                    </h3>

                    <div
                      className={`text-sm font-semibold ${themeClasses.statsGradient} mb-4 px-4 py-2 rounded-full ${themeClasses.cardBackground} border`}
                    >
                      {member.position}
                    </div>

                    <p
                      className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}
                    >
                      {member.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`text-xs px-3 py-1 rounded-full ${themeClasses.featureBackground} ${themeClasses.mutedText} border`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <a
                        href={member.social.linkedin}
                        className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                </div>
              ))}
            </div>

            {/* Second Row - Centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {teamMembers.slice(3).map((member, index) => (
                  <div
                    key={index + 3}
                    id={`team-member-${index + 3}`}
                    className={`team-card group relative ${
                      themeClasses.teamCardBg
                    } ${
                      themeClasses.teamCardHover
                    } backdrop-blur-lg rounded-3xl p-8 border border-opacity-20 shadow-2xl cursor-pointer overflow-hidden ${
                      visibleElements.has(`team-member-${index + 3}`)
                        ? "animate-scale-in"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: `${(index + 3) * 0.2}s` }}
                    onClick={() => setActiveTeamMember(member)}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>

                    {/* Profile Image with Advanced Effects */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto relative">
                        <div
                          className={`absolute inset-0 ${themeClasses.highlightGradient} rounded-full animate-pulse`}
                        ></div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="team-image w-full h-full rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                        />
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Achievement Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg">
                        <Star className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center relative z-10">
                      <h3
                        className={`text-2xl font-bold ${themeClasses.primaryText} mb-2 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {member.name}
                      </h3>

                      <div
                        className={`text-sm font-semibold ${themeClasses.statsGradient} mb-4 px-4 py-2 rounded-full ${themeClasses.cardBackground} border`}
                      >
                        {member.position}
                      </div>

                      <p
                        className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}
                      >
                        {member.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {member.skills.slice(0, 2).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`text-xs px-3 py-1 rounded-full ${themeClasses.featureBackground} ${themeClasses.mutedText} border`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <a
                          href={member.social.linkedin}
                          className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={member.social.twitter}
                          className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${member.social.email}`}
                          className={`${themeClasses.highlightGradient} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 ${themeClasses.featureBackground}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            id="cta-section"
            className={`${
              visibleElements.has("cta-section")
                ? "animate-slide-up"
                : "opacity-0"
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-6`}
            >
              Ready to Join the Revolution?
            </h2>
            <p
              className={`text-xl ${themeClasses.secondaryText} mb-8 max-w-2xl mx-auto`}
            >
              Experience the future of banking today. Open your VaultX account
              in minutes.
            </p>
            <button
              className={`${themeClasses.primaryButton} text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-lg flex items-center mx-auto hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={activeTeamMember}
        onClose={() => setActiveTeamMember(null)}
      />
    </div>
  );
};

export default AboutPage;
