import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      const { token } = res.data;

      // Save token to localStorage
      localStorage.setItem("token", token);
      alert("✅ Login successful!");
      // Redirect to home or tasks page
      window.location.href = "/";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Login failed. Check credentials.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
