const Order = require('./order.model');

const createOrder = async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).json({ message: "Error creating order." });
    }
};


const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const order = await Order.find({ email }).sort({ createdAt: -1 });
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error getting order by email: ", error);
        res.status(500).json({ message: "Error getting order by email." });
    }
}

module.exports = {
    createOrder,
    getOrderByEmail
}
