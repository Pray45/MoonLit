import { Router } from "express";
import {
  searchBooks,
  getBookDetails,
} from "./books.controller.js";

const BookRouter = Router();

BookRouter.get("/search", searchBooks);
BookRouter.get("/:id", getBookDetails);

export default BookRouter;