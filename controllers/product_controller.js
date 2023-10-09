
const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const Product = require("../models/product") // Product = require("./models/product")
const Category = require("../models/category") // Category = require("./models/category")
const { body, check, validationResult } = require("express-validator")

// mongoose = require("mongoose")

const prep_data = (products, categories) => {
    let _products = products.map(p => JSON.parse(JSON.stringify(p)))
    let _categories = categories.map(c => JSON.parse(JSON.stringify(c)))
    products_in_category = _categories.map(c => {
        let _prods = _products.filter(p => p.category === c._id)
        return {
            category: c.name,
            products: _prods.length,
            category_products: _prods,
            inStock: _prods.reduce((prev, next) => prev += (next.stock), 0)
        }
    })
    return products_in_category
}

const prep_products_by_category = (products, categories) => {
    let _products = products.map(p => JSON.parse(JSON.stringify(p)))
    let _categories = categories.map(c => JSON.parse(JSON.stringify(c)))
    products_by_category = {}
    _categories.forEach(c => {
        let _prods = _products.filter(p => p.category === c._id)
        products_by_category[c.name] = {
            products: _prods,
            inStock: _prods.reduce((prev, next) => prev += (next.stock), 0)
        }
    })
    return products_by_category
}


exports.index = asyncHandler(async (req, res, next) => {
    // console.log("NOT YET IMPLEMENTED")

    const [products, categories] = await Promise.all([
        Product.find().exec(),
        Category.find().exec()
    ])
    
    let product_count = products.length
    let category_count = categories.length
    let products_in_category = prep_data(products, categories)

    res.render('index', {
        title: "ConsumerMax Product Inventory",
        product_count: product_count,
        category_count: category_count,
        products_in_category: products_in_category
    })
})

// product routes 
exports.get_products_list = asyncHandler(async (req, res, next) => {
    const [products, categories] = await Promise.all([
        Product.find().populate().exec(),
        Category.find().exec()
    ])
    const products_by_category = prep_products_by_category(products, categories)
    res.render('product_list', {
        title: "ConsumerMax Product List",
        categories: categories,
        products_by_category: products_by_category
    })
}) 


exports.get_product_create = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec();
    
    res.render("product_form",{
        title: "Create Product",
        action: "create",
        categories: categories,
        // products: products
    })
})

exports.post_product_create = [
    // ensure images is an array
    (req, res, next) => {
        if (!(req.body.images instanceof Array)) {
            if (typeof req.body.images === "undefined") {
                req.body.images = []
            } else {
                req.body.images = new Array(req.body.images)
            }
        }
        next();
    },
    // validate the rest

    body("title", "required ....")
        .trim()
        // .isAlphanumeric()
        .isLength({ min: 3})
        .escape(),
    body("description", "required ....")
        .trim()
        // .isAlphanumeric()
        .isLength({ min: 3})
        .escape(),
    body("price", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("discountPercentage", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("rating", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("stock", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("brand", "required ....")
        .trim()
        .isAlphanumeric()
        .isLength({ min: 3})
        .escape(),
    body("category", "required ....")
        .trim()
        // .isMongoId()
        .escape(),

    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)

        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discountPercentage: req.body.discountPercentage,
            rating: req.body.rating,
            stock: req.body.stock,
            brand: req.body.brand,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
            images: req.body.images,
        })

        if (!errors.isEmpty()) {
            const categories = await Category.find().exec()
            res.render("product_form", {
                title: "Create Product",
                categories: categories,
                action: "create",
                product: product,
                errors: errors
            })
        } else {
            await product.save()
            res.redirect(product.url)
        }
    })
]

exports.get_product_read = asyncHandler(async (req, res, next) => {
    // const product = await Product.findById(req.params.id).populate('category').exec()
    const [product, categories] = await Promise.all([
        Product.findById(req.params.id).populate('category').exec(),
        Category.find().exec()
    ])

    if (product === null) {
        const err = new Error("Product not found")
        err.status = 404
        return next(err)
    }
    
    res.render("product_form", {
        title: "Product",
        action: "read",
        categories: categories,
        product: product,
    })
})

exports.get_product_update = asyncHandler(async (req, res, next) => {
    const [product, categories] = await Promise.all([
        Product.findById(req.params.id).populate('category').exec(),
        Category.find().exec()
    ])

    // const product = await Product.findById(req.params.id).populate('category').exec()
    if (product === null) {
        const err = new Error("Product not found")
        err.status = 404
        return next(err)
    }
    
    res.render("product_form", {
        title: "Product",
        action: "update",
        categories: categories,
        product: product,
    })
})
exports.post_product_update = [
    // ensure images is an array
    (req, res, next) => {
        if (!(req.body.images instanceof Array)) {
            if (typeof req.body.images === "undefined") {
                req.body.images = []
            } else {
                req.body.images = new Array(req.body.images)
            }
        }
        next();
    },
    // validate the rest
    body("title", "required ....")
        .trim()
        // .isAlphanumeric()
        .isLength({ min: 3})
        .escape(),
    body("description", "required ....")
        .trim()
        // .isAlphanumeric()
        .isLength({ min: 3})
        .escape(),
    body("price", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("discountPercentage", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("rating", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("stock", "required ....")
        .trim()
        .isNumeric()
        .escape(),
    body("brand", "required ....")
        .trim()
        .isAlphanumeric()
        .isLength({ min: 3})
        .escape(),
    body("category", "required ....")
        .trim()
        // .isMongoId()
        .escape(),
    // body("thumbnail", "required ....")
    //     .trim()
    //     .isLength({ min: 3})
    //     .escape(),

    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)

        const product = new Product({
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discountPercentage: req.body.discountPercentage,
            rating: req.body.rating,
            stock: req.body.stock,
            brand: req.body.brand,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
            images: req.body.images,
            _id: req.params.id
        })

        if (!errors.isEmpty()) {
            const categories = await Category.find().exec()
            res.render("product_form", {
                title: "Create Product",
                action: "update",
                categories: categories,
                product: product,
                errors: errors
            })
            return
        } else {
            let productupdate = await Product.findByIdAndUpdate(req.params.id, product, {})
            res.redirect(productupdate.url)
        }
    })
]

exports.get_product_delete = asyncHandler(async (req, res, next) => {
    const [product, categories] = await Promise.all([
        Product.findById(req.params.id).populate('category').exec(),
        Category.find().exec()
    ])

    if (product === null) {
        const err = new Error("Product not found")
        err.status = 404
        return next(err)
    }
    
    res.render("product_form", {
        title: "Product",
        action: "delete",
        categories: categories,
        product: product,
    })
})
exports.post_product_delete = asyncHandler(async (req, res, next) => {
    // product has no external dependencies so can be deleted summarily
    await Product.findByIdAndRemove(req.body.productid)
    res.redirect("/inventory/products")
})
