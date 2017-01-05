##前端自动化

###一：grunt

####1.1、install安装  

　　1.**安装node之后，全局安装grunt：npm install -g grunt-cli**，这样在任何地方都可以使用grunt命令；如果是mac系统前面加上sudo：sudo npm install -g grunt-cli  
	
	npm install -g grunt-cli 

　　2.npm init创建package.json文件  
　　　npm install grunt --sava-dev安装grunt到package.json的开发依赖里面。所有加上--save-dev安装的插件都会写到package.json依赖里面，下次换目录直接npm install自动安装所有的依赖插件。

	cd desktop //进入桌面
	mkdir grunt //新建文件夹
	cd grunt
	npm init
	npm install grunt --sava-dev  

　　3.出错：安装--sava-dev到本地出错Refusing to install grunt as a dependency of itself，是因为package.json文件的name名字不能跟npm模块相同，所以随便改改name名字再安装到本地

####1.2、registerTask注册任务  

　　创建Gruntfile.js文件  
　　文件的开始module.exports等于匿名函数，函数接收一个叫做grunt的参数，module.exports是来自node.js的模块系统  

	module.exports = function(grunt){
		// 函数里就可以使用grunt这个对象里面的方法创建任务
		//1.注册任务registerTask：第一个参数任务名，第二个参数任务要做的事情函数
		grunt.registerTask('default',function(){
			console.log('hello grunt'); //或者grunt.log.write('hello grunt');
		})
		//2.命令行输入grunt+任务名执行任务，grunt默认执行grunt default的任务。输入之后命令行输出hello grunt
	};  

####1.3、registerTask传递参数  

　　registerTask回调函数可以传入参数，命令行的时候grunt+任务名+：参数的值  

	module.exports = function(grunt){ //grunt 
		//1.注册任务registerTask：第一个参数任务名，第二个参数任务要做的事情函数，回调函数可以传入参数
		grunt.registerTask('greet',function(name){
			console.log('hello'+name);
		})
		//2.传入了参数时命令行需输入grunt+任务名+：参数的值。如：grunt greet:dengzhao；命令行输出hello dengzhao
	};  

####1.4、错误处理grunt.warn或grunt.fatal

　　grunt.warn或grunt.fatal停止执行  

	module.exports = function(grunt){ //grunt 
		//1.注册任务registerTask：第一个参数任务名，第二个参数任务要做的事情函数，第二个参数可以传入参数
		grunt.registerTask('greet',function(name){
			if(name.length<2){
				grunt.warn('名字太短了'); //或grunt.fatal
			}
			console.log('hello'+name);
		})
		//2.传入了参数时命令行需输入grunt+任务名+：参数的值。如：grunt greet:dengzhao；命令行输出hello dengzhao
		//如果传入参数名字太短则会停止执行
	};  

####1.5、chain：registerTask执行多个任务  

　　registerTask执行多个任务，将多个任务名写在一个数组里面  

	module.exports = function(grunt){ 
		grunt.registerTask('task1',function(){
			console.log('task1');
		});
		grunt.registerTask('task2',function(){
			console.log('task2');
		})
	
		// registerTask执行多个任务，将多个任务名写在一个数组里面
		grunt.registerTask('default',['task1','task2']);
	};

####1.6、init：initConfig传递数据  

　　initConfig或grunt.config.init()里面配置参数传递数据，配置参数为=>任务名：数据  
　　在任务里面用grunt.config.get()得到数据  

	module.exports = function(grunt){ 
		// initConfig或grunt.config.init()里面配置参数传递数据，配置参数为=>任务名：数据
		//在任务里面用grunt.config.get()得到数据
		grunt.initConfig({
			task1:{
				data:'这是为任务task1传递的数据'
			}
		});
		grunt.registerTask('task1',function(){
			console.log(grunt.config.get('task1.data'));
		});
	};  

####1.7、mutitask：registerMutiTask多任务  

　　创建多任务registerMutiTask执行多条数据；this.target表示该任务，this.data为数据  
	
	module.exports = function(grunt){ 
		// initConfig或grunt.config.init()里面配置参数传递数据，配置参数为=>任务名：数据
		grunt.initConfig({
			task1:{
				data1:'这是为任务task1传递的数据1',
				data2:'这是为任务task1传递的数据2'
			}
		});
		//创建多任务registerMutiTask执行多条数据；this.target表示该任务，this.data为数据
		grunt.registerMultiTask('task1',function(){
			// console.log(grunt.config.get('task1.data'));
			console.log(this.target+':'+this.data);
		});
	};  

　　这样就一次性输出了所有数据  

####2.1、file-api  

　　在grunt任务里创建目录使用grunt.file.mkdir()  
　　　　　　　　　删除目录使用grunt.file.delete()  

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

####2.2、read write  

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

####2.3、copy-file　安装grunt-contrib-copy插件  

　　安装grunt-contrib-copy插件实现复制  

	npm install grunt-contrib-copy --save-dev  

　　用grunt.loadNpmTasks把grunt-contrib-copy里面定义的任务加载进来，初始化定义一个copy任务，命令行运行grunt copy:css就能实现复制  

	module.exports = function(grunt){
		// 用grunt.loadNpmTasks把grunt-contrib-copy里面定义的任务加载进来
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.initConfig({
			copy:{
				css:{
					// css就是copy任务的target，将src里面文件复制到dest路径里面
					src:'1.css',
					dest: 'css/'
				}
			}
		})
		//命令行运行grunt copy:css就能实现复制
	};  

　　上面将1.css文件复制到了css文件夹里面

####2.4、copy-files复制多个文件  

　　命令行运行grunt copy就能实现多个文件复制  

	module.exports = function(grunt){
		// 用grunt.loadNpmTasks把grunt-contrib-copy里面定义的任务加载进来
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.initConfig({
			copy:{
				css:{
					// css就是copy任务的target，将src里面文件复制到dest路径里面
					src:'1.css',
					dest: 'css/'
				},
				js:{
					// css就是copy任务的target，将src里面文件复制到dest路径里面
					src:'1.js',
					dest: 'js/'
				}
			}
		})
		//命令行运行grunt copy就能实现多个文件复制
	};  

####2.5、watch-files　安装grunt-contrib-watch插件

　　监听文件变化：grunt-contrib-watch插件  
	
	//安装
	npm install grunt-contrib-watch --sava-dev  

　　加载watch插件，新建监听任务watch，命令行grunt watch  

	module.exports = function(grunt){
		// 加载插件
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.initConfig({
			copy:{
				css:{
					// css就是copy任务的target，将src里面文件复制到dest路径里面
					src:'1.css',
					dest: 'css/'
				},
				js:{
					// css就是copy任务的target，将src里面文件复制到dest路径里面
					src:'1.js',
					dest: 'js/'
				}
			},
			watch:{
				css:{
					files:['1.css'],   //监听的文件路径
					tasks:['copy:css'] //监听css文件发生改变的时候，就会去执行copy:css这个任务
				}
			}
		})
		//命令行运行grunt copy就能实现多个文件复制
		//命令行运行grunt watch后一直会监听文件变化
	};  

　　上面配置实现了css文件的实时拷贝

####3.1、connect搭建服务器  

　　搭建服务器插件：grunt-contrib-connect  

	npm install grunt-contrib-connect --save-dev  

	module.exports = function(grunt){
		// 加载插件
		grunt.loadNpmTasks('grunt-contrib-connect');
	
		grunt.initConfig({
			connect:{
				server:{ //创建一个服务器
					options:{
						port:8000,//服务器端口号，默认8000
						base:'dist' //服务器根目录
					}
				}
			},
			//命令行运行grunt connect:server开启这个服务器 grunt connect:server:keepalive让服务器一直开启
		})	
	};  

####3.2、livereload实时刷新浏览器  

　　在connect和watch里添加livereload:true，livereload要放在options里面，然后添加任务同时执行connect和watch  

	module.exports = function(grunt){
		// 加载插件
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-connect');
	
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
					files:['**.html'],
					options:{
						livereload:true
					}
				}
			}
		});
		grunt.registerTask('server',['connect','watch']);
	};  

　　上面配置好，命令行运行grunt server会自动打开服务器根目录下的index.html文件，并在保存时浏览器自动刷新。  
　　实现不了自动刷新最好装上grunt-contrib-livereload插件，不知道是不是这个的影响，之前有过没成功。
　　
####4.1、sass  

　　安装sass插件：
	
	npm install grunt-contrib-sass --save-dev  

　　除了安装sass插件，还需要安装ruby和sass。安装ruby和sass百度sass:<http://www.w3cplus.com/sassguide/>  

	ruby -v //查看ruby是否安装好
	sass -v //查看sass是否安装好  

　　sass编译成css:  

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

　　下面配置实现了编译scss的时候自动刷新浏览器生成效果，命令行运行grunt server生成自动刷新服务器  

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

####4.2、less  

　　安装less插件：  

	npm install grunt-contrib-less --save-dev  

　　less和sass类似：

	module.exports = function(grunt){
		// 加载插件
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-less');
	
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
				less:{
					files:['./less/*.less'],//根目录less文件夹下的less文件
					tasks:['less:dist'], //监听less文件变动时执行less编译任务
				}
			},
			less:{
				dist:{ //dist目标
					files:{
						//编译目标和编译位置，编译多个用逗号隔开
						'css/style.css':'less/style.less'
					}
				}
			}
		});
		grunt.registerTask('server',['connect','watch']);
	}; 

####4.3、concat合并  

　　在项目中可能要合并js，css文件，用到grunt-contrib-concat  

　　下面合并js文件：

	module.exports = function(grunt){
		// 加载插件
		grunt.loadNpmTasks('grunt-contrib-concat');
	
		grunt.initConfig({
			concat:{
				js:{ //js目标配置
					src:['js/concat1.js','js/concat2.js'], //合并文件路径
					dest:'js/concat.js' //合并后文件路径
	
					/*或者files:{
						['js/concat1.js','js/concat2.js']:'js/concat.js'
					}*/
				}
			},
		});
		//命令行grunt concat合并js文件
	};

####4.4、uglify 压缩js  

　　安装grunt-contrib-uglify插件  

　　压缩js：  
	
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

####4.5、cssmin 压缩css  

　　安装grunt-contrib-cssmin插件  

　　压缩css:

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

####4.6、imagemin 压缩图片

　　安装grunt-contrib-imagemin插件  

　　压缩图片：

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