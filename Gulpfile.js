var gulp     = require('gulp')
var merge    = require('merge2')
var ts       = require('gulp-typescript')
var jasmine  = require('gulp-jasmine')

gulp.task('default', function(cb) {
  var result = gulp.src([
    '**/*.ts',
    '!node_modules/**/*.ts',
    '!lib/**/*.ts',
    '!definitions/**/*.ts',
  ]).pipe(ts({
    emitDecoratorMetadata: true,
    declaration: true,
    module: "commonjs",
    target: "es5",
    typescript: require('typescript'),
  }))

  return merge([
    result.dts.pipe(gulp.dest('lib/definitions/')),
    result.js.pipe(gulp.dest('lib/'))
  ])
})

gulp.task('test', ['default'], function(cb) {
  return gulp.src([
    'lib/tests/*.js',
    'lib/tests/**/*.js',
  ]).pipe(jasmine())
})
