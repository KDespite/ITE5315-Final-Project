
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    averagePrice: {
        type: Number,
        required: true,
        min: 0
    },
    totalQuantitySold: {
        type: Number,
        required: true,
        min: 0
    },
    transactionCount: {
        type: Number,
        required: true,
        min: 0
    },
    country: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "GBP"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
