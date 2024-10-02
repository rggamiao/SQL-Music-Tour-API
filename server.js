require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import and use your routes here
// const bandRoutes = require('./routes/bandRoutes');
// app.use('/api/bands', bandRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });