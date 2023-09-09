// models/Team.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Team = sequelize.define('team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Team;
