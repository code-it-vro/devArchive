import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = async () => {
    if (text.trim() === "") return;

    if (editId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/todos/${editId}`,
          { text }
        );
        setTodos(
          todos.map((todo) => (todo._id === editId ? response.data : todo))
        );
        setEditId(null);
        setText("");
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/todos", {
          text,
        });
        setTodos([...todos, res.data]);
        setText("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setText(todo.text);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="bg-blue-500 p-6">
          <h1 className="text-3xl font-extrabold text-center text-white tracking-tight">
            Todo List
          </h1>
        </div>
        <div className="p-6">
          <div className="flex mb-4 space-x-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter a new task..."
            />
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ease-in-out transform hover:scale-105 ${
                editId
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200"
              >
                <span className="flex-grow mr-2">{todo.text}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200 transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
