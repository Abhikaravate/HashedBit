import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue.trim()
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleDelete = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

  const sortedTasks = [...tasks].sort((a, b) => 
    a.text.localeCompare(b.text)
  );

  return (
    <div className="container">
      <h2 className="header">My Todo List</h2>

      <div className="inputGroup">
        <input
          type="text"
          className="input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className="addButton" 
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </div>

      <ul className="list">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <li key={task.id} className="listItem">
              <span className="taskText">{task.text}</span>
              <button
                className="deleteButton"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="emptyState">No tasks yet!</p>
        )}
      </ul>
    </div>
  );
}

export default App;