require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: console.log, // This will log the SQL queries
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

// Middleware
app.use(express.json());

// Import controllers (moved here to avoid duplicate imports)
const bandsController = require('./controllers/bands_controller');
const eventsController = require('./controllers/events_controller');
const stagesController = require('./controllers/stages_controller');

// Use routes
app.use('/bands', bandsController);
app.use('/events', eventsController);
app.use('/stages', stagesController);

// Basic route for testing
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Music Tour API!</h1>
    <ul>
      <li><a href="/bands">Bands</a></li>
      <li><a href="/events">Events</a></li>
      <li><a href="/stages">Stages</a></li>
    </ul>
  `);
});

// Enable TimescaleDB extension
async function enableTimescaleDB() {
  try {
    await sequelize.query('CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;');
    console.log('TimescaleDB extension enabled');
  } catch (error) {
    console.error('Error enabling TimescaleDB extension:', error);
  }
}

// Test database connection and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connected to TimescaleDB');
    
    await enableTimescaleDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = { sequelize }; // Export sequelize for use in models/controllers