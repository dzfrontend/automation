module.exports = function(grunt){
	// 用grunt.loadNpmTasks把grunt-contrib-copy里面定义的任务加载进来
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.initConfig({
		copy:{
			css:{
				// css就是copy任务的target，将src里面文件复制到dest路径里面
				src:'1.css',
				dest: 'css/'
			}
		}
	})
	//命令行运行grunt copy:css就能实现复制
};