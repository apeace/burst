
var createClient = require('redis').createClient;
var fs = require('fs');
var net = require('net');
var path = require('path');
var get_ip = require('./get-ip');
var log = require('./log');

var burst = module.exports = {};

function createRedis (conf) {
  return createClient(conf.port, conf.host);
}

function send (file_path, socket, callback) {
  var fileStream = fs.createReadStream(file_path, {encoding: 'binary'});
  fileStream.on('end', function () {
    socket.end();
    if (callback) callback();
  });
  fileStream.pipe(socket);
}

burst.to = function (redis_server, name, file_path) {
  log('bursting ' + file_path + ' to ' + name);
  get_ip(function (err, ips) {
    if (err) throw new Error(err);
    if (!ips || ips.length === 0) throw new Error('Could not detect IP address');

    var server = net.createServer(function (socket) {
      send(file_path, socket);
    });

    server.listen(function () {
      var port = server.address().port;
      var ip = ips[0];
      var filename = path.basename(file_path);

      var redis = createRedis(redis_server);
      var channel = '____burstastic____' + name;
      var msg = JSON.stringify({
        port: port,
        ip: ip,
        filename: filename
      });

      setInterval(function () {
        redis.publish(channel, msg);
      }, 1000);
    });
  });
};

burst.as = function (redis_server, name) {
  log('bursting as ' + name);
  var redis = createRedis(redis_server);
  var channel = '____burstastic____' + name;

  redis.subscribe(channel);
  redis.on('message', function (msg_channel, message) {
    if (channel !== msg_channel) return;

    var who = JSON.parse(message);
    var outFileName = path.join(process.cwd(), who.filename);
    var out = fs.createWriteStream(outFileName);
    var socket = net.createConnection(who.port, who.ip);

    log('recieved ' + outFileName + ' from ' + who.ip);

    socket.pipe(out);
    socket.on('end', function () {
      redis.end();
    });
  });
};

