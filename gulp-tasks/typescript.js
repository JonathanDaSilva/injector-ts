var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var CONFIG = require('./config.json')
var merge  = require('merge2')

module.exports = function(cb) {
  var tsProject   = $.typescript.createProject('tsconfig.json', {
    outDir: CONFIG.out,
    declaration: true,
  })

  var tsResult = gulp.src(CONFIG.typescript.in)
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject))

  return merge([
    tsResult.js
      .pipe($.replace(".ts\"", ".js\""))
      .pipe($.replace(".ts\'", ".js\'"))
      .pipe($.replace(".sass\"", ".css\""))
      .pipe($.replace(".sass\'", ".css\'"))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(CONFIG.out)),

    tsResult.dts
      .pipe(gulp.dest(CONFIG.typescript.definition)),
  ]);
}
