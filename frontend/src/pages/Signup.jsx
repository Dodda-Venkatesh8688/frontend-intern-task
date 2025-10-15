import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful! Please login.");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-3">
        <input placeholder="Name" className="border p-2" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" className="border p-2" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border p-2" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
