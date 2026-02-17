import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: data.name,
          role: data.role,
          token: data.token,
        })
      );

      navigate("/dashboard");
      window.location.reload();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthWrapper>
      <h2>Register</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleRegister}>
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

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
          placeholder="Create a password"
        />

        <Button type="submit" className="register">
          Register
        </Button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthWrapper>
  );
};

export default Register;
