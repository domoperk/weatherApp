var gulp = require('gulp');
 connect = require('gulp-connect');
 
gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('files', function() {
    gulp.src(['./*.html', './css/*.css', './js/*.js'])
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./*.html', './css/*.css', './js/*.js'], ['files']);
});

gulp.task('default', ['connect', 'watch']);