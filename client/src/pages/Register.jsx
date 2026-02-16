import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Add API call or auth logic
    console.log("Register with:", name, email, password);
  };

  return (
    <AuthWrapper>
      <h2>Register</h2>
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
        <Button type="submit" className="register">Register</Button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </AuthWrapper>
  );
};

export default Register;
