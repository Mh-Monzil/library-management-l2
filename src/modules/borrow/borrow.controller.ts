import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
};

export const BorrowController = {
  borrowBook,
};
