import { Router } from "express";
import { BookController } from "./book.controller";

const router = Router();

router.post("/", BookController.createBook);

router.get("/:bookId", BookController.getBookByID);
router.get("/", BookController.getAllBooks);

export const BookRoute = router;
