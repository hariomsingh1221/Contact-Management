const expressAsyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc for contacts
// @route GET /api/users/signup
// @access public
const signup = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// @desc for contacts
// @route GET /api/users/login
// @access public
const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Checking fields validity
        if (!email || !password) {
            return res.status(404).json({ error: 'All Fields are required' });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        }, 'your-secret-key', { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Server error' });
    }

});

// @desc for contacts
// @route GET /api/users/username
// @access private
const getUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { signup, login, getUser };
