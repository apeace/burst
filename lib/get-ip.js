// from http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js

var ignoreRE = /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i;

var exec = require('child_process').exec;
var cached;
var command;
var filterRE;

switch (process.platform) {
  case 'win32':
    //case 'win64': // TODO: test
    command = 'ipconfig';
    filterRE = /\bIP-[^:\r\n]+:\s*([^\s]+)/g;
    // TODO: find IPv6 RegEx
    break;
  case 'darwin':
    command = 'ifconfig';
    filterRE = /\binet\s+([^\s]+)/g;
    // filterRE = /\binet6\s+([^\s]+)/g; // IPv6
    break;
  default:
    command = 'ifconfig';
    filterRE = /\binet\b[^:]+:\s*([^\s]+)/g;
    // filterRE = /\binet6[^:]+:\s*([^\s]+)/g; // IPv6
    break;
}

var getNetworkIPs = module.exports = function (callback) {
  // system call
  exec(command, function (error, stdout, sterr) {
    var ips = [];
    var ip;
    var matches = stdout.match(filterRE) || [];
    for (var i = 0; i < matches.length; i++) {
      ip = matches[i].replace(filterRE, '$1')
      if (!ignoreRE.test(ip)) {
        ips.push(ip);
      }
    }
    callback(error, ips);
  });
};

