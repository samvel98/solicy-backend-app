require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes)
// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes and middleware

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
