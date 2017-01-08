var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //压缩图片插件

gulp.task("copy-images",function(){
	return gulp.src('images/**/*')
	.pipe(imagemin()) //imagemin()里面还可以配置压缩图片的参数
	.pipe(gulp.dest('dist/images'));
})