import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import FilterButtons from "./FilterButtons";
import { createTask, deleteTask, getTasks } from "../Api/taskApi";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // 🔁 Fetch tasks on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("❌ Failed to fetch tasks", err);
      }
    };
    fetchData();
  }, []);

  // ➕ Add task
  const handleAdd = async (title) => {
    try {
      const newTask = await createTask(title);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("❌ Failed to create task", err);
    }
  };

  // ❌ Delete task
  const handleDelete = async (taskId) => {
    if (!taskId) {
      console.warn("⚠️ taskId is undefined");
      return;
    }

    try {
      await deleteTask(taskId); // ✅ Use correct variable
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("❌ Failed to delete task", err);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
    // TODO: Add update API if needed
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Manager</h1>
      <TaskInput onAdd={handleAdd} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
