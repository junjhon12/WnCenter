const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate user & get token (Login)
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // 1. Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 2. See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // 3. Check password
      // We use bcrypt.compare to check the plain-text password against the hashed one
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // 4. If all good, create the JWT Payload
      const payload = {
        user: {
          id: user.id 
          // Mongoose abstracts this, so we can use .id instead of ._id
        }
      };

      // 5. Sign the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // Expires in 100 hours (for testing)
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // Send the key to the user
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;