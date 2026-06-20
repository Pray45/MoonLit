import axios from "axios";
import Book from "./book.model.js";

export const searchBooks = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query)
            return res.status(400).json({
                success: false,
                message: "Search query required",
            });

        const response = await axios.get(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );

        const books = response.data.docs.map((book) => ({
            openLibraryId: book.key?.split("/").pop(),
            title: book.title,
            authors: book.authors || [],
            authorIds: book.author_key || [],
            cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : null,
            publishYear: book.first_publish_year || null,
        }));

        return res.status(200).json({
            success: true,
            count: books.length,
            books,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBookDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBook = await Book.findOne({
            openLibraryId: id,
        });

        if (existingBook) {
            return res.json({
                success: true,
                book: existingBook,
            });
        }

        const response = await axios.get(
            `https://openlibrary.org/works/${id}.json`
        );

        const data = response.data;

        // Extract author Open Library IDs
        const authorIds =
            data.authors?.map((author) =>
                author.author.key.split("/").pop()
            ) || [];

        // Fetch author names
        const authors = await Promise.all(
            authorIds.map(async (authorId) => {
                try {
                    const { data } = await axios.get(
                        `https://openlibrary.org/authors/${authorId}.json`
                    );

                    return data.name;
                } catch (err) {
                    console.error(
                        `Failed to fetch author ${authorId}:`,
                        err.message
                    );
                    return null;
                }
            })
        );

        const book = await Book.create({
            openLibraryId: id,
            title: data.title,

            description:
                typeof data.description === "string"
                    ? data.description
                    : data.description?.value,

            genres: data.subjects || [],

            authors: authors.filter(Boolean),
            authorIds,
        });

        return res.json({
            success: true,
            book,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};