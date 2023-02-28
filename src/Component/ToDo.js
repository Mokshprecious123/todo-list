import React, { useState } from 'react';
import '../App.css';
import { useEffect } from 'react';

const getLocalItems = () => {
  let tasks = localStorage.getItem("tasks")
  if (tasks) {
    return JSON.parse(localStorage.getItem("tasks"))
  } else {
    return[]
  }
}


function Todo() {
  const [tasks, setTasks] = useState(getLocalItems());
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');





  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);



  // Function to add a new task
  const addTask = () => {
    setTasks([...tasks, { task: newTask ,done: false }]);
    setNewTask('');
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Function to start editing a task
  const startEditingTask = (index) => {
    setEditingTask(index);
    setEditingTaskText(tasks[index].task);
  };

  // Function to cancel editing a task
  const cancelEditingTask = () => {
    setEditingTask(null);
    setEditingTaskText('');
  };

  // Function to update a task
  const updateTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].task = editingTaskText;
    setTasks(newTasks);
    setEditingTask(null);
    setEditingTaskText('');
  };

  




  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">ToDo List</h1>

      <form onSubmit={addTask}>
      <div className="todo-list-add-container">
        <input type="text" className="todo-list-add-input" value={newTask} onChange={(event) => setNewTask(event.target.value)} />
        <button className="todo-list-add-button" onClick={addTask}>Add Task</button>
      </div>
      </form>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className="todo-list-item">
        

            {editingTask === index ? (
              <input type="text" className="todo-list-edit-input" value={editingTaskText} onChange={(event) => setEditingTaskText(event.target.value)}/>
            ) : (
              task.done ? <del>{task.task}</del> : task.task
            )}
            {editingTask === index ? (
              <div className="todo-list-edit-buttons">
                <button className="todo-list-save-button" onClick={() => updateTask(index)}>Save</button>
                <button className="todo-list-cancel-button" onClick={cancelEditingTask}>Cancel</button>
              </div>
            ) : (
              <button className="todo-list-edit-button" onClick={() => startEditingTask(index)}>Edit</button>
            )}
            <button className="todo-list-delete-button" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;