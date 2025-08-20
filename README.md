# 💳 VaultX - Digital Banking System  

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)  
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)  
![.NET](https://img.shields.io/badge/Backend-ASP.NET%20Core-512BD4?logo=dotnet&logoColor=white)  
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)  
![Contributions](https://img.shields.io/badge/contributions-welcome-orange)  

VaultX is a secure **full-stack digital banking platform** providing seamless onboarding, role-based access (Customer, Clerk, Manager, Admin), and advanced banking features like **KYC verification, fund transfers, investments, statements, and account management**.  

This project demonstrates a **real-world banking workflow** with modern UI/UX and enterprise-grade security.  

---

## 🚀 Features  

### 🔹 Customer Portal  
- Digital account opening with **multi-step KYC** (PAN/Aadhaar upload, Video KYC).  
- Role-based dashboard with balance, transactions, and account status.  
- Secure login via **Email/Mobile OTP**.  
- Banking services: **Fund Transfer, Add Money, Apply Cards, Recharge, Investments**.  
- PDF statement download & transaction history.  

### 🔹 Employee Portal (Clerk / Manager / Admin)  
- Role-based authentication & access.  
- **Clerk**: Reviews customer KYC documents.  
- **Manager**: Approves/rejects clerk-verified accounts.  
- **Admin**: Manages employees & customers.  
- Full audit trail of activities.  

### 🔹 System Highlights  
- Modern **React.js frontend** with Tailwind UI.  
- **ASP.NET Core Web API backend** with EF Core & JWT authentication.  
- MySQL database for customer & transaction management.  
- Responsive, mobile-friendly design.  
- Security-first approach (hashed passwords, OTP verification, role-based access).  

---

## 🛠️ Tech Stack  

**Frontend:** React.js, Tailwind CSS, ShadCN UI  
**Backend:** ASP.NET Core Web API, Entity Framework Core  
**Database:** MySQL  
**Authentication:** JWT, OTP-based login  
**Version Control:** GitHub  

---

## 📸 Screenshots  

### 🔹 Homepage  
![Homepage](./ACP%20-%20vaultxfront/src/assets/homepage%20dark.png)  
![Homepage](./ACP%20-%20vaultxfront/src/assets/homepage%20.png)  

### 🔹 Customer Login  
![Customer Login](./ACP%20-%20vaultxfront/src/assets/login%20page.png)  

### 🔹 Register / Open New Account  
![Register](./ACP%20-%20vaultxfront/src/assets/Register.png)  

### 🔹 Customer Dashboard  
![Customer Dashboard](./ACP%20-%20vaultxfront/src/assets/Customer%20dash.png)  

### 🔹 Employee Login (Admin/Manager/Clerk)  
![Employee Login](./ACP%20-%20vaultxfront/src/assets/Emp%20login.png)  

### 🔹 Manager Dashboard (KYC Approvals)  
![Manager Dashboard](./ACP%20-%20vaultxfront/src/assets/manager%20dash.png)  

---

## ⚙️ Installation & Setup  

### 🔹 Clone the repository  
```bash
git clone https://github.com/abhaydcp99/VaultX.git
cd VaultX

🔹 Backend Setup (ASP.NET Core API)

Navigate to backend folder.

Update appsettings.json with your MySQL credentials.

Run database migrations:

dotnet ef database update


Start the API:

dotnet run

🔹 Frontend Setup (React.js)

Navigate to frontend folder.

Install dependencies:

npm install


Start the frontend:

npm start

🔐 Test Credentials
Role	   User ID	   Password
Clerk	   CLK001	     clerk123
Manager	 MNG001	   manager123
Admin	   ADM001	     admin123

📌 Future Enhancements

AI-powered fraud detection.

UPI / QR-based payments.

Loan and credit score module.

Push notifications & email alerts.

🤝 Contribution

Contributions are welcome! Please fork the repo and raise a pull request with detailed description of changes.

👨‍💻 Author

Abhay Chavan
GitHub/abhaydcp99
