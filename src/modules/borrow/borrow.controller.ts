import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  const checkQuantity = await Borrow.checkStock(
    req.body.book as string,
    req.body.quantity
  );

  if (!checkQuantity) {
    return res.status(400).json({
      success: false,
      message: "Not enough copies available",
    });
  }

  const result = await Borrow.create(req.body);

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
};

const borrowedBookSummary = async (req: Request, res: Response) => {
  const result = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed book summary retrieved successfully",
    data: result,
  });
};

export const BorrowController = {
  borrowBook,
  borrowedBookSummary,
};
