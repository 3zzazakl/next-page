import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../../redux/features/books/booksApi";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import getBaseUrl from "../../../utils/baseURL";

const UpdateBook = () => {
    const { id } = useParams();
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
    const { register, handleSubmit, setValue } = useForm();

    // Pre-fill form with book data
    useEffect(() => {
        if (bookData) {
            setValue("title", bookData.title);
            setValue("description", bookData.description);
            setValue("category", bookData.category);
            setValue("trending", bookData.trending);
            setValue("oldPrice", bookData.oldPrice);
            setValue("newPrice", bookData.newPrice);
            setValue("coverImage", bookData.coverImage);
        }
    }, [bookData, setValue]);

    // Handle form submission
    const onSubmit = async (data) => {
        const updateBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || bookData.coverImage,
        };

        try {
            await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            Swal.fire({
                title: "Book Updated",
                text: "Your book has been updated successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });

            await refetch(); // Refetch the updated book data
        } catch (error) {
            console.error("Failed to update book:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "An error occurred while updating the book. Please try again.",
            });
        }
    };

    // Display loading state
    if (isLoading) return <Loading />;

    // Display error state
    if (isError) return <div className="text-center py-8 text-red-500">Error fetching book data.</div>;

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                {/* Description */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                {/* Category */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: "", label: "Choose A Category" },
                        { value: "business", label: "Business" },
                        { value: "technology", label: "Technology" },
                        { value: "fiction", label: "Fiction" },
                        { value: "horror", label: "Horror" },
                        { value: "adventure", label: "Adventure" },
                    ]}
                    register={register}
                />

                {/* Trending Checkbox */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("trending")}
                        className="rounded text-blue-600 focus:ring focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-semibold text-gray-700">Trending</label>
                </div>

                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                {/* New Price */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                {/* Cover Image URL */}
                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;
