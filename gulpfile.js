const { src, dest, series, parallel, watch } = require('gulp');
const rename = require('gulp-rename');
const nunjucks = require('gulp-nunjucks');
const less = require('gulp-less');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');

function html() {
  return src('./src/html/*.njk')
         .pipe(nunjucks.compile())
         .pipe(rename({
           extname: '.html'
         }))
         .pipe(dest('./build'))
         .on('end', browserSync.reload);
}

function htmlPug() {
  return src('./src/pug/*.pug')
         .pipe(pug({ pretty: true }))
         .pipe(dest('./build'))
         .on('end', browserSync.reload);
}

function styles() {
  return src('./src/static/styles/style.less')
         .pipe(less())
         .pipe(dest('./build/css'))
         .pipe(browserSync.stream());
}

function stylesSass() {
  return src('./src/static/styles/style.scss')
         .pipe(sass().on('error', sass.logError))
         .pipe(dest('./build/css'))
         .pipe(browserSync.stream());
}

function images() {
  return src('./src/static/img/**/*')
         .pipe(dest('./build/img'));
}

function fonts() {
  return src('./src/static/fonts/**/*')
         .pipe(dest('./build/fonts'));
}

function cleanBuild() {
  return src('./build', {read: false, allowEmpty: true}).pipe(clean())
}

function serve(cb) {
  browserSync.init({
    server: "./build",
    notify: false,
    scrollProportionally: false,
  });
}

function watchFiles() {
  // html nunjucks
  watch('./src/html/**/*.njk', series(html));
  // pug
  watch('./src/pug/**/*.pug', series(htmlPug));
  // styles less
  watch('./src/static/styles/**/*.less', series(styles));
  // styles sass
  watch('./src/static/styles/**/*.scss', series(stylesSass));
  // images
  watch('./src/static/img/**/*', series(images));
  // fonts
  watch('./src/static/fonts/**/*', series(fonts));
}

exports.html = html
exports.htmlPug = htmlPug
exports.styles = styles
exports.stylesSass = stylesSass
exports.images = images
exports.fonts = fonts
exports.cleanBuild = cleanBuild
exports.serve = serve
exports.watchFiles = watchFiles

exports.default = series(cleanBuild, parallel(htmlPug, stylesSass, images, fonts), parallel(watchFiles, serve));