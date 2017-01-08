var gulp = require('gulp');

gulp.task('copy-css',function(){
	return gulp.src('style.css').pipe(gulp.dest('dist/css'));
});

gulp.task('watch',function(){
	gulp.watch('style.css',['copy-css']);
})

//命令行gulp watch执行watch这个任务的时候监视style.css文件，当style.css文件发生变化的时候，去执行copy-css这个任务