import gulp from 'gulp';
import args from '../config/args';
import taskNames from './task-names';

// 监听前端文件变化
gulp.task('watch-browser', (callback) => {
  if (!args.watch) {
    return callback;
  }

  // 如果前端文件有改变就启动对应的任务
  gulp.watch('browser/**/*.css', [taskNames.buildStylesheets]);
  gulp.watch('browser/**/*.js', 'browser/**/*.jsx', [taskNames.buildScripts]);
  gulp.watch('browser/**/*.ejs', 'browser/**/*.html', [taskNames.buildPages]);

  return null;
});
