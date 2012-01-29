
var createRedis = require('redis').createClient;
var fs = require('fs');
var net = require('net');

var burst = module.exports = {};

function send (file_path, socket, callback) {
  var fileStream = fs.createReadStream(file_path, {encoding: 'binary'});
  fileStream.on('end', function () {
    socket.end();
    if (callback) callback();
  });
  fileStream.pipe(socket);
}

burst.to = function (redis_server, name, file_path) {
  var server = net.createServer(function (socket) {
    send(file_path, socket);
  });

  server.listen(function () {
    var port = server.address().port;
    var ip = '127.0.0.1';

    var redis = createRedis(redis_server);
    var channel = '____burstastic____' + name;
    var msg = JSON.stringify({port: port, ip: ip, filename: 'test.txt'});

    setTimeout(function () {
      redis.publish(channel, msg);
    }, 1000);
  });
};

burst.as = function (redis_server, name) {
  var redis = createRedis(redis_server);
  var channel = '____burstastic____' + name;

  redis.subscribe(channel);
  redis.on('message', function (msg_channel, message) {
    if (channel !== msg_channel) return;

    var who = JSON.parse(message);
    var out = fs.createWriteStream(__dirname + '/' + who.filename);
    var socket = net.createConnection(who.port, who.ip);

    socket.pipe(out);
    socket.on('end', function () {
      redis.end();
    });
  });
};

