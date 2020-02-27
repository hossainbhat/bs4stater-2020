const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');


// Compile SASS

function style(){

  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])

    .pipe(sass().on('error',sass.logError))

    .pipe(gulp.dest("src/css"))

    .pipe(browserSync.stream());

}

exports.style=style;

// Move JS Files to SRC

gulp.task('js', function(){

  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/wowjs/dist/wow.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.js'])

    .pipe(gulp.dest("src/js"))

    .pipe(browserSync.stream());

});


// Watch SASS & Serve

function watch(){

  browserSync.init({

    server: {

      baseDir: "./src"

    } 

  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], style);

  gulp.watch("src/*.html").on('change', browserSync.reload);

}

exports.watch=watch;

// Move Font Awesome Fonts folder to src

gulp.task('webfonts', function(){

  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')

    .pipe(gulp.dest("src/webfonts"));

});


// Move font awesome css file

gulp.task('fa', function(){

  return gulp.src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')

    .pipe(gulp.dest("src/css"));

});

gulp.task('default', gulp.parallel(style,watch,'js','webfonts','fa') );