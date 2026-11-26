# Product Inventory Explorer – Secure REST API

## Project Overview

This project extends the Product Inventory Explorer developed in Assignment 2 into a secure REST API using Node.js, Express, MongoDB Atlas, and Mongoose.

The application manages product information and provides API endpoints for retrieving and creating product records. Future development will introduce JWT authentication and additional security features.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Postman
- JSON

## Project Links

- **GitHub Repository:** https://github.com/KDespite/ITE5315-Final-Project

## Dataset

The project uses the Online Retail dataset (`Online Retail.xlsx`).

The original dataset contains retail transaction records. A Python script (`extract_products.py`) was used to prepare a catalogue of 150 unique products based on StockCode.

The prepared dataset contains:

- Product ID
- Product name
- Average price
- Total quantity sold
- Transaction count
- Country
- Currency

The prepared product records are stored in `data/products.json`.

## Database Configuration

MongoDB Atlas is used as the cloud database.

Database name: `ITE5315_FinalProject`

Collection name: `products`

Mongoose is used to define the Product schema and interact with MongoDB.

Database credentials are stored in the `.env` file and are excluded from Git using `.gitignore`.

## Current Implementation – Phase 1

### Completed

- Prepared a catalogue containing 150 unique products.
- Created the MongoDB Atlas database and `products` collection.
- Installed Mongoose and dotenv.
- Configured the MongoDB Atlas connection.
- Created the Product Mongoose model.
- Imported 150 product records into MongoDB Atlas.
- Implemented `GET /api/products`.
- Tested the GET endpoint successfully, returning HTTP 200 OK and 150 products.

### In Progress

- `POST /api/products` has been implemented but currently returns HTTP 404 Not Found in testing. Further debugging is required.

### Pending

- Debug and verify the POST endpoint.
- Implement `GET /api/products/:id`.
- Complete the Postman collection.
- Test successful and unsuccessful API requests.
- Implement JWT authentication and authorization.
- Complete the remaining security requirements.
- Deploy the completed secure REST API.

## API Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/api/products` | Retrieve all products from MongoDB | Tested – HTTP 200 |
| POST | `/api/products` | Create a new product | Implemented – debugging required |
| GET | `/api/products/:id` | Retrieve a product by ID | Pending |

## Running the Project Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
MONGO_DB_NAME=ITE5315_FinalProject
```

Do not commit your actual database credentials to GitHub.

### 3. Start the server

```bash
node server.js
```

The application runs locally at:

```text
http://localhost:5500
```

### 4. Test the GET endpoint

```text
http://localhost:5500/api/products
```

The verified response currently contains 150 product records.

## Project Structure

```text
Asn2-Osei/
│
├── config/
│   └── db.js
│
├── data/
│   ├── dataset-final.json
│   ├── products.json
│   └── Online Retail.xlsx
│
├── models/
│   └── Product.js
│
├── public/
├── views/
│
├── importProducts.js
├── server.js
├── .env
├── .gitignore
└── README.md
```

## Development Progress

Development is being completed in phases according to the ITE5315 Individual Final Project requirements.

The current focus is database integration, REST API functionality, API testing, and preparation for JWT-based security implementation.