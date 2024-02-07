const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    mongoose.connect("mongodb+srv://fusterrosbergva:99NVDJfmmQikppVx@cluster.iq6mds2.mongodb.net/?retryWrites=true&w=majority/vacances", {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
    .then(() => console.log("mongoose Connected!"));
  } catch (error) {
    console.log(error);
    console.log("mongoose Error");
  }
}

module.exports = connectToDB;