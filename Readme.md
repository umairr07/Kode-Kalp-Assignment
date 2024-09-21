# 📋 KodeKalp Company Assignment

- This project is a MERN stack application that includes user authentication, email verification, and secure session management. The application is built using ReactJS, ExpressJS, and MongoDB, and implements core features such as JWT-based authentication, password hashing, and error handling.

## 🚀 Features

1. 🔐 Signup & Login :

   Users can sign up using email and password.
   JWT tokens are used for secure session management.
   Password hashing is implemented using bcrypt to ensure password security.

2. ✉️ Email Confirmation :

   After signup, a confirmation email is sent to the user's registered email address.
   SMTP protocol is used for sending the verification email.
   Users must click the link in the email to activate their account.
   .

3. 🔑 Secure Session Management :

   JSON Web Tokens (JWT) are used to manage user sessions.
   Tokens are securely stored and used to authenticate user requests.
   Session expiration and token validation are handled properly.

4. 🛡️ Password Security :

   User passwords are hashed using bcrypt before saving to the database.
   Ensures that sensitive data is not stored in plaintext.

5. 🚫 Error Handling :

   Comprehensive error handling is implemented for common issues like:
   Invalid email format
   Incorrect login credentials
   Missing required fields
   Expired or invalid JWT token

## 🛠️ Installation & Setup

### Clone the repository:

```-bash
git clone https://github.com/umairr07/Kode-Kalp-Assignment.git
```

### Navigate to the project directory:

```bash
cd your-repo
```

## Install dependencies:

```bash
npm install
```

### Set up environment variables by creating a .env file in the root directory:

```makefile
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-jwt-secret
MONGO_URI=your-mongo-connection-string
```

### Run the server:

```bash
npm run dev
```

## 💻 Tech Stack

- Frontend: ReactJS
- Backend: ExpressJS, Node.js
- Database: MongoDB
- Authentication: JWT, bcrypt
- Email Service: Nodemailer (with SMTP)
