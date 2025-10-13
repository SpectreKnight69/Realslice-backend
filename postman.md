Step 1: Test Server Health
GET http://localhost:3000/
output :
🏠 Real Estate Share Market API is running...

Step 2: User Management Testing

2.1 Register First User
POST http://localhost:3000/api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

output :
{
    "message": "User registered successfully",
    "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "$2b$10$64M1RGP3kdP2NJpes8GHQeDIk0ymMANZpDq5fhvkh6W/.LEAmpdIK",
        "wallet": 100000,
        "_id": "68eb7105bb624365613e9d84",
        "holdings": [],
        "createdAt": "2025-10-12T09:12:37.650Z",
        "updatedAt": "2025-10-12T09:12:37.650Z",
        "__v": 0
    }
}

2.2 Register Second User
POST http://localhost:3000/api/users/register
{
  "name": "Jane Smith", 
  "email": "jane@example.com",
  "password": "password123"
}

output : 
{
    "message": "User registered successfully",
    "user": {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "password": "$2b$10$aruaml2v5sHe9bHrcdq5Xu9AsAhMxiIo8kPb.Wc1Xm1o.TAfzw2Ly",
        "wallet": 100000,
        "_id": "68eb7251bb624365613e9d87",
        "holdings": [],
        "createdAt": "2025-10-12T09:18:09.892Z",
        "updatedAt": "2025-10-12T09:18:09.892Z",
        "__v": 0
    }
}

2.3 Login User 1
POST http://localhost:3000/api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}

output :
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWI3MTA1YmI2MjQzNjU2MTNlOWQ4NCIsImlhdCI6MTc2MDI2MDc1NywiZXhwIjoxNzYwMzQ3MTU3fQ.lno1vvJh7fEPw3rh4_-JcZrR3ygtyF3myp7YkrvKjTw"
}


2.4 Login User 2
POST http://localhost:3000/api/users/login
{
  "email": "jane@example.com",
  "password": "password123"
}

output :
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWI3MjUxYmI2MjQzNjU2MTNlOWQ4NyIsImlhdCI6MTc2MDI2MDg1OCwiZXhwIjoxNzYwMzQ3MjU4fQ.FuLxcdPG487FyPAxjrMi3hnMZElwXV3wCCpGkNCx4OE"
}

2.5 Get User Profile
GET http://localhost:3000/api/users/me
Headers: Authorization: Bearer <USER1_TOKEN>

output 1 :
{
    "user": {
        "id": "68eb7105bb624365613e9d84",
        "name": "John Doe",
        "email": "john@example.com",
        "wallet": 100000,
        "holdings": [],
        "createdAt": "2025-10-12T09:12:37.650Z",
        "updatedAt": "2025-10-12T09:12:37.650Z"
    }
}

output 2 :
{
    "user": {
        "id": "68eb7251bb624365613e9d87",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "wallet": 100000,
        "holdings": [],
        "createdAt": "2025-10-12T09:18:09.892Z",
        "updatedAt": "2025-10-12T09:18:09.892Z"
    }
}

Step 3: Property Management Testing
3.1 Create Property (User 1)
POST http://localhost:3000/api/properties
Headers: Authorization: Bearer <USER1_TOKEN>
output :
{
    "name": "Luxury Apartment Mumbai",
    "location": "Bandra West, Mumbai",
    "currentPrice": 1000,
    "totalShares": 1000,
    "availableShares": 1000,
    "owner": "68eb7105bb624365613e9d84",
    "_id": "68eb7459bb624365613e9d91",
    "createdAt": "2025-10-12T09:26:49.158Z",
    "updatedAt": "2025-10-12T09:26:49.158Z",
    "propertyId": "PROP00003",
    "__v": 0
}

3.2 Create Second Property (User 2)
POST http://localhost:3000/api/properties
Headers: Authorization: Bearer <USER2_TOKEN>
{
  "name": "Commercial Office Delhi",
  "location": "Connaught Place, Delhi", 
  "currentPrice": 1500,
  "totalShares": 500
}

output :
{
    "name": "Commercial Office Delhi",
    "location": "Connaught Place, Delhi",
    "currentPrice": 1500,
    "totalShares": 500,
    "availableShares": 500,
    "owner": "68eb7251bb624365613e9d87",
    "_id": "68eb74cebb624365613e9d94",
    "createdAt": "2025-10-12T09:28:46.480Z",
    "updatedAt": "2025-10-12T09:28:46.480Z",
    "propertyId": "PROP00004",
    "__v": 0
}

3.3 Get All Properties
GET http://localhost:3000/api/properties
output :
[
    {
        "_id": "68eb7459bb624365613e9d91",
        "name": "Luxury Apartment Mumbai",
        "location": "Bandra West, Mumbai",
        "currentPrice": 1000,
        "totalShares": 1000,
        "availableShares": 1000,
        "owner": {
            "_id": "68eb7105bb624365613e9d84",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "createdAt": "2025-10-12T09:26:49.158Z",
        "updatedAt": "2025-10-12T09:26:49.158Z",
        "propertyId": "PROP00003",
        "__v": 0
    },
    {
        "_id": "68eb74cebb624365613e9d94",
        "name": "Commercial Office Delhi",
        "location": "Connaught Place, Delhi",
        "currentPrice": 1500,
        "totalShares": 500,
        "availableShares": 500,
        "owner": {
            "_id": "68eb7251bb624365613e9d87",
            "name": "Jane Smith",
            "email": "jane@example.com"
        },
        "createdAt": "2025-10-12T09:28:46.480Z",
        "updatedAt": "2025-10-12T09:28:46.480Z",
        "propertyId": "PROP00004",
        "__v": 0
    }
]

3.4 Get Property Details
GET http://localhost:3000/api/properties/PROP00003

output : 
{
    "property": {
        "propertyId": "PROP00003",
        "name": "Luxury Apartment Mumbai",
        "location": "Bandra West, Mumbai",
        "currentPrice": 1000,
        "totalShares": 1000,
        "availableShares": 1000,
        "owner": {
            "name": "John Doe",
            "email": "john@example.com"
        },
        "createdAt": "2025-10-12T09:26:49.158Z",
        "updatedAt": "2025-10-12T09:26:49.158Z"
    }
}

3.5 Get Property Sell Orders (Empty)
GET http://localhost:3000/api/properties/PROP00003/sell-orders

output : 
{
    "propertyId": "PROP00003",
    "propertyName": "Luxury Apartment Mumbai",
    "sellOrders": []
}

Step 4: Trading System Testing
4.1 Create Sell Order (User 1)
POST http://localhost:3000/api/transactions/sell-order
Headers: Authorization: Bearer <USER1_TOKEN>

{
  "propertyId": "PROP00012",
  "shares": 100,
  "pricePerShare": 1200
}

output :
{
    "message": "Sell order created successfully",
    "order": {
        "propertyId": "PROP00012",
        "sellerId": "68eb7105bb624365613e9d84",
        "shares": 100,
        "pricePerShare": 1200,
        "_id": "68ecc77b54a8231f4cd9f118",
        "timestamp": "2025-10-13T09:33:47.650Z",
        "__v": 0
    }
}
User 1's holdings reduced by 100 shares

4.2 Check Property Sell Orders
GET http://localhost:3000/api/properties/PROP00012/sell-orders

output :
{
    "propertyId": "PROP00012",
    "propertyName": "Green City Apartment",
    "sellOrders": [
        {
            "orderId": "68ecc77b54a8231f4cd9f118",
            "seller": {
                "name": "John Doe",
                "email": "john@example.com"
            },
            "shares": 100,
            "pricePerShare": 1200,
            "totalValue": 120000,
            "timestamp": "2025-10-13T09:33:47.650Z"
        }
    ]
}

4.3 Buy from Sell Order (User 2)
POST http://localhost:3000/api/transactions/buy-order
Headers: Authorization: Bearer <USER2_TOKEN>
{
  "orderId": "<SELL_ORDER_ID_FROM_STEP_4.1>",
  "sharesToBuy": 50
}

output :
{
    "message": "Purchase completed successfully",
    "transaction": {
        "userId": "68eb7251bb624365613e9d87",
        "propertyId": "PROP00012",
        "type": "buy",
        "shares": 50,
        "price": 1200,
        "_id": "68ecc8db54a8231f4cd9f12e",
        "timestamp": "2025-10-13T09:39:39.417Z",
        "__v": 0
    }
}

User 2 pays ₹60,000 (50 × ₹1200)
User 1 receives ₹60,000
User 2 gets 50 shares of PROP00001
Property price not updated due to less than 5 transactions

4.4 Check Updated Sell Order
GET http://localhost:3000/api/properties/PROP00001/sell-orders

output :
{
    "propertyId": "PROP00012",
    "propertyName": "Green City Apartment",
    "sellOrders": [
        {
            "orderId": "68ecc77b54a8231f4cd9f118",
            "seller": {
                "name": "John Doe",
                "email": "john@example.com"
            },
            "shares": 50,
            "pricePerShare": 1200,
            "totalValue": 60000,
            "timestamp": "2025-10-13T09:33:47.650Z"
        }
    ]
}
50 shares deducted...

5.1 Manual Price Update
POST http://localhost:3000/api/properties/PROP00001/update-price
output : 
{
    "message": "Insufficient transaction data (1 transactions). Minimum 5 transactions required for stable price calculation.",
    "propertyId": "PROP00012",
    "oldPrice": 1000,
    "newPrice": 1000,
    "changePercent": 0
}

Step 6: Advanced Trading Scenarios
6.1 and 6.2 already completed

6.3 Complete Buy Order (Fill Remaining)
Sell order deleted (0 shares remaining)

Step 7: Error Handling Testing
7.1 Invalid Login
POST http://localhost:3000/api/users/login
{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}

output :
{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}

7.2 Unauthorized Access
GET http://localhost:3000/api/users/me
output :
{
    "message": "Unauthorized"
}

7.4 Non-existent Property
GET http://localhost:3000/api/properties/PROP99999
{
    "message": "Property not found"
}