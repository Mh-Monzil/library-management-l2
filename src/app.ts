import express, { Request, Response } from "express";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/globalErrorHandler";
import routes from "./routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const middleware = [
  cors(corsOptions),
  express.json(),
  express.urlencoded({ extended: true }),
];
app.use(middleware);

// Routes
app.use("/api", routes);

// Initial Route
app.get("/", (req: Request, res: Response) => {
  res.send({ success: true, message: `Sever is Live ⚡` });
});

// 404 Not Found handler (must be after all routes)
app.use(notFoundHandler);

// Global Error handler (must be last)
app.use(errorHandler);

export default app;
