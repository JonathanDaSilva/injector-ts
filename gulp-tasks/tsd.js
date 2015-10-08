var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var CONFIG = require('./config.json')

module.exports = function(cb) {
  $.tsd(CONFIG.tsd, cb)
}
