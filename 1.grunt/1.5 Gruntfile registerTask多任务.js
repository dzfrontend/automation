module.exports = function(grunt){ 
	grunt.registerTask('task1',function(){
		console.log('task1');
	});
	grunt.registerTask('task2',function(){
		console.log('task2');
	})

	// registerTask执行多个任务，将多个任务名写在一个数组里面
	grunt.registerTask('default',['task1','task2']);
};