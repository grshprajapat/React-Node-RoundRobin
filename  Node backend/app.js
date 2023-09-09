// app.js
const express = require('express');
const app = express();
const db = require('./config/db');
const cors = require('cors');
// ... other middleware and configurations ...
app.use(express.json());
app.use(cors()); 
// Include the taskRoutes
const taskRoutes = require('./routes/TaskRoutes');
const teamRoutes = require('./routes/TeamRoute');
const teamMemberRoutes = require('./routes/TeamMemberRoute');
// Define a base path for the task routes
app.use('/api/tasks', taskRoutes);
app.use('/api', teamRoutes);
app.use('/api', teamMemberRoutes);
// ... other route definitions ...
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
