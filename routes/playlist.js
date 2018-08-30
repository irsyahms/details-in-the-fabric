const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function(req, res) {
  Model.Playlist.findAll()
   .then(playlists => {
     res.render('playlist', { playlists: playlists })
   })
   .catch(err => {
     res.send(err)
   })
})

router.get('/:id/addSong', function(req, res) {
  let playlist = null;
  Model.Playlist.findById(req.params.id)
   .then(pl => {
     playlist = pl;
     return Model.Song
      .findAll({
        where: {
          PlaylistId: null
        }
       })
   })
   .then(songs => {
     res.render('playlist-addSong', { playlist: playlist, songs: songs })
   })
   .catch(err => {
     res.send(err);
   })
})

router.get('/:id/addSong/:idSong', function(req, res) {
  Model.Song
   .update(
     { PlaylistId: req.params.id },
     { where: {
       id: req.params.idSong
     }})
   .then(song => {
     res.redirect(`/playlists/${req.params.id}/addSong`);
   })
   .catch(err => {
     res.send(err);
   })
})

router.get('/:id/viewPlaylist', function(req, res) {
  Model.Playlist.findById(req.params.id, {include: [Model.Song]})
   .then(playlist => {
    //  res.send(playlist)
    res.render('viewPlaylist', {playlist: playlist})
   })
   .catch(err => {
     res.send(err);
   })
})

module.exports = router;
