module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
		connect:{
			server:{ //创建一个服务器
				options:{
					port:8000,//服务器端口号，默认8000
					base:'./' //服务器根目录
				}
			}
		},
		//命令行运行grunt connect:server开启这个服务器 grunt connect:server:keepalive让服务器一直开启
	})	
};