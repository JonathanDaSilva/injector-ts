var gulp     = require('gulp')
var merge    = require('merge2')
var del      = require('del')
var $        = require('gulp-load-plugins')()

gulp.task('default', function(cb) {
  var result = gulp.src([
    '**/*.ts',
    '!node_modules/**/*.ts',
    '!lib/**/*.ts',
    '!definitions/**/*.ts',
  ]).pipe($.typescript({
    emitDecoratorMetadata: true,
    declaration: true,
    module: "commonjs",
    target: "es5",
    typescript: require('typescript'),
  }))

  return merge([
    result.dts.pipe(gulp.dest('definitions/')),
    result.js.pipe(gulp.dest('lib/'))
  ])
})

gulp.task('test', ['default'], function(cb) {
  return gulp.src([
    'lib/tests/*.js',
    'lib/tests/**/*.js',
  ]).pipe($.jasmine())
})

gulp.task('clean', function(cb){
  del([
    'definition',
    'lib',
  ], cb)
})
