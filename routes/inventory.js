const express = require("express")
const router = express.Router()

const category_controller = require("../controllers/category_controller")
const product_controller = require("../controllers/product_controller")

router.get("/", product_controller.index)

// product routes 
router.get("/products", product_controller.get_products_list)

router.get("/product/create", product_controller.get_product_create)
router.post("/product/create", product_controller.post_product_create)

router.get("/product/:id", product_controller.get_product_read)

router.get("/product/:id/update", product_controller.get_product_update)
router.post("/product/:id/update", product_controller.post_product_update)

router.get("/product/:id/delete", product_controller.get_product_delete)
router.post("/product/:id/delete", product_controller.post_product_delete)

// category routes

router.get("/categories", category_controller.get_categories_list)

// create

router.get("/category/create", category_controller.get_category_create)
router.post("/category/create", category_controller.post_category_create)

// read
router.get("/category/:id", category_controller.get_category_read)

// update
router.get("/category/:id/update", category_controller.get_category_update)
router.post("/category/:id/update", category_controller.post_category_update)

// delete
router.get("/category/:id/delete", category_controller.get_category_delete)
router.post("/category/:id/delete", category_controller.post_category_delete)


module.exports = router