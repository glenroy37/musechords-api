const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const passwordHash = require("password-hash");
const  argv = require('yargs').argv;
const xml2js = require('xml2js');
const fs = require('fs');
var parser = new xml2js.Parser();

let Users;
let Sheets;
try{
  Users = require('./dist/model/Users.js');
  Sheets = require('./dist/model/Sheets.js');
} catch (err) {
  console.log("To use DB reset, create User and import please compile the project first");
}

const tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('resetDB', function() {
  if(Users && Sheets){
    Users.default.getInstance().init(true).then(function () {
      Sheets.default.getInstance().init(true).then(function () {
          console.log("Database resetted");
      });
    });
  }
});

gulp.task('createUser', function(){
  if(argv.username == null || argv.email == null || argv.password == null){
    console.log("You need to specify --username, --email and --password");
    return;
  }
  if(Users){
    Users.default.getInstance().newUser(argv.username, argv.email, argv.password).then(function(){
      console.log("User created");
    });
  }
});

gulp.task('import', function(){
  if(argv.source == null || argv.userid == null){
    console.log("You need to specify --source and --userid");
    return;
  }
  fs.readFile(__dirname + "/"+ argv.source, function(err, data){
    console.log(__dirname+"/"+argv.source);
    parser.parseString(data, function(err, result){
      if(err){
        console.log(err);
        return;
      }
      const song = {
        title: result.song.title[0],
        capo: 0,
        author: result.song.author[0],
        timesig: result.song.timesig[0],
        transpose: 0,
        lyrics: result.song.lyrics[0],
        userId: argv.userId
      };
      Sheets.default.getInstance().createSheet(song).then(function(){
        console.log("Sheet imported");
      });
    });
  });
});

gulp.task('default', ['watch', 'assets']);
