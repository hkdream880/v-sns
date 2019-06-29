const { src, dest, series, parallel, watch } = require('gulp');
//const babel = require('gulp-babel');  //es2015 -> es5
const uglify = require('gulp-uglify');
//const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
//const options = require('gulp-options');
const webserver = require('gulp-webserver');
const remoteSrc = require('gulp-remote-src');
const extend = require('gulp-extend');

function cleanDist(cb) {
  src('dist/**/*.*').pipe(clean());
  setTimeout(cb,500);
}

function commonCSS(cb) {
  src(['client/common/css/chat.css',
    'client/common/css/main.css'])
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS())
  .pipe(rev())
  .pipe(dest('dist/css/'))
  .pipe(rev.manifest('dist/temp/style-manifest.json'))
  .pipe(dest('.'));
  cb();
}

function commonJS(cb) {
  src(['client/common/js/*.js'])
  .pipe(concat('common.min.js'))
  .pipe(uglify())
  .pipe(rev())
  .pipe(dest('dist/js/'))
  .pipe(rev.manifest('dist/temp/common-manifest.json'))
  .pipe(dest('.'));
  cb();
}

function initJS(cb){
  console.log('initJS called');
  src('client/init.js')
  .pipe(concat('init.min.js'))
  .pipe(uglify())
  .pipe(rev())
  .pipe(dest('dist/js/'))
  .pipe(rev.manifest('dist/temp/init-manifest.json'))
  .pipe(dest('.'));
  cb();
}

function font(cb){
  src('node_modules/font-awesome/fonts/*.*')
  .pipe(dest('dist/fonts'));
  cb();
}


function vendorCSS(cd){  
  src([
    'node_modules/nprogress/nprogress.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-grid.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-reboot.min.css'
  ])
  .pipe(concat('vendor.css'))
  .pipe(dest('dist/vendor'));
  cd();
}

function vendorJS(cb){
  src(['node_modules/vue/dist/vue.min.js',
  'node_modules/vue-router/dist/vue-router.min.js',
  'node_modules/axios/dist/axios.min.js',
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/nprogress/nprogress.js'])
  .pipe(concat('vendor.js'))
  .pipe(dest('dist/vendor'));
  cb();
}

function vueComponent(cb){
  console.log('vueComponent called');
  src('client/components/*.js')
  .pipe(concat('component.min.js'))
  .pipe(rev())
  .pipe(dest('dist/js/'))
  .pipe(rev.manifest('dist/temp/component-manifest.json'))
  .pipe(dest('.'));
  cb();
}

function vueRoutes(cb){
  console.log('vueRoutes called');
  src('client/routes/*.js')
  .pipe(concat('routes.min.js'))
  .pipe(rev())
  .pipe(dest('dist/js/'))
  .pipe(rev.manifest('dist/temp/routes-manifest.json'))
  .pipe(dest('.'));
  cb();
}

function image(cb){
  src('client/common/img/*.*')
  .pipe(dest('dist/common/img'));
  cb();
}

function runServer(cb){
    src('dist/')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 3001,
      livereload: true,
      auto: true,
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
      }
    }));
    cb();
}

function cleanJS(cb){
  src('dist/js/*.*').pipe(clean());
  setTimeout(cb,500);
}

function watchFront(cb){
  console.log('watchFront called');
  watch('client/**/*.js',{ interval: 500 },series(cleanJS, parallel(vueComponent, vueRoutes, commonJS, initJS), defineManifest));
  cb();
}

function getManifest(cb){
  remoteSrc('manifest.json', {
      base: 'http://localhost:3001/'
    })
    .pipe(function(json){
      console.log(json);
    });
    cb();
}

function defineManifest(cb){
  setTimeout(function(){
    console.log('defineManifest called');
    src('dist/temp/*.json')
    .pipe(extend('manifest.json'))
    .pipe(dest('./dist'));
    cb();
  },1000);
}

exports.default = series(cleanDist, parallel( image, font, vendorCSS, commonCSS, vendorJS, vueComponent, vueRoutes, commonJS, initJS), watchFront, runServer, defineManifest);