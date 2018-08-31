import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import tslint from "gulp-tslint";
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import del from 'del';

gulp.task('clean:dist', () => {
    gutil.log('== Cleaning dist ==');
    return del(['dist/**/*']);
});

gulp.task('tslint', () => {
    gutil.log('== Lintifying the ts files ==');
    gulp.src('src/**/*.ts')
    .pipe(tslint({
        formatter: 'verbose'
    }))
    .pipe(tslint.report())
});

gulp.task('html', () => {
    gutil.log('== Copying index.html to dist ==');
    gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
});

gulp.task('assets', () => {
    gutil.log('== Copying index.html to dist ==');
    gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(connect.reload())
});
 
gulp.task('typescript', () => {
    gutil.log('== Transmogrifying ts to js ==');
    gulp.src('src/**/*.ts')
    .pipe(typescript({
        noImplicitAny: true,
        sourceMap: true
    }))
        .on('error', gutil.log)
    .pipe(uglify())
        .on('error', gutil.log)
    .pipe(concat('scripts.js'))
        .on('error', gutil.log)
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
});

gulp.task('sass', () => {
    gutil.log('== Converting scss to css ==');
    gulp.src('src/scss/**/*.scss')
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
});

gulp.task('connect', () => {
    gutil.log('== Opening live reload server ==');
    connect.server({
        root: 'dist',
        livereload: true
    })
});

gulp.task('watch', () => {
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/**/*.ts', ['typescript']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/index.html', ['html']);
});

gulp.task('build', gulpSequence(
    'clean:dist',
    'tslint',
    ['assets', 'html', 'sass', 'typescript']
));

gulp.task('default', gulpSequence(
    'clean:dist',
    ['assets', 'html', 'sass', 'typescript'],
    'connect',
    'watch'
));