//文件的开始module.exports等于匿名函数，函数接收一个叫做grunt的参数，module.exports是来自node.js的模块系统
module.exports = function(grunt){ //grunt 
	// 函数里就可以使用grunt这个对象里面的方法创建任务
	//1.注册任务registerTask：第一个参数任务名，第二个参数任务要做的事情函数，第二个参数可以传入参数
	grunt.registerTask('greet',function(name){
		if(name.length<2){
			grunt.warn('名字太短了'); //或grunt.fatal
		}
		console.log('hello'+name);
	})
	//2.传入了参数时命令行需输入grunt+任务名+：参数的值。如：grunt greet:dengzhao；命令行输出hello dengzhao
	//如果传入参数名字太短则会停止执行
};