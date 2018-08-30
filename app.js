const express = require('express');
const app = express();

const helper = require('./helper/helper');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const songs = require('./routes/song');
const playlists = require('./routes/playlist');
const index = require('./routes/index');

app.use((req, res, next)=>{
    res.locals.convertRating = helper;
    next()
});

app.use('/', index);
app.use('/songs', songs);
app.use('/playlists', playlists);


app.listen(process.env.PORT || 3000, function() {
  console.log("I am listen on port 3000");
})
