var gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  concat = require('gulp-concat-css'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell');

var config = {
  src: 'src',
  build: 'build'
};

function errorAlert(err) {
  console.log(err.toString());
  this.emit('end');
}


gulp.task('kss', shell.task([
  './node_modules/.bin/kss-node --config kss-config.json'
]));

gulp.task('watch', function() {
  gulp.watch(['./' + config.src + '/sass/**/*'], ['sass']);
  gulp.watch(['./' + config.src + '/*.html'], ['html']);
});


gulp.task('watch:doc', function() {
  gulp.watch(['./' + config.src + '/sass/**/*'], ['sass', 'kss']);
});

gulp.task('sass', function() {
  gulp.src(config.src + '/sass/**/*.s?(a|c)ss')
    .pipe(sass({
      style: 'compressed'
    }))
    .on('error', errorAlert)
    .pipe(prefix({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(config.build + '/css/'))
    .pipe(connect.reload());
});


gulp.task('connect', function() {
  connect.server({
    root: config.build,
    port: 9000,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(config.src + '/*.html')
  .on('error', errorAlert)
  .pipe(gulp.dest(config.build))
  .pipe(connect.reload());
});

gulp.task('concat:vendor', function() {
  gulp.src(config.src + '/vendor/*')
  .pipe(concat('sui-opt-in.css'))
  .on('error', errorAlert)
  .pipe(gulp.dest(config.build + '/css'));
});

gulp.task('open', shell.task([
  'open http://localhost:9000'
]));

gulp.task('open:doc', shell.task([
  'open ./build/styleguide/index.html'
]));


gulp.task('doc', ['sass', 'kss']);
gulp.task('serve:doc', ['doc', 'open:doc', 'connect', 'watch:doc']);

gulp.task('default', ['sass', 'concat:vendor', 'html']);
gulp.task('serve', ['default', 'connect', 'watch', 'open']);
