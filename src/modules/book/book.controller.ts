import { Request, Response } from "express";
import { Book } from "./book.model";

const createBook = async (req: Request, res: Response) => {
  try {
    const result = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create book",
      error,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, limit } = req.query;
    const sortBy = req.query.sortBy as string;
    const sort = req.query.sort === "asc" ? 1 : -1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const result = await Book.find(query)
      .sort({ [sortBy]: sort })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
};

const getBookByID = async (req: Request, res: Response) => {
  try {
    const result = await Book.findById(req.params.bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const result = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.bookId, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookByID,
  updateBook,
  deleteBook,
};
