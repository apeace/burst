var colors = require('colors');

module.exports = function log (level, message) {
  if (level && !message) {
    message = level;
    level = 'info';
  }
  var color = 'grey';
  if (level == 'info') color = 'green';
  if (level == 'error') color = 'red';
  level = level[color];
  console.log(level + ': ' + message);
}
