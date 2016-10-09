var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();


//Compress changed images
gulp.task('imagemin', function() {
  var imgSrc = './public/src/images/**/*',
      imgDst = './public/build/images';

  gulp.src(imgSrc)
    .pipe(plugins.changed(imgDst))
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(imgDst));
});

//Minify html
gulp.task('htmlmin', function() {
  var htmlSrc = './public/src/**/*.html',
      htmlDst = './public/build';

  gulp.src(htmlSrc)
    .pipe(plugins.changed(htmlDst))
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest(htmlDst));
});

//Concat and minify js
gulp.task('jsmin', function() {

  var jsSrc = ['./public/src/js/**/*.js'],
      jsDst = './public/build/js';

  gulp.src(jsSrc)
    .pipe(plugins.concat('app.ini.js'))
    .pipe(plugins.stripDebug())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(jsDst));
});

// CSS concat, auto-prefix and minify
gulp.task('cssmin', function() {

  var cssSrc = ['./public/src/css/*.css'],
      cssDst = './public/build/css';

  gulp.src(cssSrc)
    .pipe(plugins.concat('app.css'))
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(cssDst));
});

//Automate all task
gulp.task('build', ['imagemin', 'htmlmin', 'jsmin', 'cssmin']);
gulp.task('watch', function() {
    //Watch for HTML changes
    gulp.watch(['./public/src/partials/*.html', './public/src/*.html'], ['htmlmin']);

    //Watch for JS changes
    gulp.watch('./public/src/js/**/*.js', ['jshint', 'jsmin']);

    //Watch for CSS changes
    gulp.watch('./public/src/css/**/*.css', ['cssmin']);

    //Watch for Images changes
    gulp.watch('./public/src/images/**/*', ['imagemin']);
})


gulp.task('nodemon', ['build', 'watch'], function() {

	var stream = plugins.nodemon({
		script: 'index.js',
		watch: ['.'],
		ignore: ['./public', 'gulpfile.js'],
		ext: 'js html json',
		env: { 'NODE_ENV': 'development' }
	});

  stream.on('crash', function() {
    var delay = 3;
    stream.emit('restart', delay);
  });
});