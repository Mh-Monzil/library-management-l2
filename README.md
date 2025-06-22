# 📚 Library Management System (Express + TypeScript + MongoDB)

A robust and scalable backend application for managing library books and borrow records. Built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**, this system provides RESTful APIs for CRUD operations on books and managing borrow transactions with validations and error handling.

---

## ✨ Features

- 📖 **Book Management**

  - Create, Read, Update, Delete (CRUD) operations
  - Genre filtering, pagination, and sorting
  - Validation for mandatory fields and allowed genres
  - ISBN uniqueness enforced

- 📦 **Borrow Management**

  - Borrow books with quantity checks
  - Automatically updates availability status
  - Summarized aggregation of total borrowed quantities per book

## 🚀 Tech Stack

- **Backend:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Environment:** Node.js

## 📌 API Endpoints

## Book Routes

| Method | Endpoint             | Description                                               |
| ------ | -------------------- | --------------------------------------------------------- |
| POST   | `/api/books`         | Create a new book                                         |
| GET    | `/api/books`         | Get all books with optional filtering, sorting, and limit |
| GET    | `/api/books/:bookId` | Get a single book by ID                                   |
| PUT    | `/api/books/:bookId` | Update a book (e.g., change copies)                       |
| DELETE | `/api/books/:bookId` | Delete a book by its ID                                   |

## Borrow Routes

| Method | Endpoint      | Description                                           |
| ------ | ------------- | ----------------------------------------------------- |
| POST   | `/api/borrow` | Borrow a book (checks availability and updates stock) |
| GET    | `/api/borrow` | Get borrowed books summary with aggregation           |

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Mh-Monzil/library-management-l2.git
cd library-management-l2

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Fill in your MongoDB URI in the .env file
# Example:
# PORT=5000
# DATABASE_URL=mongodb+srv://dev_monzil:ma7JEpR2chybZbFz@cluster0.j6yhdqz.mongodb.net/library-management-l2?retryWrites=true&w=majority&appName=Cluster0

# Run in development mode
npm run dev

# For production build
npm run build
npm start
```
