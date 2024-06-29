
# Paytm Clone

This project is a clone of Paytm, featuring functionalities like user signup, signin, dashboard with balance display, user management, and money transfer capabilities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Folder Structure](#folder-structure)
  - [Pages and Components](#pages-and-components)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Signup and Signin functionalities using JWT tokens.
- **Dashboard:** Displays user balance and provides navigation to send money to other users.
- **Send Money:** Allows authenticated users to transfer money to other registered users.
- **User Management:** Lists all users with the ability to search and send money to specific users.
- **Responsive Design:** UI is designed to be responsive using Tailwind CSS.

## Technologies Used

### Frontend

- **React:** Frontend framework for building user interfaces.
- **React Router:** Routing library for navigating between different views.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Axios:** Promise-based HTTP client for making API requests.

### Backend

- **Node.js:** Runtime environment for executing JavaScript code server-side.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database used to store user data and transaction records.
- **JWT (JSON Web Tokens):** Authentication mechanism for securing API endpoints.
- **bcryptjs:** Library for hashing passwords before storing in the database.

## Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14.x or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kraj2503/paytm--clone.git
   cd paytm-clone
   ```

2. **Install dependencies:**

   ```bash
   cd frontend
   npm install   # or yarn install
   ```

   ```bash
   cd backend
   npm install   # or yarn install
   ```

3. **Set up environment variables:**

   Create a `config.js` file in the `backend` directory and configure the following variables:

   ```plaintext
   const JWT_SECRET = "your_secret_code"
   const mongoid = "mongodb+srv://"
   module.exports={
    JWT_SECRET,
    mongoid
    };
   ```

    Replace `your_jwt_secret` with a secure string for JWT token encryption.

4. **Run the backend server:**

   ```bash
   cd backend
   node index.js   # or yarn start
   ```

   The backend server should start running on `http://localhost:3000`.

5. **Run the frontend development server:**

   ```bash
   cd frontend
   npm run dev   
   ```

   The frontend development server should start running on `http://localhost:5173`.

## Backend

### API Endpoints

- **POST /api/v1/user/signup**: Create a new user.
- **POST /api/v1/user/signin**: Authenticate user and generate JWT token.
- **PUT /api/v1/user/**: Modify details of a user.
- **GET /api/v1/user/me**: Fetch current user's details.
- **GET /api/v1/user/bulk**: Fetch all users with optional filtering.
- **GET /api/v1/account/balance**: Fetch user's account balance.
- **POST /api/v1/account/transfer**: Initiate money transfer to another user.

## Frontend

### Folder Structure

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── index.jsx
├── index.css
└── vite.config.js
```

### Pages and Components

- **Signup**: Allows new users to create an account with first name, last name, email, and password.
- **Signin**: Authenticates existing users with email and password.
- **Dashboard**: Displays user's balance and provides navigation to send money.
- **SendMoney**: Form to initiate money transfer to another user.
- **Components**: Reusable UI components like buttons, input boxes, headers, and navigation links.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
