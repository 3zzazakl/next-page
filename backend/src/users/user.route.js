const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Register a new user
router.post('/', async (req, res) => {
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            res.status(404).json({ message: 'Admin not found.' })
        }
        if (admin.password !== password) {
            res.status(401).json({ message: 'Invalid password.' })
        }
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res.status(200).json({
            message: 'Admin registered successfully.',
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(401).send({ message: 'Failed to register admin.' });
    }
})

module.exports = router;
