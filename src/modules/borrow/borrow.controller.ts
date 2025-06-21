import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  const checkQuantity = await Borrow.checkStock(
    req.body.book as string,
    req.body.quantity
  );

  if (!checkQuantity) {
    res.status(400).json({
      success: false,
      message: "Not enough copies available",
      data: null,
    });
    return;
  }

  const result = await Borrow.create(req.body);

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
};

const borrowedBookSummary = async (req: Request, res: Response) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed book summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve borrowed book summary",
      error,
    });
  }
};

export const BorrowController = {
  borrowBook,
  borrowedBookSummary,
};
