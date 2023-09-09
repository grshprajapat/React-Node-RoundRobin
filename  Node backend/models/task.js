// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('task', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assignee: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Task;
