var gulp = require('gulp');
var connect = require('gulp-connect'); //服务器插件
var less = require('gulp-less'); //less插件

//用connect.server()方法创建服务器
gulp.task('server',function(){
	connect.server({
		root:'./', //指定服务器根目录
		livereload:true, //启用实时刷新
	});
})
gulp.task('less',function(){
	gulp.src('less/**/*.less')
	.pipe(less()) //less()编译less
	.pipe(gulp.dest('css')); //输出编译文件
})

//创建一个监视任务，当指定路径html和css文件发生变化时实时刷新浏览器
gulp.task('watch',function(){
	gulp.watch('**.html',['livereload-html']);
	gulp.watch('css/*.css',['livereload-css']);
	gulp.watch('less/**/*.less',['less']); //监视less文件改动时执行less任务
})

//实时刷新
gulp.task('livereload-html',function(){
	gulp.src('**.html')
	.pipe(connect.reload()); //connect.reload()刷新浏览器
});
gulp.task('livereload-css',function(){
	gulp.src('css/*.css')
	.pipe(connect.reload());
})

//执行server和watch任务
gulp.task('default',['server','watch']);