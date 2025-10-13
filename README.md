🏠 RESM - Real Estate Share Marketplace (Backend)
📊 Tokenized Real Estate Trading Platform built with Node.js, Express, and MongoDB
📘 Overview

RESM (Real Estate Share Marketplace) is a backend service that powers a marketplace where users can list real estate properties, buy/sell shares of those properties, and see price fluctuations based on real-time supply-demand behavior — just like a stock market for real estate.

This backend also includes:

Dynamic share price recalculation

User wallet management

Ownership tracking via holdings

Transaction recording

Automatic price updates after each trade

⚙️ Tech Stack
Component	Technology
Runtime	Node.js
Framework	Express.js
Database	MongoDB + Mongoose
Auth (if added)	JWT-based
Environment Management	dotenv
Server Testing	Postman / Thunder Client
🚀 Features

🧍‍♂️ Single user role (User = Buyer, Seller, or Property Owner)

🏘️ Property listing with auto-generated IDs

💰 Wallet-based transactions

📈 Dynamic price updates based on supply-demand logic

🔁 Holdings management for every user

🧾 Transaction recording for full market transparency

⚡ RESTful API design for frontend integration

🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/<your-username>/resm-backend.git
cd resm-backend

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in your root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key   # if using auth
BASE_URL=http://localhost:5000

4️⃣ Start the server
npm run dev


Server runs on:
👉 http://localhost:5000

📡 API Documentation

All the API testing inputs and outputs using postman are given in postman.md file present in project's root directory

🧾 Example Flow

1️⃣ User A creates a property → owns all 1000 shares
2️⃣ User B buys 100 shares → system deducts from A’s holdings, adds to B’s holdings
3️⃣ System recalculates property price
4️⃣ Price updates automatically → shown on frontend
5️⃣ Both users’ wallets and holdings adjust accordingly

👨‍💻 Frontend Developer Notes

All prices and balances are numeric values (in rupees).

All secured routes require JWT token in header:
Authorization: Bearer <token>

The frontend should hit the /update-price route after every buy/sell transaction to display new prices immediately.

Display wallet balance and holdings after every successful transaction.

🧑‍💼 Author

Devang Vaishnav (SpectreKnight69)
💻 Backend Developer — Node.js, Express, MongoDB