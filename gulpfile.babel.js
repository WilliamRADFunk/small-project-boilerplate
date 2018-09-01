import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import tslint from 'gulp-tslint';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import del from 'del';
import sassLint from 'gulp-sass-lint';
import typedoc from 'gulp-typedoc';

gulp.task('clean:dist', () => {
    gutil.log('== Cleaning dist ==');
    return del(['dist/**/*']);
});

gulp.task('clean:docs', () => {
    gutil.log('== Cleaning docs ==');
    return del(['docs/**/*']);
});

gulp.task('readme', () => {
    gutil.log('== Assembling documentation files ==');
    return gulp.src(['src/**/*.ts'])
    .pipe(typedoc({
        // TypeScript options (see typescript docs)
        module: 'commonjs',
        target: 'es5',
        excludeExternals: true,
        includeDeclarations: true,

        // Output options (see typedoc docs)
        out: './docs',

        // TypeDoc options (see typedoc docs)
        name: 'small-project-boilerplate',
        theme: 'markdown',
        plugins: ['mdFlavour bitbucket'],
        ignoreCompilerErrors: false,
        version: true,
    }))
;
});

gulp.task('tslint', () => {
    gutil.log('== Lintifying the ts files ==');
    gulp.src('src/**/*.ts')
    .pipe(tslint({
        formatter: 'verbose'
    }))
    .pipe(tslint.report())
});

gulp.task('sasslint', () => {
    gutil.log('== Lintifying the ts files ==');
    gulp.src(['src/scss/**/*.s+(a|c)ss'])
    .pipe(sassLint({
        options: {
          formatter: 'stylish'
        },
        files: {ignore: 'src/scss/reset_author_richard_clark.scss'},
        rules: {
          'no-ids': 1,
          'no-mergeable-selectors': 0
        }
      }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
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
    gulp.src([
        'src/scss/reset_author_richard_clark.scss',
        'src/scss/**/*.scss'
    ])
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(concat('styles.css'))
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
    ['tslint', 'sasslint'],
    ['assets', 'html', 'sass', 'typescript']
));

gulp.task('typedoc', gulpSequence(
    'clean:docs',
    'readme'
));

gulp.task('lint', gulpSequence(
    ['tslint', 'sasslint']
));

gulp.task('default', gulpSequence(
    'clean:dist',
    ['assets', 'html', 'sass', 'typescript'],
    'connect',
    'watch'
));