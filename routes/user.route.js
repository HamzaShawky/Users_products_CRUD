// Imports
const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Routes
router.get("/",userController.find);
router.get("/:id",userController.findById);
router.post("/",userController.create);
router.put("/:id",userController.findByIdandUpdate);
router.delete("/:id",userController.findByIdandDelete);


// Exports
module.exports = router;