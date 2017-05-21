var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function () {
	return gulp.src(["./cssx.js", "./parse.js"])
		.pipe(concat('cssx.js'))
		.pipe(gulp.dest('./dist/'));
});
