var gulp = require('gulp');
var concat = require('gulp-concat'); //合并文件插件

gulp.task('scripts',function(){
	gulp.src(['js/1.js','js/2.js']) //待合并文件
	.pipe(concat('3.js')) //concat()合并文件，里面指定合并后文件名
	.pipe(gulp.dist('dist/js')); //合并后文件放到指定文件夹
})
