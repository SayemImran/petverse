# 🐾 Petverse

An ultra-modern SaaS marketplace platform connecting animals in need with forever homes while empowering local animal shelters with modern management tools.

---

## 🛠️ Tech Stack

*   **Next.js** – Full-stack framework leveraging App Router and Server Actions.
*   **MongoDB** – Document-based database for scalable pet profiles and user metadata.
*   **Better-Auth** – Modern, secure authentication framework handling sessions and security.
*   **JWT (JSON Web Tokens)** – Lightweight, stateless tokens for secure API and route protection.

---

## 📦 Core Packages

*   **Hero UI** – Modern, accessible component library delivering sharp glassmorphism layouts.
*   **React Icons** – Robust, multi-set icon library (utilizing `io5` and `fa6` frameworks).
*   **Sonner** - Notification system for different type of message
*   **jose-cjs** - For JWT token verification with backend

---

## ⚡ Getting Started

Follow these steps to spin up the application locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/petverse.git](https://github.com/your-username/petverse.git)
cd petverse
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Configuration
Create a .env.local file in the root directory and configure your keys:
```bash
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your_jwt_private_secret
```
### 4. Launch Development Server
```bash
npm run dev
```

## Live: https://petverse-bd.vercel.app/