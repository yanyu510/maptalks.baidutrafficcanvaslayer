const gulp = require('gulp'),
    pkg = require('./package.json'),
    BundleHelper = require('maptalks-build-helpers').BundleHelper;
const bundleHelper = new BundleHelper(pkg);

gulp.task('build', () => {
    return bundleHelper.bundle('index.js');
});

gulp.task('minify', gulp.series('build', async () => {
    bundleHelper.minify();
}));

gulp.task('watch', gulp.series('build', () => {
    gulp.watch(['index.js', './gulpfile.js'], gulp.series('build'));
}));

/* 
const TestHelper = require('maptalks-build-helpers').TestHelper;
const testHelper = new TestHelper();
const karmaConfig = require('./karma.config.js');

gulp.task('test', ['build'], () => {
    testHelper.test(karmaConfig);
});

gulp.task('tdd', ['build'], () => {
    karmaConfig.singleRun = false;
    gulp.watch(['index.js'], ['test']);
    testHelper.test(karmaConfig);
}); */

gulp.task('default', gulp.series('watch'));
