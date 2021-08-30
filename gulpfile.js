const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

function pugPages() {
  return src('./src/views/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./'))
    .on('end', browserSync.reload);
}

function pugBlog() {
  return src('./src/views/blog/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./blog'))
    .on('end', browserSync.reload);
}

function pugPortfolio() {
  return src('./src/views/portfolio/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./portfolio'))
    .on('end', browserSync.reload);
}

function styles() {
  return src('./src/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
}

function serve(cb) {
  browserSync.init({
    server: "./",
    notify: false,
    scrollProportionally: false,
  });
}

function watchFiles() {
  // pug
  watch('./src/views/**/*.pug', series(pugPages, pugBlog, pugPortfolio));
  // styles less
  watch('./src/styles/**/*.scss', series(styles));
}

exports.pugPages = pugPages
exports.pugBlog = pugBlog
exports.pugPortfolio = pugPortfolio
exports.styles = styles
exports.serve = serve
exports.watchFiles = watchFiles

exports.default = series(parallel(pugPages, pugBlog, pugPortfolio, styles), parallel(watchFiles, serve));