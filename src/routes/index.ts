import express from "express";
import { BookRoute } from "../modules/book/book.route";

const routes = express.Router();

routes.use("/books", BookRoute);

export default routes;
