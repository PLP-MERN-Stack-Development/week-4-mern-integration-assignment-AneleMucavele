const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { body } = require('express-validator');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
  ],
  postController.createPost
);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;