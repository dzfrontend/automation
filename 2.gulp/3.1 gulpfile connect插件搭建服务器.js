var gulp = require('gulp');
var connect = require('gulp-connect'); //服务器插件

//用connect.server()方法创建服务器
gulp.task('server',function(){
	connect.server({
		root:'./', //指定服务器根目录
		livereload:true, //启用实时刷新
	});
})

//创建一个监视任务，当指定路径html和css文件发生变化时实时刷新浏览器
gulp.task('watch',function(){
	gulp.watch('**.html',['livereload-html']);
	gulp.watch('css/*.css',['livereload-css']);
})

//实时刷新
gulp.task('livereload-html',function(){
	gulp.src('**.html')
	.pipe(connect.reload()); //connect.reload()刷新浏览器
});
gulp.task('livereload-css',function(){
	gulp.src('css/*.css')
	.pipe(connect.reload()); //connect.reload()刷新浏览器
})

//执行server和watch任务
gulp.task('default',['server','watch']);