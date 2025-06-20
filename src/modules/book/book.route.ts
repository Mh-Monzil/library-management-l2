import { Router } from "express";
import { BookController } from "./book.controller";

const router = Router();

router.post("/", BookController.createBook);

router.get("/:bookId", BookController.getBookByID);
router.get("/", BookController.getAllBooks);

router.patch("/:bookId", BookController.updateBook);

router.delete("/:bookId", BookController.deleteBook);

export const BookRoute = router;
