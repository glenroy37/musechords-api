const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const passwordHash = require("password-hash");
const  argv = require('yargs').argv;

let Users;
let Sheets;
try{
  Users = require('./dist/model/Users.js');
  Sheets = require('./dist/model/Sheets.js');
} catch (err) {
  console.log("To use DB reset and create User please compile the project first");
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

gulp.task('default', ['watch', 'assets']);
