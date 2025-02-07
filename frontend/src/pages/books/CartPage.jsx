import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Calculate total price of items in the cart
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    // Handle removing an item from the cart
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    // Handle clearing the entire cart
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {/* Cart Header */}
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <button
                        type="button"
                        onClick={handleClearCart}
                        className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Cart Items */}
                <div className="mt-8">
                    <div className="flow-root">
                        {cartItems.length > 0 ? (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((product) => (
                                    <li key={product?._id} className="flex py-6">
                                        {/* Product Image */}
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={getImgUrl(product?.coverImage)}
                                                alt={product?.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to="/">{product?.title}</Link>
                                                    </h3>
                                                    <p className="sm:ml-4">${product?.newPrice}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 capitalize">
                                                    <strong>Category:</strong> {product?.category}
                                                </p>
                                            </div>

                                            {/* Quantity and Remove Button */}
                                            <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                <p className="text-gray-500">
                                                    <strong>Qty:</strong> 1
                                                </p>
                                                <button
                                                    onClick={() => handleRemoveFromCart(product)}
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No products found in your cart!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalPrice || 0}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                </p>

                {/* Checkout Button */}
                <div className="mt-6">
                    <Link
                        to="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        Checkout
                    </Link>
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/">
                        or{" "}
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
