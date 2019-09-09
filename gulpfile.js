var gulp =require('gulp');
var jshint=require('gulp-jshint');  
var jsfiles=['*.js','src/**/*.js'];
var jscs=require('gulp-jscs');
var nodemon=require('gulp-nodemon');
 
gulp.task('style',function(){
     return gulp.src(jsfiles)
         .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish',{
          verbose:true
      }))
    .pipe(jscs());
  
});
gulp.task('inject',function(){
     var wiredep=require('wiredep').stream;  
      
      var inject=require('gulp-inject');
    var          injectSrc=gulp.src(['./public/css/*.css','./public/js/*.js'],{read:false});
      
      var injectOptions={
           ignorePath:'/public' 
      };
      var options={
          bowerJson: require('./bower.json'),
          directory:'./public/lib',
          ignorePath:'../../public'
      };
      return gulp.src('./src/views/*.ejs')
      .pipe(wiredep(options))
      .pipe(inject(injectSrc,injectOptions))
      .pipe(gulp.dest('./src/views'));
    });  
gulp.task('serve',function(){
     var options={
         script:'app.js',
         delayTime:1,
         env:{
             'PORT':5000
         },
         watch: jsfiles
     }
     return nodemon(options).on('restart',function(ev){
         console.log('Restarting...');  
     });
});