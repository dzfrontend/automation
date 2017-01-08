//用require将gulp模块包含进来，就可以使用gulp模块里面的方法
var gulp = require('gulp');

//1.gulp.task()创建gulp任务，第一个参数任务名，第二个参数任务要做的事情
gulp.task('hello',function(){
	console.log('hello gulp');
})

//2.命令行输入gulp+任务名执行任务，gulp默认执行gulp default的任务。

//3.gulp执行默认任务，将一个或多个任务名写在一个数组里面，命令行只需输入gulp就可以执行一个或多个任务
gulp.task('default',['hello']);
