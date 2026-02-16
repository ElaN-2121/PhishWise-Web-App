import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add API call or auth logic
    console.log("Login with:", email, password);
  };

  return (
    <AuthWrapper>
      <h2>Login</h2>
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
        <Button type="submit" className="login">Login</Button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </AuthWrapper>
  );
};

export default Login;
