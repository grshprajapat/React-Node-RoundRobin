import React, { useEffect, useState } from 'react';
import { getTeams, createTask } from '../api';
import './style/style.css'

function TaskForm() {
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teams, setTeams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      getTeamsFromApi();
    }, []);
  
    const getTeamsFromApi = async () => {
      try {
        const teamsData = await getTeams();
        console.log("eEEe",teamsData)
        setTeams(teamsData);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };
  
    const handleTaskDescriptionChange = (e) => {
      setTaskDescription(e.target.value);
    };
  
    const handleTeamChange = (e) => {
      setSelectedTeam(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createTask({ description: taskDescription, teamId: selectedTeam });
        setTaskDescription('');
        setSelectedTeam('');
        setErrorMessage('');
      } catch (error) {
        console.error('Failed to create task:', error);
        setErrorMessage('Failed to create task. Please try again.');
      }
    };
  
    return (
      <div className="task-form-container">
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
          ></textarea>
          <select value={selectedTeam} onChange={handleTeamChange}>
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <button type="submit">Assign Task</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
  
export default TaskForm;
