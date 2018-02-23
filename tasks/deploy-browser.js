import del from 'del';
import gulp from 'gulp';
import gulpCleanCss from 'gulp-clean-css';
import gulpHtmlmin from 'gulp-htmlmin';
import gulpPlumber from 'gulp-plumber';
import gulpSequence from 'gulp-sequence';
import gulpUglify from 'gulp-uglify';
import taskNames from './task-names';

const pathBrowser = 'dist/browser';

// 压缩并拷贝前端脚本
gulp.task(taskNames.depolyScripts, () => {
  const filePath = 'server/public/javascripts/bundle.js';
  console.log('copy:', filePath);

  return gulp.src([filePath])
    .pipe(gulpPlumber())
    .pipe(gulp.dest(`${pathBrowser}/javascripts`))
    .pipe(gulpUglify({ compress: { properties: false }, output: { quote_keys: true } }));
});

// 压缩并拷贝样式表
gulp.task(taskNames.depolyStylesheets, () => {
  const filePath = 'server/public/stylesheets/**/*.css';
  console.log('copy:', filePath);

  return gulp.src([filePath])
    .pipe(gulpPlumber())
    .pipe(gulpCleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest(`${pathBrowser}/stylesheets`));
});

// 压缩页面文件
gulp.task(taskNames.depolyPages, () => {
  let filePath = ['server/public/**/*.ejs'];
  console.log('copy:', filePath);

  gulp.src(filePath)
    .pipe(gulpPlumber())
    .pipe(gulp.dest(`${pathBrowser}`));

  filePath = ['server/public/**/*.html'];
  console.log('copy:', filePath);

  return gulp.src(filePath)
    .pipe(gulpPlumber())
    .pipe(gulpHtmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`${pathBrowser}`));
});

gulp.task(taskNames.cleanDeploy, () => {
  console.log('del:', pathBrowser);
  del([pathBrowser]);
});

const taskSequence = [
  taskNames.buildBrowser,
  taskNames.cleanDeploy,
  taskNames.depolyscripts,
  taskNames.depolystylesheets,
  taskNames.depolyPages,
];

gulp.task(taskNames.deployBrowser, gulpSequence(...taskSequence));
