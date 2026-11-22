const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get("/",productController.find);
router.get("/:id",productController.findById);
router.post("/",productController.create);
router.put("/:id",productController.findByIdandUpdate);
router.delete("/:id",productController.findByIdandDelete);



// Exports
module.exports = router;