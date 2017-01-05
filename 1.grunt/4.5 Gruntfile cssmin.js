module.exports = function(grunt){
    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        cssmin:{
            dist:{
                src:'css/style.css',
                dest:'css/style.min.css'
            }
        }
    });
    //命令行grunt cssmin压缩指定css
};