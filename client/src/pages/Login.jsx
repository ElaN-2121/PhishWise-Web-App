import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save everything in one place
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: data.name,
          role: data.role,
          token: data.token,
        })
      );

      navigate("/dashboard");

      // Optional: force navbar refresh (quick fix method)
      window.location.reload();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthWrapper>
      <h2>Login</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleLogin}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <Button type="submit" className="login">
          Login
        </Button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </AuthWrapper>
  );
};

export default Login;
