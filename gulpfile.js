var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var es = require('event-stream');

/**
 * Use BrowserSync for livereload
 */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch('src/**').on('change', browserSync.reload)
});

/**
 * Task that injects all the bower components we need
 */
gulp.task('index', function () {
    gulp.src('./src/index.html')
        .pipe(inject(gulp.src(mainBowerFiles(), { read: false }), { name: 'bower', relative: true }))
        .pipe(gulp.dest('./src'))
        .pipe(inject(es.merge(
            gulp.src('./src/app/**/*.js', { read: false })
        )))
        .pipe(gulp.dest('./src'));
});

gulp.task('default', ['index', 'browser-sync']);