# Dayflow — MERN Todo App

A full-stack Todo application built with the **MERN stack** that helps users manage daily tasks with a clean, responsive interface. Create, edit, complete, and delete tasks with real-time persistence through a RESTful API and MongoDB.

## ✨ Features

- **Create Tasks** — Add new tasks to your todo list.
- **Edit Tasks** — Update existing task descriptions.
- **Mark as Complete** — Track completed and pending tasks.
- **Delete Tasks** — Remove tasks you no longer need.
- **Task Statistics** — View task progress and completion status.
- **Responsive UI** — Clean interface for different screen sizes.
- **Persistent Storage** — Store tasks in MongoDB.
- **RESTful API** — Connect the React frontend with the Express backend.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- CSS3
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Tools & Deployment**
- Git and GitHub
- npm
- Render

## 📁 Project Structure

```text
Todo/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── index.js
│   └── package.json
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
├── .env
├── .gitignore
└── package.json
```

*The exact folders may vary depending on your implementation.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or a local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/KNikhith/Todo.git
cd Todo
```

### 2. Install dependencies

From the project root, run:

```bash
npm run build
```

This installs the backend and frontend dependencies and builds the frontend for production.

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

**Important:** Never commit your `.env` file or expose database credentials publicly.

### 4. Run the application

For production-style execution, run:

```bash
npm start
```

This starts the backend, which should serve the built React application if production static-file serving is configured in Express.

For local development, start the backend and frontend in separate terminals using the scripts defined in their respective `package.json` files.

Open the local URL printed by Vite during frontend development.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/add` | Create a task |
| `GET` | `/get` | Retrieve tasks |
| `PUT` | `/edit/:id` | Edit or update task status |
| `PUT` | `/update/:id` | Update a task |
| `DELETE` | `/delete/:id` | Delete a task |

*These endpoints reflect the current project setup described here. Update this table if your backend routes differ.*

## 🚀 Deployment

The application can be deployed as a single web service on [Render](https://render.com/).

1. Push the project to GitHub.
2. Create a new **Web Service** on Render and connect the repository.
3. Set the **Build Command** to:

   ```bash
   npm run build
   ```

4. Set the **Start Command** to:

   ```bash
   npm start
   ```

5. Add `MONGO_URI` in Render's Environment settings.
6. Ensure MongoDB Atlas permits connections from the deployed service.
7. Deploy and open the generated Render URL.

Ensure Express serves the `Frontend/dist` directory and that frontend API requests use relative paths, such as `/get` and `/add`, when both frontend and backend share the same domain.

## 🔒 Security

- Keep credentials and secrets in environment variables.
- Add `.env` to `.gitignore`.
- Use a restricted MongoDB database user.
- Configure MongoDB network access appropriately for production.

## 👨‍💻 Author

**Kotluri Nikhith**

- GitHub: [@KNikhith](https://github.com/KNikhith)

## 📄 License

This project is intended for learning and portfolio purposes. Add a license file if you want to specify the terms under which others may use or distribute the code.
