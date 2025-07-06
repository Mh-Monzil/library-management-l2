import { model, Schema } from "mongoose";
import { IBorrow, IBorrowMethods, IBorrowModel } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow, IBorrowModel, IBorrowMethods>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
});

borrowSchema.static(
  "checkStock",
  async function (id: string, quantity: number) {
    const book = await Book.findById(id);
    if (!book) throw new Error("Book not found");

    if (book.copies < quantity) throw new Error("Not enough copies available");

    book.copies -= quantity;
    if (book.copies === 0) book.available = false;
    await book.save();
    return true;
  }
);

export const Borrow = model<IBorrow, IBorrowModel>("Borrow", borrowSchema);
