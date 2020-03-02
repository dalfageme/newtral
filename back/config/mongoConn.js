const mongoose = require('mongoose');
var db = mongoose.connection;
const retryTime = 5; // seconds

module.exports = function () {
  return new Promise((resolve, reject) => {

    function connect() {
      mongoose.connect('mongodb://newtral:newtral@mongo:27017/event?authSource=admin', {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectInterval: 5000,
        reconnectTries: 5
      }).catch((err) => { })
    }

    db.on('connecting', function () {
      console.log('connecting to MongoDB...');
    });

    db.on('connected', function () {
      console.log('Mongo DB connected propertly')
      resolve(true);
    });

    db.on('error', function (error) {
      console.log('Server not started, problems connecting to MongoDb' + error);
      setTimeout(() => {
        console.log('Trying to connect to mongodb');
        connect();
      }, retryTime * 1000);
    });

    connect();
  })
}
