var gulp = require('gulp');
var scss = require('gulp-sass');//sass插件
var plumber = require('gulp-plumber');//捕获错误
var browserSync = require('browser-sync');//服务器插件
var reload= browserSync.reload;
var prefix = require('gulp-autoprefixer');//根据设置浏览器版本自动处理浏览器前缀
var minCSS = require('gulp-minify-css');//压缩css


var prefixConfig = {
     browsers: ['last 2 version', 'android 4'],
     cascade: false
}


gulp.task('server', function(){
    browserSync({
        server:{
            baseDir:'./'
        },
        notify: false
    })
})


gulp.task('scss', function(){
    gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(scss())
        .pipe(prefix(prefixConfig))
    .pipe(minCSS())
        .pipe(gulp.dest('./css/'))
        .pipe(reload({stream:true}))
})


gulp.task('watch', function() {

    gulp.watch('./scss/*.scss', ['scss'])
    gulp.watch('**/*.html', reload)
    gulp.watch('./js/*.js', reload)

})

gulp.task('default', ['scss', 'server', 'watch'])