import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { getImgUrl } from "../../utils/getImgUrl";

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    // Handle adding a book to the cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // Display loading state
    if (isLoading) return <div className="text-center py-8">Loading...</div>;

    // Display error state
    if (isError) return <div className="text-center py-8 text-red-500">Error loading book information. Please try again later.</div>;

    return (
        <div className="max-w-lg mx-auto shadow-md p-5 rounded-lg">
            {/* Book Title */}
            <h1 className="text-2xl font-bold mb-6 text-center">{book.title}</h1>

            {/* Book Cover Image */}
            <div className="mb-8">
                <img
                    src={getImgUrl(book.coverImage)}
                    alt={book.title}
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Book Details */}
            <div className="space-y-4">
                <p className="text-gray-700">
                    <strong>Author:</strong> {book.author || "Admin"}
                </p>
                <p className="text-gray-700">
                    <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 capitalize">
                    <strong>Category:</strong> {book?.category}
                </p>
                <p className="text-gray-700">
                    <strong>Description:</strong> {book.description}
                </p>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={() => handleAddToCart(book)}
                className="mt-6 btn-primary px-6 py-2 flex items-center justify-center gap-2 w-full"
            >
                <FiShoppingCart />
                <span>Add to Cart</span>
            </button>
        </div>
    );
};

export default SingleBook;
