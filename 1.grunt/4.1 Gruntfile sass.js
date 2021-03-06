module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');

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
				files:['./**.html'], //根目录下的html文件
				options:{
					livereload:true
				}
			},
			css:{
				files:['./css/*.css'], //根目录css文件夹下的css文件
				options:{
					livereload:true
				}
			},
			sass:{
				files:['./scss/*.scss'],//根目录scss文件夹下的scss文件
				tasks:['sass:dist'], //监听sass文件变动时执行sass编译任务
			}
		},
		sass:{
			dist:{ //dist目标
				options:{
					style:'expanded' //规定的
				},
				files:{
					//编译目标和编译位置，编译多个用逗号隔开
					'css/style.css':'scss/style.scss'
				}
			}
		}
	});
	grunt.registerTask('server',['connect','watch']);
};