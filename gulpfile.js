var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var beautify = require('gulp-beautify');

gulp.task('beautify', function() {
  gulp.src('./src/**/*.js')
    .pipe(beautify({indent_size: 4}))
    .pipe(gulp.dest('./src/'))
});

/**
 * Task that injects all the bower components we need
 */
gulp.task('index', function () {
    return gulp.src('./src/index.html')
        .pipe(inject(gulp.src(mainBowerFiles(), { read: false }), { name: 'bower', relative: true }))
        .pipe(gulp.dest('./src'));
});

gulp.task('default', ['index', 'beautify']);