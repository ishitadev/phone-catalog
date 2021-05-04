const mongoose = require("mongoose");

const CatalogSchema = mongoose.Schema({

    name:
    {
        type: String,
        required: true,
        minlength: 3
    },
    manufacturer:
    {
        type: String,
        required: true,
        minlength: 3
    },
    description:
    {
        type: String,
        required: true,
        minlength: 3
    },
    color:
    {
        type: String,
        required: true,
        minlength: 3
    },
    price:
    {
        type: Number,
        required: true,
    },
    imageFileName:
    {
        type: String,
        required: true,
        minlength: 3
    },
    screen:
    {
        type: String,
        required: true
    },
    processor:
    {
        type: String,
        required: true,
    },
    ram:
    {
        type: Number,
        required: true,
    }
},
    {
        timestamps: false,
    });

const Catalog = mongoose.model("Catalog", CatalogSchema);

module.exports = Catalog;