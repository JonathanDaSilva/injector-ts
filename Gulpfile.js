var gulp = require('gulp')
var $    = require('gulp-load-plugins')()
$.taskLoader({
  exts: ['.js']
})

gulp.task('default', ['compile'])

gulp.task('help', $.taskListing)

gulp.task('compile', function(cb) {
  $.sequence(
    'clean',
    [
      'typescript',
    ]
  )(cb)
})
