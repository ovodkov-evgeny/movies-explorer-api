const { Schema, model, Types } = require('mongoose');
const { isURL } = require('validator');

const movie = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: (v) => isURL(v),
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (v) => isURL(v),
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (v) => isURL(v),
  },
  owner: {
    type: Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = model('movie', movie);
