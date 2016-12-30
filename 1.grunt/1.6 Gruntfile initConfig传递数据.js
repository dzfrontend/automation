module.exports = function(grunt){ 
	// initConfig或grunt.config.init()里面配置参数传递数据，配置参数为=>任务名：数据
	//在任务里面用grunt.config.get()得到数据
	grunt.initConfig({
		task1:{
			data:'这是为任务task1传递的数据'
		}
	});
	grunt.registerTask('task1',function(){
		console.log(grunt.config.get('task1.data'));
	});
};