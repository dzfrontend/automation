module.exports = function(grunt){
	//grunt.file.mkdir创建文件夹，命令行运行grunt createFolders创建文件夹
	grunt.registerTask('createFolders',function(){
		grunt.file.mkdir('dist/css');
	})
	// 命令行运行grunt clean删除文件夹
	grunt.registerTask('clean',function(){
		grunt.file.delete('dist');
	})
};