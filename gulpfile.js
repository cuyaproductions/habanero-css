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


gulp.task('kss', function () {
  gulp.src(config.src + '/styleguide/*')
  .pipe(shell([
      './node_modules/.bin/kss-node --config kss-config.json'
  ]))
  .pipe(connect.reload());
}
);

gulp.task('watch', function() {
  gulp.watch(['./' + config.src + '/sass/**/*'], ['sass']);
  gulp.watch(['./' + config.src + '/*.html'], ['html']);
});


gulp.task('watch:doc', function() {
  gulp.watch(['./' + config.src + '/sass/**/*'], ['sass', 'kss']);
  gulp.watch(['./kss-config.json', './' + config.src + '/styleguide/*'], ['kss']);
});

gulp.task('sass', function() {
  gulp.src(config.src + '/sass/**/*.s?(a|c)ss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', errorAlert)
    .pipe(prefix({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(config.build + '/'))
    .pipe(connect.reload());
});


gulp.task('connect', function() {
  connect.server({
    root: process.cwd(),
    port: 9000,
    livereload: true
  });
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
  'open http://localhost:9000/styleguide'
]));


gulp.task('doc', ['sass', 'kss']);
gulp.task('serve:doc', ['doc', 'open:doc', 'connect', 'watch:doc']);

gulp.task('default', ['sass', 'concat:vendor']);
gulp.task('serve', ['default', 'connect', 'watch', 'open']);
