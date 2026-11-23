# ITE5315 Assignment 2 – Product Inventory Explorer

## Student Information

- **Name:** Thompson Osei
- **Student ID:** N01714324
- **Course:** ITE5315 – Web Programming and Framework 1
- **Assignment:** Assignment 2

## 1. Project Description

Product Inventory Explorer is a Node.js and Express application that allows users to retrieve, search, filter, and display product information from a JSON dataset.

This project continues Assignment 1 by enriching the original dataset and adding more advanced routes, middleware, HTML forms, and EJS table rendering.

## 2. Dataset Profile

### Dataset Theme
Products

### Dataset Name
Sample Products Dataset

### Source
JSONConsole Sample Products Dataset

### Original Format
JSON

### Number of Records
60

### Main Entity
Product

### Unique ID Field
id

### Text Search Field
name

### Category/Filter Field
category

### Why I Selected This Dataset
I selected the Products dataset because it contains useful product information such as product names, categories, prices, stock levels, and ratings. It is suitable for practicing searching, filtering, and retrieving records using Node.js and Express.

### Dataset Enrichment
The original dataset was enhanced with additional information, including:

- Product image URLs and image metadata.
- Geolocation information.
- Nested pricing information containing amount and currency.
- Product tags stored in arrays.

The enriched dataset is stored in `data/dataset-final.json`.

## 3. Dataset Field Mapping

| App Purpose | Dataset Field |
|---|---|
| Unique identifier | id |
| Product name | name |
| Keyword search | name |
| Category filter | category |
| Nested price information | pricing.amount |
| Currency | pricing.currency |
| Product tags | tags |
| Product image | imageUrl |
| Product rating | rating |

## 4. Application Routes

| HTTP Method | Route | Purpose |
|---|---|---|
| GET | `/` | Home page |
| GET | `/about` | About page |
| GET | `/data` | Return all products |
| GET | `/data/:id` | Return one product |
| GET | `/search?keyword=value` | Search products by name |
| GET | `/filter?category=value` | Filter by category |
| GET | `/filter?currency=USD` | Filter using nested currency |
| GET | `/filter?tag=budget` | Filter using product tags |
| GET | `/random` | Return a random product |
| GET | `/table-js` | Display products using JavaScript-generated HTML |
| GET | `/table` | Display products using EJS |
| GET | `/add` | Display the product submission form |
| POST | `/add` | Process and validate submitted product information |
| Any wrong route | 404 | Return a not-found response |

## 5. Custom Feature

**Feature Name:** Random Product

**Route:** `/random`

**Purpose:** Returns one randomly selected product from the dataset.

**Why it is useful:** It allows users to quickly discover a product from the inventory.

**Testing:** I opened `/random` in the browser, confirmed that a product was returned, and refreshed the page to test another selection.

## 6. Custom Middleware and Request Logger

A custom middleware was implemented to log incoming HTTP requests.

It displays the request method and URL in the VS Code terminal.

For example:

`GET /data`

The middleware uses `next()` to allow the request to continue to the appropriate route.

Express URL-encoded middleware was also added to process HTML form submissions.

## 7. HTML Form and Validation

The application includes a product submission form located at:

`public/add.html`

The form collects:

- Product name
- Category
- Price

The GET `/add` route displays the form, while POST `/add` processes submitted information.

Server-side validation checks that required fields are provided and that the price is a valid number greater than zero.

**Note:** The current form confirms successful submissions but does not permanently save new products to the JSON dataset.

## 8. JavaScript Table and EJS Table

The application provides two different table implementations.

### `/table-js`

This route uses JavaScript in `server.js` to generate HTML dynamically and display product records.

### `/table`

This route uses the EJS template engine to display product records through `views/table.ejs`.

### What does `app.set("view engine", "ejs")` do?

It configures Express to use EJS as its template engine. This allows the application to generate HTML pages using dynamic data.

### What does `res.render("table", { records: products })` do?

It renders the `table.ejs` template and passes the product dataset into the template through the variable named `records`.

### What changed in table.ejs?

I added a product inventory heading and columns for product ID, product name, category, price, currency, rating, tags, and images.

I also used EJS syntax to loop through the product records and display nested pricing information and product tags.

## 9. Styling

The stylesheet is located at:

`public/style.css`

It provides:

- Arial font styling.
- Table borders.
- Table spacing and padding.
- A grey table header.
- Rounded product images.

Express serves static files from the public folder using static middleware.

## 10. How to Run the Application

1. Open the project folder in VS Code.
2. Open the terminal.
3. Install dependencies:

   `npm install`

4. Start the server:

   `node server.js`

5. Open the application:

   `http://localhost:5500/`

## 11. Technologies Used

- Node.js
- Express.js
- JavaScript
- HTML
- CSS
- JSON
- EJS

## 12. Project Folder Structure

```text
Asn2-Osei/
│
├── data/
│   ├── dataset.json
│   ├── dataset-enriched.json
│   └── dataset-final.json
│
├── public/
│   ├── index.html
│   ├── about.html
│   ├── add.html
│   └── style.css
│
├── tools/
│   ├── add-geolocation.js
│   ├── add-nested-pricing.js
│   └── add-random-images.js
│
├── views/
│   └── table.ejs
│
├── server.js
├── package.json
├── package-lock.json
├── ai-use.md
├── development-log.md
└── README.md
```

## 13. Deployment

## 13. Deployment

The application was successfully deployed to Vercel.

Production URL:
https://asn2-osei.vercel.app

The deployed application was tested successfully, including the
home page, product dataset, product retrieval, and EJS table.

Deployment platform: Vercel
Deployment status: Successful

## 14. Conclusion

This project extends the original Product Inventory Explorer by introducing dataset enrichment, additional filtering capabilities, custom middleware, form validation, JavaScript-generated tables, and EJS rendering.

It provides practical experience with Node.js, Express, JSON data handling, and server-side web development.



# ITE5315 Individual Final Project – Phase 0

## Project Name
Product Inventory Explorer – Secure REST API

## Project Overview
This project continues my Assignment 2 Product Inventory Explorer application. The goal is to transform the existing Express application into a persistent and secure REST API using Node.js, Express, MongoDB Atlas, Mongoose and JWT authentication.

The application will allow users to explore products and registered users to save products and manage personal reviews.

## Existing Application
The Assignment 2 application currently supports:
- Viewing product records.
- Searching products by keyword.
- Filtering by category, currency and tags.
- Displaying products using JavaScript and EJS tables.
- Adding product information through a validated form.
- Express middleware and request logging.

**Existing deployed application:**  
https://asn2-osei.vercel.app


## Dataset Information

**Dataset:** Product catalogue dataset (source under review).

**Target:** 150 product records.

**Selection Criteria:**
- Readable product names.
- Unique product identifiers.
- Brand information.
- Product categories.
- Pricing information.
- Usable product descriptions and other relevant fields.

The project will use 150 selected product records from a suitable product catalogue. The records will be reviewed, cleaned and prepared for MongoDB Atlas using Mongoose.

The planned dataset structure will include product names, brands, categories, pricing, availability, images and other relevant product information where available. Original product identifiers and source information will be preserved where possible.

**Source Attribution:** The final dataset source and applicable reuse licence will be confirmed before database import.


## New Business Workflow
As a registered user, I want to save products to my personal collection and write product reviews so that I can keep track of products I am interested in.

## Proposed MongoDB Collections
1. **products:** Imported product catalogue and reference data.
2. **users:** User account information, including email and hashed password.
3. **savedItems:** Products saved by individual users.
4. **reviews:** Product reviews and ratings linked to their authors.

User-owned records will contain an `ownerId` reference. Users will only be able to modify their own records.

## Planned API Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/products` | List products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/saved-items` | Save a product |
| GET | `/api/saved-items` | List personal saved products |
| PUT | `/api/saved-items/:id` | Update saved item |
| DELETE | `/api/saved-items/:id` | Delete saved item |
| POST | `/api/reviews` | Create review |
| GET | `/api/products/:id/reviews` | Get product reviews |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get authenticated user |

## Planned Filters and Sorting
- Filter products by category.
- Filter products by currency.
- Sort products by price in ascending or descending order.
- Support pagination.

## Project Milestones

| Phase | Deadline | Planned work |
|---|---|---|
| Phase 0 | Nov 22, 2026 | Planning, dataset review, Trello and GitHub |
| Phase 1 | Nov 25, 2026 | MongoDB Atlas, Mongoose models, GET and persistent POST |
| Phase 2 | Dec 2, 2026 | Complete CRUD, filtering, sorting and pagination |
| Phase 3 | Dec 9, 2026 | Registration, login, JWT and ownership authorization |
| Phase 4 | Dec 16, 2026 | Deployment, documentation, Postman tests and video |
| Presentation | Dec 17, 2026 | Individual project demonstration |

## Project Management
**GitHub repository:**  
https://github.com/KDespite/ITE5315-Final-Project.git

**Trello board:**  
https://trello.com/b/YQ3raic0/ite5315-final-project-osei

## Technologies
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- Postman
- GitHub
- Trello
- Vercel

## AI Use Disclosure
ChatGPT was used to assist with project planning, organizing the dataset description, proposing database collections, drafting API routes and preparing milestones. The proposed design and documentation will be reviewed and verified by the student.

## Project Status
Final dataset selection, validation and preparation will be completed before Phase 1 database import.