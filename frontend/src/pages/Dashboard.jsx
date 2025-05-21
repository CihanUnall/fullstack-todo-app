import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoPage";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    setTodos([
      { id: 1, text: "React öğren", done: false },
      { id: 2, text: "API bağla", done: true },
    ]);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newTodo.trim(),
      done: false,
    };

    setTodos((prev) => [newItem, ...prev]);
    setNewTodo("");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Merhaba, {user?.username} 👋</h2>
      <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
        Çıkış Yap
      </button>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yeni todo ekle..."
          style={{ flex: 1, marginRight: "0.5rem" }}
        />
        <button onClick={handleAddTodo}>Ekle</button>
      </div>

      {todos.length === 0 ? (
        <p>Henüz todo yok.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;
