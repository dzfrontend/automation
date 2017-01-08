var gulp = require('gulp');

gulp.task('copy-index',function(){
	// 读取index.html文件，然后pipe到管道，输出到dist文件夹里面。这里不像grunt一样需要插件
	return gulp.src('index.html').pipe(gulp.dest('dist'));
});

gulp.task("copy-images",function(){
	//images/* 表示images目录不包含子目录下的所有东西
	//images/*/* 表示images目录和一级子目录下的所有东西
	//images/**/* 表示images目录和所有子目录下的所有东西
	return gulp.src('images/**/*').pipe(gulp.dest('dist/images'));
})

//用[]包含多个文件路径，用!忽略文件
gulp.task('copy-data',function(){
	// 复制html里的.html文件和json里的.json文件到dist/data文件夹里，但是排除json里的negate.json文件
	return gulp.src(['html/*.html','json/*.json','!json/negate.json'])
	.pipe(gulp.dest('dist/data'));
});

// 命令行gulp copy-index就可以复制index.html文件到dist文件夹里
// 命令行gulp copy-images复制所有图片到dist/images文件夹里


//任务依赖，用[]将任务连接起来执行
gulp.task('bulid',['copy-index','copy-images','copy-data'],function(){
	console.log('复制成功');
})