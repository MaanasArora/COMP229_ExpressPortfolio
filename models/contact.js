const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: String,
  number: String,
  email: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
