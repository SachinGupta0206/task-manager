import API from "./axios";

// Get all tasks
export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

// Create task
export const createTask = async (title) => {
  const res = await API.post("/tasks", { title });
  return res.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const res = await API.delete(`/tasks/${taskId}`);
  return res.data;
};
