const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// @route   POST /api/auth/register
router.post('/register', registerValidation, register);

// @route   POST /api/auth/login
router.post('/login', loginValidation, login);

// @route   GET /api/auth/profile  (protected - requires Bearer token)
router.get('/profile', protect, getProfile);

module.exports = router;
