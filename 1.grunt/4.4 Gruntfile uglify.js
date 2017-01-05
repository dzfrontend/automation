module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		uglify:{
			builda: {//任务一：压缩a.js
                files: {
                    'output/js/a.min.js': ['js/a.js'] //压缩后文件和压缩文件不能同路径
                }
            },
            buildab:{//任务二：合并a.js和b.js并压缩
                files: {
                    'output/js/ab.min.js': ['js/a.js', 'js/b.js']
                }
            },
            buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
                files: [{
                    expand:true,
                    cwd:'js',//js目录下
                    src:'**/*.js',//所有js文件
                    dest: 'output/js'//输出到此目录下
                }]
            },
		}
	});
	//命令行grunt uglify:builda执行任务一，依次类推
};