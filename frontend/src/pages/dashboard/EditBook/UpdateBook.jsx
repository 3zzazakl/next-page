import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
    const { id } = useParams();
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
    
    const [updateBook] = useUpdateBookMutation()
    const { register, handleSubmit, setValue, reset } = useForm();
    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('description', bookData.description);
            setValue('category', bookData.category);
            setValue('trending', bookData.trending);
            setValue('oldPrice', bookData.oldPrice);
            setValue('newPrice', bookData.newPrice);
            setValue('coverImage', bookData.coverImage);
        }
    }, [bookData, setValue])

    const onSubmit = async (data) => {
        const updatedBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || bookData.coverImage,
        };

        try {
            await axios.put(`${getBaseUrl()}/api/books/${id}`, updatedBookData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            Swal.fire({
                title: 'Book updated',
                text: 'Your book has been updated successfully!',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, it\'s Okay!',
            });
            await refetch();
        } catch (error) {
            console.log("Error updating book", error);
            alert('Failed to update book. Please try again.')
        }
    }

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching book</div>;
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Input fields */}
                <InputField
                    label="Title"
                    name="title"
                    placeHolder="Enter book title"
                    register={register}
                />

                {/* textArea */}
                <InputField
                    label="Description"
                    name="description"
                    placeHolder="Enter book description"
                    type="textArea"
                    register={register}
                />
                {/* Select Field */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose a category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />

                {/* Trending checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    placeHolder="Enter old price"
                    type="number"
                    register={register}
                />

                {/* New Price */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    placeHolder="Enter new price"
                    type="number"
                    register={register}
                />

                {/* Cover Image */}
                <InputField
                    label="Cover Image"
                    name="coverImage"
                    placeHolder="Enter cover image"
                    type="file"
                    register={register}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-white font-bold rounded-md"> 
                    Update Book
                    </button>
            </form>
        </div>
    )
}

export default UpdateBook;
