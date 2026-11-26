/******************************************************************************
 * ITE5315 - Assignment 2
 * I declare that this assignment is my own work in accordance with Humber
 * Academic Policy. No part of this assignment has been copied manually or
 * electronically from any other source, including websites, or distributed
 * to other students.
 *
 * I understand that I may use Generative AI for learning, debugging, and
 * brainstorming, but the submitted work must be customized to my selected
 * dataset and I must be able to explain the code and design decisions.
 *
 * Name: Thompson Osei
 * Student ID: N01714324
 * Date: November 2026
 ******************************************************************************/
const Product = require("./models/Product");
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const port = 5500;

// Custom middleware: Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Load the product dataset
const products = require("./data/dataset-final.json");

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// About page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Return all products
app.get("/data", (req, res) => {
    res.json(products);
});

// Return one product by ID
app.get("/data/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(item => item.id === id);

    if (!product) {
        return res.status(404).json({
            error: "Product not found"
        });
    }

    res.json(product);
});

// Search products by name
app.get("/search", (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({
            error: "Please provide a keyword"
        });
    }

    const results = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    res.json(results);
});

// Filter products by category, currency, and tags
app.get("/filter", (req, res) => {
    const category = req.query.category;
    const currency = req.query.currency;
    const tag = req.query.tag;

    if (!category && !currency && !tag) {
        return res.status(400).json({
            error: "Please provide a category, currency, or tag"
        });
    }

    const results = products.filter(product => {
        const categoryMatch = !category ||
            product.category.toLowerCase() === category.toLowerCase();

        const currencyMatch = !currency ||
            product.pricing.currency.toLowerCase() === currency.toLowerCase();

        const tagMatch = !tag ||
            product.tags.some(item => item.toLowerCase() === tag.toLowerCase());

        return categoryMatch && currencyMatch && tagMatch;
    });

    res.json(results);
});

// Custom feature: Random product
app.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * products.length);

    res.json(products[randomIndex]);
});

// new route
// Display products in an HTML table using JavaScript
app.get("/table-js", (req, res) => {
    let html = `
    <html>
    <head>
        <title>Product Inventory Explorer</title>
    </head>
    <body>
        <h1>Product Inventory Explorer</h1>

        <table border="1">
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Tags</th>
                <th>Image</th>
            </tr>
    `;

    products.forEach(product => {
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.pricing.amount} ${product.pricing.currency}</td>
                <td>${product.rating}</td>
                <td>${product.tags.join(", ")}</td>
                <td>
                    <img src="${product.imageUrl}"
                         alt="${product.imageAlt}"
                         width="80">
                </td>
            </tr>
        `;
    });

    html += `
        </table>
    </body>
    </html>
    `;

    res.send(html);
});

// Product Inventory Table using EJS
app.get("/table", (req, res) => {
    res.render("table", {
        pageTitle: "Product Inventory Explorer",
        records: products
    });
});

// Display the Add Product form
app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "add.html"));
});

// Process submitted product form
app.post("/add", (req, res) => {
    const { name, category, price } = req.body;

    // Validate form fields
    if (!name || !category || price === undefined || price === "") {
        return res.status(400).send("All fields are required.");
    }

    if (Number(price) <= 0 || isNaN(Number(price))) {
        return res.status(400).send("Price must be a valid number greater than zero.");
    }

    // Display successful submission
    res.send(`
        <h1>Product Submitted Successfully!</h1>
        <p>Product Name: ${name}</p>
        <p>Category: ${category}</p>
        <p>Price: ${price}</p>
        <a href="/add">Add Another Product</a>
    `);
});

// GET all products from MongoDB Atlas
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            count: products.length,
            products: products
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving products",
            error: error.message
        });
    }
});

// POST a new product to MongoDB Atlas
app.post("/api/products", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });

    } catch (error) {
        res.status(400).json({
            message: "Unable to create product",
            error: error.message
        });
    }
});


// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Page not found"
    });
});

// Connect to MongoDB Atlas before starting the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});