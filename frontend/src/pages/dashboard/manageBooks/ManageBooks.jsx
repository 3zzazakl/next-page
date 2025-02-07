import React from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageBooks = () => {
  const navigate = useNavigate();
  const { data: books, refetch } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert('Book deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting book:', error.message);
      alert('Failed to delete book. Please try again.');
    }
  };

  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-book/${id}`);
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 align-middle border border-solid border-blueGray-100">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 align-middle border border-solid border-blueGray-100">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 align-middle border border-solid border-blueGray-100">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 align-middle border border-solid border-blueGray-100">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-left text-blueGray-500 bg-blueGray-50 align-middle border border-solid border-blueGray-100">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {books &&
                  books.map((book, index) => (
                    <tr key={book._id}>
                      <td className="px-6 py-4 text-xs text-blueGray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-xs">{book.title}</td>
                      <td className="px-6 py-4 text-xs text-center">{book.category}</td>
                      <td className="px-6 py-4 text-xs">${book.newPrice}</td>
                      <td className="px-6 py-4 text-xs space-x-4">
                        <Link
                          to={`/dashboard/edit-book/${book._id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="font-medium bg-red-500 py-1 px-4 rounded-full text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBooks;
