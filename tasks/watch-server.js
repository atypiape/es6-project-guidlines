import gulp from 'gulp';
import gulpLiveserver from 'gulp-live-server';
import args from '../config/args';

gulp.task('watch-server', (callback) => {
  if (!args.watch) {
    return callback;
  }

  // 如果处于监听状态，就启动服务器
  const server = gulpLiveserver.new(['--harmony', 'server/bin/www']);
  server.start();

  // 监听需要对浏览器进行热更新的文件
  gulp.watch([
    'server/public/**/*.css',
    'server/public/**/*.html',
    'server/public/**/*.ejs',
    'server/views/**/*.ejs',
    'server/public/**/*.js',
    'server/public/**/*.jsx',
    'server/public/**/*.png',
  ], (file) => {
    // 通知服务器，文件已改变
    server.notify.apply(server, [file]);
  });

  // 监听需要重启服务器的文件
  gulp.watch(['server/routes/**/*.js', 'server/app.js'], () => {
    server.start.bind(server)();
  });

  return null;
});
