import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send signup request to backend
      await axios.post("http://localhost:5000/api/auth/register", form);

      // Auto-login after signup
      const loginRes = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Save token and redirect
      const { token } = loginRes.data;
      localStorage.setItem("token", token);
      alert("✅ Signup & login successful!");
      window.location.href = "/";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Signup failed. Try a different email.");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
    >
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2"
        required
      />
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
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
