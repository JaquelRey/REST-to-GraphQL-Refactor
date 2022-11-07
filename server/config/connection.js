const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Jaquel:zWN64AuSaH9xeCEW@cluster0.y1xi2cl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).catch ((err) => {
  console.log(err);
});


module.exports = mongoose.connection;
