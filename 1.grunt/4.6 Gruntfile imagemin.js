module.exports = function(grunt){
	// 加载插件
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.initConfig({
        imagemin:{
            dist:{
                expand:true, //需要将expand设为true
                src:'images/**/*.{png,jpg}', //images及其子目录下所有png,jpg图片
                dest:'dist/'
            }
        }
	});
	//命令行grunt imagemin压缩指定图片
};