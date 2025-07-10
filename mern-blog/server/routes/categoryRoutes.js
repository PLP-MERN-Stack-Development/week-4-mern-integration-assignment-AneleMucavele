const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { body } = require('express-validator');

router.get('/', categoryController.getAllCategories);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required')
  ],
  categoryController.createCategory
);

module.exports = router;