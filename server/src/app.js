const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieparser = require('cookie-parser');

const app = express();

const authRoutes = require('./routes/auth.routes')
const dataRoutes = require('./routes/data.routes')

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

module.exports = app;