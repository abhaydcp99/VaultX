VaultX — Full-Stack Secure Banking System

VaultX is a secure, full-stack banking platform built with modern technologies. It supports OTP login, digital KYC (including WebRTC video verification, PAN/Aadhaar uploads), multi-role workflows (Clerk & Manager), automated account creation, email alerts, and core banking ops like balance inquiry, deposits, withdrawals, fund transfers, and PDF statement generation.
GitHub

Features ::

Secure Authentication: OTP-based user login ensures one-time, secure access.

Digital KYC: Supports WebRTC-based video verification and PAN/Aadhaar document uploads.

Multi-role Workflow: Clerk → Manager approval flow for enhanced compliance.

Core Banking Functionality ::

View balances

Deposit & withdraw funds

Transfer between accounts

Auto-generate PDF statements

Automated Account Creation: Seamlessly establishes new accounts upon approval.

Email Alerts: Automatic notifications for account activity and status updates.

Tech Stack ::

Frontend: JavaScript — ~84.6%
GitHub

Backend / APIs: C# — ~8.1%
GitHub

Other languages: Java (~6.4%), with minimal use of others
GitHub

Getting Started ::

Clone the repository

git clone https://github.com/abhaydcp99/VaultX.git
cd VaultX


Frontend Setup ::

cd vaultx-frontend-folder
npm install
npm start


Backend Setup :: C#/.NET :

cd backend-folder
dotnet restore
dotnet run


Configuration ::

Set up your environment variables (OTP service, email SMTP, database, storage for KYC uploads, etc.).

Modify according to your local or production environment.

Workflow :

Register via OTP.

Go through KYC (video + document upload).

Clerk reviews and approves → Manager approves.

Account gets auto-created.

Use banking operations: balance checks, transfers, etc.

Receive email notifications and downloadable PDF statements.

Usage Demo ::

Uploading Soon........

Why VaultX?

VaultX offers a robust, end-to-end banking solution — from secure onboarding to transaction handling and regulatory compliance (e.g. KYC). It’s ideal for:

FinTech startups testing digital banking workflows

Learning platforms or instructors teaching full-stack web banking apps

Developers exploring OTP and video-based KYC processes

Contributing ::

Contributions are welcome! Feel free to:

Report bugs or file feature requests via Issues

Submit enhancements via Pull Requests

Ask questions or start discussions via Discussions

Roadmap & Vision ::

Add multi-language support

Expand KYC to include OCR or AI-based validation

Add audit logs and advanced reporting



Summary Table ::

Component	                 Description

Authentication	         OTP-based secure login
KYC              	       WebRTC video + PAN/Aadhaar uploads
Workflow	               Clerk/Manager role-based approvals
Banking Features	       Balance, deposit, withdrawal, fund transfers
Notifications	           Email alerts for key events
Statements	             On-demand PDF generation
