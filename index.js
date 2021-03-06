const mongoose = require('mongoose');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost',{ useNewUrlParser: true ,useUnifiedTopology: true })
 .then(()=> console.log('Connectd to mongoose...'))
 .catch(err => console.error('Could not connect to mongoose...',err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));