var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
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
 * Gulp injection
 */
gulp.task('inject', function () {
    gulp.src('./src/index.html')
        .pipe(inject(gulp.src(mainBowerFiles(), { read: false }), { name: 'bower', relative: true }))
        .pipe(gulp.dest('./src'))
        .pipe(inject(gulp.src('./src/app/*.js', { read: false }), { relative: true }))
        .pipe(gulp.dest('./src'));
});

gulp.task('copy', function () {
    gulp.src('./src/**/*').pipe(gulp.dest('./docs'));
});

// The default task just injects the files
gulp.task('default', ['inject']);
// Injects and builds the task (copies into docs directory)
gulp.task('build', ['inject', 'copy']);
// Inject and start browser-sync task
gulp.task('start', ['inject', 'browser-sync']);
