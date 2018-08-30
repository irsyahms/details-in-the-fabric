'use strict';
module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define('Playlist', {
    namePlaylist: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Playlist.associate = function(models) {
    Playlist.hasMany(models.Song);
  }

  return Playlist;
};
