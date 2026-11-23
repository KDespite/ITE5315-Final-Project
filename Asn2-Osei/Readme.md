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
