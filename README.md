# 🚀 Full-Stack 3D Portfolio Website with Blog & Admin Dashboard

### By: Abdullahi Suleiman

This is a fully functional and production-ready personal portfolio website with integrated blog management. The project is built using modern technologies such as **React.js**, **Three.js**, **Framer Motion**, **Node.js**, **Express**, and **PostgreSQL**. It includes a **beautiful 3D animated interface**, responsive design, and a powerful **admin dashboard** for managing blog content (CRUD).

---

## 🎯 Project Goals

The goal of this project is to showcase a developer’s skills across the full stack — from interactive frontend animations to secure backend systems and database integration. It also serves as a real-world portfolio to attract potential clients or employers.

---

## 📌 Features

### 🌐 Frontend (React + Three.js + Framer Motion)

- 3D animated landing page (Three.js)
- Stunning motion effects (Framer Motion)
- Clean and modern UI design (Tailwind CSS or custom CSS)
- Fully responsive on all devices (mobile, tablet, desktop)
- Project section to showcase your work
- About & Contact sections
- Blog listing & single blog detail page

### 🔐 Backend (Node.js + Express + PostgreSQL)

- RESTful API for blog management
- JWT Authentication for admin login
- Passwords securely hashed with Bcrypt
- Full CRUD functionality for blog posts
- Slug-based blog URLs for SEO
- PostgreSQL database integration
- Middleware for route protection

### 🛡️ Admin Panel

- Admin Login with username & password
- Create, Update, Delete, View blog posts
- Protected routes (admin-only)
- Clean and minimal dashboard interface

---

## 🧰 Tech Stack

| Frontend     | Backend    | Database   | Tools & Libs          |
| ------------ | ---------- | ---------- | --------------------- |
| React.js     | Node.js    | PostgreSQL | Framer Motion         |
| Three.js     | Express.js |            | Bcrypt / JWT Auth     |
| Vanila CSS | REST API   |            | dotenv, cors, nodemon |

---

## 📁 Folder Structure

```
project-root/
├── client/           # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── server/           # Backend (Node.js/Express)
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── db/               # PostgreSQL DB connection
├── .env
├── README.md
```

---

## 🧑‍🏫 How to Start the Project (Beginner Friendly)

Follow these step-by-step instructions to get the portfolio and blog system up and running on your machine:

---

### ✅ Step 1: Install Node.js & npm

First, install **Node.js** which includes `npm` (Node Package Manager):

[Download Node.js](https://nodejs.org/)

Verify installation:

```bash
node -v
npm -v
```

---

### ✅ Step 2: Install PostgreSQL

Download PostgreSQL:  
[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Open **pgAdmin** or terminal and create a database:

```sql
CREATE DATABASE Blogs;
```

---

### ✅ Step 3: Create the Tables

Inside your `Blogs` database, run:

```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  location VARCHAR(100),
  budget VARCHAR(50),
  subject VARCHAR(150),
  message TEXT NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Optional:** Add sample data

```sql
INSERT INTO blogs (title, image_url, content, author)
VALUES (
  'Welcome to My Blog!',
  'https://example.com/sample.jpg',
  'This is my first blog post.',
  'Abdullahi Suleiman'
);
```

---

### ✅ Step 4: Start the Backend Server

Once your database and tables are ready, start the Node.js backend server:

```bash
cd back-end
node server.js
```

You should see:

```
db connection established
Server running on port 5000
```

---

Congratulations! Your backend is now running successfully. 🎉

---

**If you need more help, feel free to open an issue or contact me!**
