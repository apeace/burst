#!/usr/bin/env node

var argv = require('optimist').argv._;
var burst = require('../lib/burst');
var config = require('../lib/config');
var log = require('../lib/log');
var colors = require('colors');

function save_to_config (options) {
  config.get(function (err, conf) {
    if (err) throw new Error(err);
    for (var i in options) {
      if (options.hasOwnProperty(i)) {
        conf[i] = options[i];
      }
    }
    config.save(conf, function (err) {
      if (err) throw new Error(err);
    });
  });
}

if (!module.parent) {
  config.get(function (err, options) {
    if (err) throw new Error(err);
    var command = argv[0];
    switch (command) {

      case 'as':
        burst.as(options.redis, argv[1]);
        break;

      case 'to':
        burst.to(options.redis, argv[1], argv[2], options.port);
        break;

      case 'into':
        var redis;
        if (typeof(argv[1]) === 'number') {
          redis = {host: '127.0.0.1', port: argv[1]};
        } else {
          var pieces = argv[1].split(':');
          redis = {host: pieces[0], port: pieces[1]||6379};
        }
        save_to_config({redis: redis});
        break;

     case 'on':
       var port = argv[1];
       if (port === 'random') {
         port = null;
       } else {
         port = Number(port);
       }
       save_to_config({port: port});
       break;

      default:
        log('burst');
        log('Simple command-line file sharing for developers on the same network.');
        log('help', ' ');
        log('help', '  Connect to a Redis server:'.grey);
        log('help', '    burst into 10.0.0.123:6379');
        log('help', ' ');
        log('help', '  Accept a file transfer:'.grey);
        log('help', '    burst as ' + process.env.USER);
        log('help', ' ');
        log('help', '  Send a file:'.grey);
        log('help', '    burst to cam ./funny_picture.jpg');
        log('help', ' ');
        break;

    }      
  });
}

