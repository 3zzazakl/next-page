import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { getImgUrl } from "../../utils/getImgUrl";

const BookCard = ({ book }) => {
    const dispatch = useDispatch();

    // Handle adding a book to the cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // Truncate description if it exceeds 80 characters
    const truncateDescription = (description) => {
        return description.length > 80 ? `${description.slice(0, 80)}...` : description;
    };

    return (
        <div className="rounded-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
                {/* Book Cover Image */}
                <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={getImgUrl(book?.coverImage)}
                            alt={book?.title}
                            className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                {/* Book Details */}
                <div>
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                            {book?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-5">
                        {truncateDescription(book?.description)}
                    </p>
                    <p className="font-medium mb-5">
                        ${book?.newPrice}{" "}
                        <span className="line-through font-normal ml-2">
                            ${book?.oldPrice}
                        </span>
                    </p>
                    {/* Add to Cart Button */}
                    <button
                        onClick={() => handleAddToCart(book)}
                        className="btn-primary px-6 space-x-1 flex items-center gap-1"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
