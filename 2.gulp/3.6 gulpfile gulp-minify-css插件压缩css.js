var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css'); //压缩css插件

gulp.task('sass',function(){
	gulp.src('scss/**/*.scss')
	.pipe(sass()) //sass()编译scss
	.pipe(minifyCSS()) //编译scss后压缩
	.pipe(gulp.dest('css')); //输出编译文件
})