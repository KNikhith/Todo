
import React, { useEffect, useState } from "react";
import Create from "./Create";
import "./App.css";
import axios from "axios";
import {
  BsCircle,
  BsCheckCircleFill,
  BsTrash3,
  BsPencilSquare,
  BsCheckLg,
  BsX,
  BsListCheck,
} from "react-icons/bs";

const API = "";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [updatetask, setUpdatetask] = useState("");
  const [taskid, setTaskid] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/get`)
      .then((result) => setTodos(result.data))
      .catch(() => setError("Unable to load tasks. Please try again."));
  }, []);

  const edit = async (id) => {
    try {
      setError("");
      const todo = todos.find((item) => item._id === id);
      if (!todo) return;

      await axios.put(`${API}/edit/${id}`);

      setTodos((current) =>
        current.map((item) =>
          item._id === id ? { ...item, done: !todo.done } : item
        )
      );
    } catch {
      setError("Unable to update task status.");
    }
  };

  const startEditing = (todo) => {
    setTaskid(todo._id);
    setUpdatetask(todo.task);
    setError("");
  };

  const cancelEditing = () => {
    setTaskid("");
    setUpdatetask("");
    setError("");
  };

  const Update = async (id) => {
    const task = updatetask.trim();

    if (!task) {
      setError("Task cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await axios.put(`${API}/update/${id}`, { task });

      setTodos((current) =>
        current.map((todo) =>
          todo._id === id ? { ...todo, task } : todo
        )
      );

      cancelEditing();
    } catch {
      setError("Unable to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const Hdelete = async (id) => {
    try {
      setError("");
      await axios.delete(`${API}/delete/${id}`);

      setTodos((current) => current.filter((todo) => todo._id !== id));

      if (taskid === id) cancelEditing();
    } catch {
      setError("Unable to delete task. Please try again.");
    }
  };

  const completed = todos.filter((todo) => todo.done).length;
  const pending = todos.length - completed;

  return (
    <main className="todo-app">
      <header className="app-header">
        <div className="app-brand">
          <span className="brand-icon">
            <BsListCheck />
          </span>
          <span>DAYFLOW</span>
        </div>

        <p className="app-eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Make today <span>count.</span></h1>
        <p className="app-subtitle">
          Small steps, big progress. Keep your day on track.
        </p>
      </header>

      <section className="todo-panel">
        <Create />

        <div className="task-overview">
          <div>
            <h2>Your tasks</h2>
            <p>Everything you want to get done.</p>
          </div>

          <span className="task-count">
            {todos.length} {todos.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <div className="task-stats">
          <div className="stat-card">
            <span className="stat-label">Total tasks</span>
            <strong>{todos.length}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">In progress</span>
            <strong>{pending}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <div className="task-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <BsListCheck />
              </span>
              <h3>Your space to get things done</h3>
              <p>Add your first task above and start making progress.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <article
                className={`task ${todo.done ? "task-completed" : ""}`}
                key={todo._id}
              >
                <button
                  type="button"
                  className={`complete-btn ${todo.done ? "is-done" : ""}`}
                  onClick={() => edit(todo._id)}
                  aria-label={
                    todo.done ? "Mark task incomplete" : "Mark task complete"
                  }
                  title={todo.done ? "Mark incomplete" : "Complete task"}
                >
                  {todo.done ? <BsCheckCircleFill /> : <BsCircle />}
                </button>

                <div className="task-content">
                  {taskid === todo._id ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={updatetask}
                      autoFocus
                      maxLength={200}
                      aria-label="Edit task"
                      onChange={(e) => setUpdatetask(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !saving) Update(todo._id);
                        if (e.key === "Escape") cancelEditing();
                      }}
                    />
                  ) : (
                    <>
                      <p className="task-text">{todo.task}</p>
                      <span className="task-status">
                        {todo.done ? "Completed" : "In progress"}
                      </span>
                    </>
                  )}
                </div>

                <div className="task-actions">
                  {taskid === todo._id ? (
                    <>
                      <button
                        type="button"
                        className="action-btn save-btn"
                        onClick={() => Update(todo._id)}
                        disabled={saving || !updatetask.trim()}
                        aria-label="Save task"
                        title="Save changes"
                      >
                        <BsCheckLg />
                      </button>

                      <button
                        type="button"
                        className="action-btn cancel-btn"
                        onClick={cancelEditing}
                        disabled={saving}
                        aria-label="Cancel editing"
                        title="Cancel"
                      >
                        <BsX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="action-btn edit-btn"
                        onClick={() => startEditing(todo)}
                        aria-label="Edit task"
                        title="Edit task"
                      >
                        <BsPencilSquare />
                      </button>

                      <button
                        type="button"
                        className="action-btn delete-btn"
                        onClick={() => Hdelete(todo._id)}
                        aria-label="Delete task"
                        title="Delete task"
                      >
                        <BsTrash3 />
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <footer className="task-footer">
            <span>
              <BsCheckCircleFill /> {completed} of {todos.length} completed
            </span>
            <span>Keep going ✦</span>
          </footer>
        )}
      </section>

      <p className="app-footer">BUILT FOR FOCUS. DESIGNED FOR PROGRESS.</p>
    </main>
  );
};

export default Home;
