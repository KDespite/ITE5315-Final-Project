
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./data/products.json");

const importProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGO_DB_NAME
        });

        console.log("Connected to MongoDB Atlas");

        await Product.deleteMany({});

        const formattedProducts = products.map(product => ({
            ...product,
            productId: String(product.productId)
        }));

        await Product.insertMany(formattedProducts);

        console.log(`${formattedProducts.length} products imported successfully`);

        await mongoose.connection.close();
        console.log("Database connection closed");

    } catch (error) {
        console.error("Import failed:", error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
};

importProducts();
