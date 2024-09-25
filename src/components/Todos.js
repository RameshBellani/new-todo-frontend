// frontend/src/components/Todos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todos.css'; // Import the CSS file for styles

const API_URL = 'https://new-todo-jn8g.onrender.com';

const Todos = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`, {
          headers: { Authorization: `Bearer ${token}` } // Add 'Bearer ' prefix
        });
        setTodos(response.data);
      } catch (error) {
        setError('Error fetching todos');
        console.error('Error fetching todos', error);
      }
    };

    fetchTodos(); // Call fetchTodos on component mount
  }, [token]);

  const addTodo = async () => {
    try {
      const response = await axios.post(`${API_URL}/todos`, { task }, {
        headers: { Authorization: `Bearer ${token}` } // Add 'Bearer ' prefix
      });
      setTodos([...todos, response.data]);
      setTask('');
      setError(''); // Clear error message on success
    } catch (error) {
      setError('Error adding todo');
      console.error('Error adding todo', error);
    }
  };

  const updateTodo = async (id, status) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` } // Add 'Bearer ' prefix
      });
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)));
      setError(''); // Clear error message on success
    } catch (error) {
      setError('Error updating todo');
      console.error('Error updating todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Add 'Bearer ' prefix
      });
      setTodos(todos.filter((todo) => todo.id !== id));
      setError(''); // Clear error message on success
    } catch (error) {
      setError('Error deleting todo');
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div className="todos-container">
      <h2>Your Todos</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className="todo-text">{todo.task}  {todo.status}</span>
            <div className="button-group">
              <button onClick={() => updateTodo(todo.id, 'completed')} className="complete-button">Complete</button>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
