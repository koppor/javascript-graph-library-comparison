var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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


gulp.task('default', ['browser-sync']);