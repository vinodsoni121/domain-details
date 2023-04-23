const mongoose = require('mongoose');

// Define the domain schema
const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  domainName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  registrar: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  nameServer: {
    type: String,
    required: true
  },
  registrationDateTime: {
    type: Date,
    default: Date.now
  }
});

// Create and export the domain model
module.exports = mongoose.model('Domain', domainSchema);
