import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching book</div>;
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{book.title}</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <img src={`${getImgUrl(book.coverImage)}`} alt="Book Cover" className="w-full md:w-1/2 rounded-md" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex flex-col">
                    <p className="text-gray-600 mb-2"><strong>Author: </strong>{book.author || 'admin'}</p>
                    <p className="text-gray-600 mb-2"><strong>Published: </strong> {new Date(book?.publishedAt).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-2"><strong>Category: </strong>{book?.category}</p>
                    <p className="text-gray-600 mb-2"><strong>Description: </strong>{book.description}</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                    <FiShoppingCart className="mr-2" /> <span>Add to Cart</span>
                    </button>
            </div>
        </div>
    )
}  

export default SingleBook



