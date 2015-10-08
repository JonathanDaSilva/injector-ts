var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var CONFIG = require('./config.json')

module.exports = function(cb) {
  return gulp.src(CONFIG.test.in)
    .pipe($.mocha());
}

module.exports.dependencies = ['compile'];
