var gulp   = require('gulp')
var del    = require('del')
var CONFIG = require('./config.json')

module.exports = function(cb) {
  return del([
    CONFIG.out
  ]);
}
