'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Title must be fill!`
        }
      }
    },
    singerName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Singer must be fill!`
        }
      }
    },
    releasedYear: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Released Year must be an number'
        }
      }
    },
    genre: DataTypes.STRING,
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 1,
          msg: 'Min. number for rating is 1'
        },
        max: {
          args: 5,
          msg: 'Max. number for rating is 10'
        }
      }
    },
    PlaylistId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeValidate: (song, options) => {
        if (song.releasedYear === '') {
          song.releasedYear = -1;
        }
      },
      beforeCreate: (song, options) => {
        if (song.releasedYear === -1) {
          song.releasedYear = new Date().getFullYear();
        }
      }
    }
  });

  Song.associate = function(models) {
    Song.belongsTo(models.Playlist);
  }

  Song.prototype.hasBeenReleased = function() {
    return  `${new Date().getFullYear() - this.releasedYear} year(s)`;
  }

  return Song;
};
