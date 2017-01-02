module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
		connect:{
			server:{ //创建一个服务器
				options:{
					open:true, //自动打开浏览器窗口
					hostname: 'localhost', //域名，必需
					port:8000,//服务器端口号，默认8000
					base:'./', //服务器根目录
					livereload:true
				}
			}
		},
		watch:{
			html:{
				files:['**.html'],
				options:{
					livereload:true
				}
			}
		}
	});
	grunt.registerTask('server',['connect','watch']);
};