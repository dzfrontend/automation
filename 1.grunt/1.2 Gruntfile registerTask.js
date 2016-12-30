//文件的开始module.exports等于匿名函数，函数接收一个叫做grunt的参数，module.exports是来自node.js的模块系统
module.exports = function(grunt){ //grunt 
	// 函数里就可以使用grunt这个对象里面的方法创建任务
	//1.注册任务registerTask：第一个参数任务名，第二个参数任务要做的事情函数
	grunt.registerTask('default',function(){
		console.log('hello grunt'); //或者grunt.log.write('hello grunt');
	})
	//2.命令行输入grunt+任务名执行任务，grunt默认执行grunt default的任务。输入之后命令行输出hello grunt
};