const express = require('express');
const router = express.Router();
const Model = require('../models/');

router.get('/', function(req, res) {
  // let err = null;
  // if (req.query) {
  //   err = JSON.parse(req.query.err);
  // }

  let query_str = {
    title: 'title=asc',
    rating: 'rating=asc'
  }

  Model.Song.findAll({ order: [ ['rating', 'DESC'] ]})
   .then(songs => {
     res.render("song", { songs: songs, err: null, query_str:query_str });
   })
   .catch(err => {
     res.send(err)
   })
})

router.post('/', function(req, res) {
  let query_str = {
    title: 'title=asc',
    rating: 'rating=asc'
  }

  Model.Song.create(req.body)
   .then(song => {
     res.redirect('/songs');
   })
   .catch(err => {
    //  res.redirect(`/songs?err=${JSON.stringify(err.errors)}`)
    console.log("MASUK SINI NGGA ??");
    Model.Song.findAll({ order: [ ['rating', 'DESC'] ]})
     .then(songs => {
       res.render("song", { songs: songs, err: err.errors, query_str:query_str });
     })
     .catch(err => {
       res.send(err)
     })
    //  res.render("song", { songs: songs, err: err.errors});
   })
})

router.get('/:id/edit', function(req, res) {
  Model.Song.findById(req.params.id)
   .then(song => {
     res.render('song-edit', {song: song})
   })
   .catch(err => {
     res.send(err);
   })
})

router.post('/:id/edit', function(req, res) {
  Model.Song.update(req.body, {where: {id: req.params.id}})
   .then(song => {
     res.redirect('/songs');
   })
   .catch(err => {
     res.send(err)
   })
})

router.get('/:id/delete', function(req, res) {
  Model.Song.destroy({
    where: {id: req.params.id}
  })
   .then(songDest => {
     res.redirect('/songs');
   })
   .catch(err => {
     res.send(err);
   })
})

router.get('/sort', function(req, res) {
  console.log(req.query);
  let sort_column = Object.keys( req.query )[0]
  let sort_method = req.query[sort_column]

  console.log("COL:", sort_column);
  console.log("METH:", sort_method);

  let query_str = {
    title: 'title=asc',
    rating: 'rating=asc'
  }

  if(sort_method == 'asc') {
    query_str[sort_column] = `${sort_column}=desc`
  } else {
    query_str[sort_column] = `${sort_column}=asc`
  }

  Model.Song.findAll({
    order: [
      [sort_column, sort_method]
    ]
  })
  .then(songs => {
    res.render('song', {songs: songs, err: null, query_str: query_str})
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})

module.exports = router;
