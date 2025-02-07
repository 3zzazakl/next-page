// eslint-disable-next-line no-unused-vars
import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    // Display loading state
    if (isLoading) return <div className="text-center py-8">Loading...</div>;

    // Display error state
    if (isError) return <div className="text-center py-8 text-red-500">Error fetching orders. Please try again later.</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center text-gray-600">No orders found!</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={order._id} className="border-b border-gray-200 pb-6">
                            {/* Order Header */}
                            <div className="flex items-center justify-between mb-4">
                                <p className="px-2 py-1 bg-secondary text-white text-sm rounded"># {index + 1}</p>
                                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                            </div>

                            {/* Order Details */}
                            <div className="space-y-2">
                                <p className="text-gray-600"><strong>Name:</strong> {order.name}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {order.email}</p>
                                <p className="text-gray-600"><strong>Phone:</strong> {order.phone}</p>
                                <p className="text-gray-600"><strong>Total Price:</strong> ${order.totalPrice}</p>
                            </div>

                            {/* Address Details */}
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">Address</h3>
                                <p className="text-gray-600">
                                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                                </p>
                            </div>

                            {/* Product IDs */}
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">Products</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    {order.productIds.map((productId) => (
                                        <li key={productId}>{productId}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
