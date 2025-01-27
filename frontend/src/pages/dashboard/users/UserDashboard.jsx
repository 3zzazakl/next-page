import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching orders</div>;

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h2>
                <p className="text-gray-600 mb-4">
                    Welcome, {currentUser.username || 'User'}! Your orders are below.
                </p>
        
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>
                    {orders.length > 0 ? (
                        <ul className="list-disc ml-8 text-gray-600">
                            {orders.map((order) => (
                                <li key={order._id}
                                    className='flex flex-row justify-between items-center'>
                                    <p className="font-medium">Order ID: {order._id}</p>
                                    <p>Data: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                    <p>Total Price: ${order.totalPrice}</p>
                                    {order.productIds.map((productId) => (
                                        <p key={productId}
                                            className="ml-1">{productId}</p>
                                    ))}
                                </li>
                            ))}
                            
                        </ul>
                    ) : (
                        <p className="text-gray-600">You have not placed any orders yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
