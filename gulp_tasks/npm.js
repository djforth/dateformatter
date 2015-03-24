var gulp   = require("gulp");
var babel = require("gulp-babel");
var gutil  = require('gulp-util');
var rename = require("gulp-rename");

gulp.task("npm_build", function () {
  return gulp.src("lib/dateFormatter.es6.js")
    .pipe(babel({optional: ["spec.protoToAssign"] })
    )
    .pipe(rename("index.js"))
    .pipe(gulp.dest("./"));
});