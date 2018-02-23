import cssnext from 'cssnext';
import del from 'del';
import es2015 from 'babel-preset-es2015';
import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpConcat from 'gulp-concat';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpPlumber from 'gulp-plumber';
import gulpPostcss from 'gulp-postcss';
import gulpReact from 'gulp-react';
import gulpSequence from 'gulp-sequence';
import gulpWebpack from 'gulp-webpack';
import named from 'vinyl-named';
import precss from 'precss';
import args from '../config/args';
import taskNames from './task-names';

const pathTempFolder = 'temp/browser';
const pathPublicFolder = 'server/public';
const bundleFile = 'bundle.js';

// 将 ES6 代码编译成 ES5 代码
const compileEs6 = (srcFiles, targetFile) => {
  const targetPath = `${pathTempFolder}/${targetFile}`;

  console.log(`delete: ${targetPath}`);
  del([targetPath]);

  console.log(`${srcFiles} -> ${targetPath}`);
  return gulp.src(srcFiles)
    .pipe(gulpPlumber())
    .pipe(gulpConcat(targetFile))
    .pipe(named())
    .pipe(gulpBabel({ presets: [es2015] }))
    .pipe(gulp.dest(pathTempFolder))
    .pipe(gulpWebpack())
    .pipe(gulp.dest(pathTempFolder))
    .pipe(gulpReact())
    .pipe(gulpIf(args.watch, gulpLivereload()));
};

// 将 js/jsx 编译成 es5
gulp.task(taskNames.buildScripts, () => {
  const srcFiles = ['browser/**/*.js', 'browser/**/*.jsx'];
  return compileEs6(srcFiles, bundleFile);
});

// 拷贝页面文件
gulp.task(taskNames.buildPages, () => {
  const srcFiles = ['browser/**/*.ejs', 'browser/**/*.html'];

  console.log('delete:', srcFiles);
  del(srcFiles);

  return gulp.src(srcFiles)
    .pipe(gulpPlumber())
    .pipe(gulp.dest(pathPublicFolder))
    .pipe(gulpIf(args.watch, gulpLivereload()));
});

// 编译 PostCSS
gulp.task(taskNames.buildStylesheets, () => {
  const srcFiles = 'browser/**/*.css';
  const processors = [cssnext, precss];

  console.log('delete:', srcFiles);
  del([srcFiles]);

  return gulp.src(srcFiles)
    .pipe(gulpPlumber())
    .pipe(gulpPostcss(processors))
    .pipe(gulp.dest(pathPublicFolder))
    .pipe(gulpIf(args.watch, gulpLivereload()));
});

const taskSequence = [
  taskNames.buildScripts,
  taskNames.buildStylesheets,
  taskNames.buildPages,
];

gulp.task('build-browser', gulpSequence(...taskSequence));

