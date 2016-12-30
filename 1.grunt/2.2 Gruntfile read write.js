module.exports = function(grunt){
	//初始化读取json文件
	grunt.initConfig({
		//grunt.file.readJSON这个方法读取一个json文件，然后写入到一个指定文件里面
		pkg:grunt.file.readJSON('package.json')
	});
	grunt.registerTask('copyright',function(){
		//读数据
		var content = grunt.template.process('<%= pkg.name %> 这个项目是由 <%= pkg.author %> 创建的，现在的版本是 <%= pkg.version %>.');
		//写数据
		grunt.file.write('copyright.text',content);
	})
};