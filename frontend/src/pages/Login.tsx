import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

import axios from "../api/axios";
import { AuthCredentials } from "../types/auth";

export default function Login() {
  const [form, setForm] = useState<AuthCredentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("/auth/login", form);
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
