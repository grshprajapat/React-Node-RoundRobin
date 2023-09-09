// TaskList.js (Displaying Tasks)
import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    getTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch tasks:', error);
      });
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
