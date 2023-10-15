const mongoose = require("mongoose");
const {ProductCategories} = require("./Categories");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    Price: {
        type: Number,
    },
    Quantity: {
        type: Number,
    },
    Images: {
        type: String,
    },
    Category: {
        type: String,
        enum:ProductCategories,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Product", productSchema);
