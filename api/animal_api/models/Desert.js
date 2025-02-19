const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesertSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'No description provided.',
    },
    rating: {
      type: Number,
    },
  },
  { collection: 'Deserts' }
);

module.exports = mongoose.model('Deserts', DesertSchema);
