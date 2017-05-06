var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var beautify = require('gulp-beautify');
var htmlbeautify = require('gulp-html-beautify');
var browserSync = require('browser-sync').create();

/**
 * Use BrowserSync for livereload
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch('src/**').on('change',browserSync.reload)
});
/**
 * Beautifies html
 */
gulp.task('htmlbeautify', function () {
  gulp.src('./src/**/*.html')
    .pipe(htmlbeautify({ indent_size: 2 }))
    .pipe(gulp.dest('./src/'))
});

/**
 * Beautifies javascript files, because we dont need them minified
 */
gulp.task('jsbeautify', function () {
  gulp.src('./src/**/*.js')
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest('./src/'))
});

/**
 * Task that injects all the bower components we need
 */
gulp.task('index', function () {
  console.log(mainBowerFiles());
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(mainBowerFiles(), { read: false }), { name: 'bower', relative: true }))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', ['index', 'jsbeautify', 'htmlbeautify', 'browser-sync']);