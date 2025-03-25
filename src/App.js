import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editId ? { ...task, text: editValue } : task
    ));
    setEditId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue('');
  };

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      
      <div className="task-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {editId === task.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <span 
                  onClick={() => toggleComplete(task.id)}
                  className="task-text"
                >
                  {task.text}
                </span>
                <div className="task-actions">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
    </div>
  );
}

export default App;