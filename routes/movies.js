const {Movies, validate} = require('../Model/movie');
const express = require('express');
const { Genre } = require('../Model/genre');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movies
  .find()
  .sort('title')
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(404).send('Invalid genre.')
  let movies = new Movies({
      title: req.body.title,
      genre:{
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      phdailyRentalRateone:req.body.dailyRentalRate
    });
  movies = await movies.save();

  res.send(movies);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movies = await Movies.findByIdAndUpdate(req.params.id,{
      title: req.body.title, 
      genre:{
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock, 
      dailyRentalRate:req.body.dailyRentalRate},
    { new: true}
    );
  if (!movies) return res.status(404).send('The Movies with the given ID was not found.');

  res.send(movies);
});

router.delete('/:id', async (req, res) => {

  const movies = await Movies.findByIdAndRemove(req.params.id);

  if (!movies) return res.status(404).send('The Movies with the given ID was not found.');

  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movies = await Movies.findById(req.params.id);
  if (!movies) return res.status(404).send('The Movies with the given ID was not found.');
  res.send(movies);
});


module.exports = router;