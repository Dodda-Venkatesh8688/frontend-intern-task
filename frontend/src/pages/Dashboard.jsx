import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { "x-auth-token": token }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", { title }, {
      headers: { "x-auth-token": token }
    });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { "x-auth-token": token }
    });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex gap-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2 flex-1" placeholder="New Task" />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t._id} className="flex justify-between border-b py-2">
            {t.title}
            <button onClick={() => deleteTask(t._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => { localStorage.clear(); window.location = "/"; }} className="bg-gray-600 text-white p-2 mt-5 rounded">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
