const mongoose = require('mongoose');

const image = new mongoose.Schema({
  stego: {
    type: String,
    required: [true, 'It should have a stego image']
  },
  messageCreateDate: Date
});

const MessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'User id should be there']
  },
  images: [image]
});

MessageSchema.index({ user: 1 });

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
