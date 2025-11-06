# Blogify
# 📝 Blogify – MERN Blogging Platform

Blogify is a modern full-stack blogging platform where users can publish their ideas, explore posts from others, and manage their own blogs with full CRUD functionality.

---

## 🚀 Features

-User Authentication (Register / Login)  
-Create blog posts  
-View all users' posts  
-View your own posts  
-Edit your posts  
-Delete your posts  
-JWT-based route protection  
-Responsive UI  

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Axios
- React Router DOM
- Modern CSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

Blogify/
├─ backend/
│ ├─ models/
│ ├─ controllers/
│ ├─ routes/
│ ├─ middleware/
│ └─ server.js
├─ frontend/
│ └─ src/
└─ README.md

---

## ⚙️ Installation & Setup

### 1️ Clone the Repository

```bash
git clone https://github.com/Sneha28-p/Blogify.git
cd Blogify
```

---

### 2 Backend setup

cd backend
npm install

Create .env file inside backend
  PORT=5000
  MONGO_URI=mongodb://127.0.0.1:27017/blogify
  JWT_SECRET=your_secret_key

Start backend
   npm start

---

### 3 Frontend setup

in new terminal
  cd frontend
  npm install
  npm run dev

App runs at
  http://localhost:5173/

---

| Method | Route               | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/users/register | Register user    |
| POST   | /api/users/login    | Login user       |
| POST   | /api/posts          | Create post      |
| GET    | /api/posts          | Get all posts    |
| GET    | /api/posts/mine     | Get user's posts |
| PUT    | /api/posts/:id      | Update post      |
| DELETE | /api/posts/:id      | Delete post      |

---

## 🚧 Future Improvements
Image upload for posts
Comments & likes
User profiles
Rich text editor
Dark mode UI

---

🧑‍💻 Author
  Sneha Patted
  GitHub:@Sneha28-p
