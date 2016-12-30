module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.initConfig({
		copy:{
			css:{
				// css就是copy任务的target，将src里面文件复制到dest路径里面
				src:'1.css',
				dest: 'css/'
			},
			js:{
				// css就是copy任务的target，将src里面文件复制到dest路径里面
				src:'1.js',
				dest: 'js/'
			}
		},
		watch:{
			css:{
				files:['1.css'],   //监听的文件路径
				tasks:['copy:css'] //监听css文件发生改变的时候，就会去执行copy:css这个任务
			}
		}
	})
	//命令行运行grunt copy就能实现多个文件复制
	//命令行运行grunt watch后一直会监听文件变化
};