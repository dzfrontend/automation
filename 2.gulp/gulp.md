##前端自动化

###二：gulp

####1.1、install安装  

　　1.**安装node.js之后，命令行全局安装gulp：npm install -g gulp**，这样在任何地方都可以使用gulp命令；如果是mac系统前面加上sudo：sudo npm install -g gulp。命令行gulp -v查看gulp是否安装成功。  
	
	npm install -g gulp 

　　2.npm init创建package.json文件  
　　　npm install gulp --sava-dev安装gulp到package.json的开发依赖里面。所有加上--save-dev安装的插件都会写到package.json依赖里面，下次换目录直接npm install自动安装所有的依赖插件。

	cd desktop //进入桌面
	mkdir gulp //新建文件夹
	cd gulp
	npm init
	npm install gulp --sava-dev  

　　3.出错：安装--sava-dev到本地出错Refusing to install gulp as a dependency of itself，是因为package.json文件的name名字不能跟npm模块相同，所以随便改改name名字再安装到本地

####1.2、gulp.task()创建任务  

　　创建gulpfile.js文件，在gulpfile.js里用require将gulp模块包含进来  

	//用require将gulp模块包含进来，就可以使用gulp模块里面的方法
	var gulp = require('gulp');
	
	//1.gulp.task()创建gulp任务，第一个参数任务名，第二个参数任务要做的事情
	gulp.task('hello',function(){
		console.log('hello gulp');
	})
	
	//2.命令行输入gulp+任务名执行任务，gulp默认执行gulp default的任务。
	
	//3.gulp执行默认任务，将一个或多个任务名写在一个数组里面，命令行只需输入gulp就可以执行一个或多个任务
	gulp.task('default',['hello']);

####1.3、gulp.src()、.pipe()和gulp.dest()  

　　gulp.src()引入文件  
　　.pipe()处理文件  
　　.pipe(gulp.dest())输出处理文件

####2.1、copy  

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

####2.2、gulp.watch()监视  

	var gulp = require('gulp');
	
	gulp.task('copy-css',function(){
		return gulp.src('style.css').pipe(gulp.dest('dist/css'));
	});
	
	gulp.task('watch',function(){
		gulp.watch('style.css',['copy-css']);
	})
	
	//命令行gulp watch执行watch这个任务的时候监视style.css文件，当style.css文件发生变化的时候，去执行copy-css这个任务

####3.1、connect插件搭建服务器  

　　搭建服务器插件：gulp-connect  

	npm install gulp-connect --save-dev  

　　下面搭建一个服务器并监听html和css文件变化时实时刷新浏览器  

	var gulp = require('gulp');
	var connect = require('gulp-connect'); //服务器插件
	
	//用connect.server()方法创建服务器
	gulp.task('server',function(){
		connect.server({
			root:'./', //指定服务器根目录
			livereload:true //启用实时刷新
		});
	})
	
	//创建一个监视任务，当指定路径html和css文件发生变化时实时刷新浏览器
	gulp.task('watch',function(){
		gulp.watch('**.html',['livereload-html']);
		gulp.watch('css/*.css',['livereload-css']);
	})
	
	//实时刷新
	gulp.task('livereload-html',function(){
		gulp.src('**.html')
		.pipe(connect.reload()); //connect.reload()刷新浏览器
	});
	gulp.task('livereload-css',function(){
		gulp.src('css/*.css')
		.pipe(connect.reload()); //connect.reload()刷新浏览器
	})
	
	//执行server和watch任务
	gulp.task('default',['server','watch']);
　　
####3.2、gulp-sass插件编译sass  

　　安装sass插件：
	
	npm install gulp-sass --save-dev  

　　除了安装sass插件，还需要安装ruby和sass。安装ruby和sass百度sass:<http://www.w3cplus.com/sassguide/>  

	ruby -v //查看ruby是否安装好
	sass -v //查看sass是否安装好  

　　sass编译成css:  命令行gulp sass就可以编译sass

	gulp.task('sass',function(){
		gulp.src('scss/**/*.scss')
		.pipe(sass()) //sass()编译scss
		.pipe(gulp.dest('css')); //输出编译文件
	})

　　下面配置实现了编译scss的时候自动刷新浏览器生成效果，命令行运行gulp生成自动刷新服务器  

	var gulp = require('gulp');
	var connect = require('gulp-connect'); //服务器插件
	var sass = require('gulp-sass'); //sass插件
	
	//用connect.server()方法创建服务器
	gulp.task('server',function(){
		connect.server({
			root:'./', //指定服务器根目录
			livereload:true, //启用实时刷新
		});
	})
	gulp.task('sass',function(){
		gulp.src('scss/**/*.scss')
		.pipe(sass()) //sass()编译scss
		.pipe(gulp.dest('css')); //输出编译文件
	})
	
	//创建一个监视任务，当指定路径html和css文件发生变化时实时刷新浏览器
	gulp.task('watch',function(){
		gulp.watch('**.html',['livereload-html']);
		gulp.watch('css/*.css',['livereload-css']);
		gulp.watch('scss/**/*.scss',['sass']); //监视scss文件改动时执行sass任务
	})
	
	//实时刷新
	gulp.task('livereload-html',function(){
		gulp.src('**.html')
		.pipe(connect.reload()); //connect.reload()刷新浏览器
	});
	gulp.task('livereload-css',function(){
		gulp.src('css/*.css')
		.pipe(connect.reload());
	})
	
	//执行server和watch任务
	gulp.task('default',['server','watch']);

####3.3、gulp-less插件编译less  

　　安装less插件：  

	npm install gulp-less --save-dev  

　　less和sass类似：

	var gulp = require('gulp');
	var connect = require('gulp-connect'); //服务器插件
	var less = require('gulp-less'); //less插件
	
	//用connect.server()方法创建服务器
	gulp.task('server',function(){
		connect.server({
			root:'./', //指定服务器根目录
			livereload:true, //启用实时刷新
		});
	})
	gulp.task('less',function(){
		gulp.src('less/**/*.less')
		.pipe(less()) //less()编译less
		.pipe(gulp.dest('css')); //输出编译文件
	})
	
	//创建一个监视任务，当指定路径html和css文件发生变化时实时刷新浏览器
	gulp.task('watch',function(){
		gulp.watch('**.html',['livereload-html']);
		gulp.watch('css/*.css',['livereload-css']);
		gulp.watch('less/**/*.less',['less']); //监视less文件改动时执行less任务
	})
	
	//实时刷新
	gulp.task('livereload-html',function(){
		gulp.src('**.html')
		.pipe(connect.reload()); //connect.reload()刷新浏览器
	});
	gulp.task('livereload-css',function(){
		gulp.src('css/*.css')
		.pipe(connect.reload());
	})
	
	//执行server和watch任务
	gulp.task('default',['server','watch']);

####3.4、gulp-concat插件合并文件  

　　在项目中可能要合并js，css文件，用到gulp-concat  

　　下面合并js文件：

	var gulp = require('gulp');
	var concat = require('gulp-concat'); //合并文件插件
	
	gulp.task('scripts',function(){
		gulp.src(['js/1.js','js/2.js']) //待合并文件
		.pipe(concat('3.js')) //concat()合并文件，里面指定合并后文件名
		.pipe(gulp.dist('dist/js')); //合并后文件放到指定文件夹
	})

####3.5、gulp-uglify插件压缩js  

　　安装gulp-uglify插件  

　　压缩js： .pipe(uglify()) 
	
	var gulp = require('gulp');
	var concat = require('gulp-concat'); //合并文件插件
	var uglify = require('gulp-uglify'); //压缩js插件
	
	gulp.task('scripts',function(){
		gulp.src(['js/1.js','js/2.js']) //待合并文件
		.pipe(concat('3.js')) //concat()合并文件，里面指定合并后文件名
		.pipe(uglify()) //合并后压缩
		.pipe(gulp.dist('dist/js')); //合并后文件放到指定文件夹
	})


####3.6、gulp-minify-css插件压缩css  

　　安装gulp-minify-css插件  

　　压缩css: .pipe(minifyCSS())

	var gulp = require('gulp');
	var sass = require('gulp-sass');
	var minifyCSS = require('gulp-minify-css'); //压缩css插件
	
	gulp.task('sass',function(){
		gulp.src('scss/**/*.scss')
		.pipe(sass()) //sass()编译scss
		.pipe(minifyCSS()) //编译scss后压缩
		.pipe(gulp.dest('css')); //输出编译文件
	})

####3.7、gulp-imagemin插件压缩图片

　　安装gulp-imagemin插件压缩图片尺寸，在不改变图片质量的情况下压缩尺寸  

　　压缩图片：

	var gulp = require('gulp');
	var imagemin = require('gulp-imagemin'); //压缩图片插件
	
	gulp.task("copy-images",function(){
		return gulp.src('images/**/*')
		.pipe(imagemin()) //imagemin()里面还可以配置压缩图片的参数
		.pipe(gulp.dest('dist/images'));
	})