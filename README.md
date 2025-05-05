# E-Commerce Shopping Cart API

## 📌 Table of Contents
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Sample Requests](#-sample-requests)

## 🚀 Features

### Product Management
- Create, read, update, and delete products
- Automatic seeding of sample products
- Category-based organization (Electronics, Clothing, Books)

### Shopping Cart
- Add/remove items from cart
- Adjust quantities
- Real-time total calculations

### Financial Calculations
- **10% flat discount** on entire cart
- **Category-specific tax rates**:
  - Electronics: 18%
  - Clothing: 5% 
  - Books: 0%

### Receipt Generation
- Formatted plain-text receipts
- Detailed item breakdown
- Clear tax and discount calculations

## 📋 Prerequisites

- Node.js v16 or higher
- SQL Server 2019+
- NestJS CLI (`npm i -g @nestjs/cli`)
- Git (for version control)

## 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/shopping-cart.git
   cd shopping-cart

2.Install dependencies:
    npm install

## 🗃 Database Setup

1. Create a SQL Server database named shopping_cart
2. The system will automatically:

Create tables on startup

Seed sample products if empty

## ▶ Running the Application
```bash
    npm run start:dev
```
##🌐 API Endpoints

Products
Method	Endpoint	Description
POST	/products	Create new product
GET	/products	List all products
GET	/products/:id	Get product details
PUT	/products/:id	Update product
DELETE	/products/:id	Delete product
Cart
Method	Endpoint	Description
POST	/cart/add	Add item to cart
GET	/cart	View cart contents
DELETE	/cart/:productId	Remove item from cart
GET	/cart/receipt	Generate formatted receipt

## 🧪 Testing

```bash
npm run test
```

## 📤 Sample Requests

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone",
    "price": 799,
    "category": "electronics"
  }'
```




