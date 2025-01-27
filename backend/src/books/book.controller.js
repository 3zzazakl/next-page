const book = require('./book.model');

const postABook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book added successfully", book: newBook })
    } catch (error) {
        console.error("Error adding book", error);
        res.status(500).send({ message: "Error adding book" })
    }
}

// get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    } catch (error) {
        console.error("Error getting books", error);
        res.status(500).send({ message: "Error getting books" })
    }
}

const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book not found" })
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error getting book", error);
        res.status(500).send({ message: "Error getting book" })
    }
}

// update book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).send({ message: "Book not found" })
        }
        res.status(200).send({ message: "Book updated successfully", book: updatedBook })
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({ message: "Error updating book" })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book not found" })
        }
        res.status(200).send({ message: "Book deleted successfully", book: deletedBook })
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({ message: "Error deleting book" })
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
}
