require('dotenv').config();
const express = require('express');
const {errorHandler} = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();

connectDB()
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

//members api routes
app.use('/api/goals',require('./routes/api/goalRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));