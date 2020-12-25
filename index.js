const gulp = require('gulp');
const task = require('./lib/task');
const vars = require('./lib/gen-vars');
const config = require('./lib/config');

const build = function (opts) {
    return function () {
        return task.build(Object.assign(opts, { message: 'build element theme' }));
    };
};

const fonts = function (opts) {
    return function () {
        return task.fonts(Object.assign(opts, { message: 'build theme font' }));
    };
};

exports.init = function (filePath) {
    filePath = {}.toString.call(filePath) === '[object String]' ? filePath : '';
    vars.init(filePath);
};

exports.watch = function (opts) {
    const buildFn = build(opts);
    const fontsFn = fonts(opts);
    gulp.task('build', buildFn);
    gulp.task('fonts', fontsFn);
    gulp.series('build', 'fonts')();
    gulp.watch([opts.config || config.config], buildFn);
};

exports.run = function (opts) {
    gulp.task('build', build(opts));
    gulp.task('fonts', fonts(opts));
    gulp.series('build', 'fonts')();
};
