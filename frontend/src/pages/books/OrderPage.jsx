import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching orders</div>;
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>
            {
                orders.length === 0 ? (<div>No orders found</div>) : (<div> {
                    orders.map((order, index) => (
                            <div key={order._id} className="flex flex-row justify-between items-center">
                            <p className="font-medium"># {index + 1}</p>
                            <h2 className="font-bold">Order ID: {order._id}</h2>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Email: {order.email}</p>
                            <p className="text-gray-600">Phone: {order.phone}</p>
                            <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
                            <h3 className="font-bold">Address:</h3>
                            <p className="text-gray-600">{order.address.city}, {order.address.state} {order.address.zipcode} {order.address.country}</p>
                            <h3 className="font-bold">Product IDs:</h3>
                            <ul className="list-disc ml-8 text-gray-600">
                                {order.productIds.map((productId) => (
                                    <li key={productId}>{productId}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
                    </div>)
            }
        </div>
    )
}   

export default OrderPage
