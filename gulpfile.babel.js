import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import requireDir from 'require-dir';


// 加载 tasks 目录下的所有脚本
requireDir('tasks');

// gulp 命令不带参数，默认执行 default
gulp.task('default', gulpSequence('watch'));

// 构建前后端代码
gulp.task('build', gulpSequence('build-browser', 'build-server'));

// 在已构建代码基础上进行打包部署，打包的文件在 dist 目录中
gulp.task('deploy', gulpSequence('deploy-browser', 'deploy-server'));

// 现构建前后端代码，然后对代码变化进行监听，有变化就进行热更新
gulp.task('watch', gulpSequence('build', ['watch-browser', 'watch-server']));
