const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://next-page.vercel.app'],
    credentials: true,
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const statsRoutes = require('./src/stats/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Book store API is running!');
    });
}

main().then(() => console.log("MongoDB connected")).catch(err => console.error(err));

app.listen(port, () => console.log(`Server running on port ${port}`));
