import express from "express";
import { BookRoute } from "../modules/book/book.route";
import { BorrowRoute } from "../modules/borrow/borrow.route";

const routes = express.Router();

routes.use("/books", BookRoute);
routes.use("/borrow", BorrowRoute);

export default routes;
