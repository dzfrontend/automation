module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({
		concat:{
			js:{ //js目标配置
				src:['js/concat1.js','js/concat2.js'], //合并文件路径
				dest:'js/concat.js' //合并后文件路径
			}
		},
	});
	//命令行grunt concat合并js文件
};