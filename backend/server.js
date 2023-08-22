const path = require('path')
require('dotenv').config();
const express = require('express');
const {errorHandler} = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const res = require('express/lib/response');
const app = express();

connectDB()
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

//goals api routes
app.use('/api/goals',require('./routes/api/goalRoutes'));

//users api routes
app.use('/api/users',require('./routes/api/userRoutes'));

//serv frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
}else{
    app.get('/', (req,res) => res.send('Please set to production'))
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));