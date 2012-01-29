var fs = require('fs');
var path = require('path');

var PATH = path.join(process.env.HOME, '.burst.json');

var config = module.exports = {};

config.read = function (callback) {
  fs.readFile(PATH, 'utf8', function (err, json) {
    if (err) {
      callback(err);
    } else {
      var obj = {};
      // if file is blank, don't crash
      try {
        obj = JSON.parse(json);
      } catch (e) {}
      callback(null, obj);
    }
  });
};

config.get = function (callback) {
  fs.stat(PATH, function (err, stats) {
    if (err || !stats.isFile()) {
      config.save({redis: 6379}, callback);
    } else {
      config.read(callback);
    }
  });
};

config.save = function (conf, callback) {
  var str = JSON.stringify(conf);
  fs.writeFile(PATH, str, 'utf8', function (err) {
    callback(err, conf);
  });
};

