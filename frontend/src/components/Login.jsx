import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.scss";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const hasDefaultUser = users.some((u) => u.username === "user");
    if (!hasDefaultUser) {
      users.push({ username: "user", password: "1234" });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.dispatchEvent(new Event("loginStateChange"));
      alert("Login successful!");
      navigate("/todo");
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <form className="login-container" onSubmit={handleLogin}>
      <div className="login-item">
        <p>Username</p>
        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Enter your username"
          onChange={handleChange}
        />
      </div>
      <div className="login-item">
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
