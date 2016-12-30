module.exports = function(grunt){ 
	// initConfig或grunt.config.init()里面配置参数传递数据，配置参数为=>任务名：数据
	grunt.initConfig({
		task1:{
			data1:'这是为任务task1传递的数据1',
			data2:'这是为任务task1传递的数据2'
		}
	});
	//创建多任务registerMutiTask执行多条数据；this.target表示该任务，this.data为数据
	grunt.registerMultiTask('task1',function(){
		// console.log(grunt.config.get('task1.data'));
		console.log(this.target+':'+this.data);
	});
};