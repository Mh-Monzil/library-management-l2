import { Router } from "express";
import { BorrowController } from "./borrow.controller";

const router = Router();

router.post("/", BorrowController.borrowBook);

export const BorrowRoute = router;
