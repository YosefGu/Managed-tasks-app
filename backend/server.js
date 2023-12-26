require('dotenv').config();

// routes
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const port = process.env.PORT;
const mongoURI = process.env.MONGODB;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log('path:', req.path, '| method:', req.method);
    next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);

mongoose.connect(mongoURI)
.then(() => {
    app.listen(port, () => {
        console.log(`connected to db & listening in port: ${port}.`)
    })
})
.catch((error) => {
    console.log(error)
});

