//plugins do gulp
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require ('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

//criando caminhos
const paths = {
    html: {
        src: 'src/html/**/*.html',
        dev: 'dev/html',
        dist: 'dist'
    },
    styles: {
        src: 'src/style/**/*.scss',
        dev: 'dev/style/',
        dist: 'dist/style/'
    },
    scripts: {
        src: 'src/javascript/**/*.js',
        dev: 'dev/javascript/',
        dist: 'dist/javascript/'
    },
    images: {
        src: 'src/image/**/*',
        dev: 'dev/image/',
        dist: 'dist/image/'
    }
};

//navegador atualiza ao finalizar das tarefas
function serve(done) {
    browserSync.init({
        server: {
            baseDir: 'dev'
        },
        startPath: 'html/index.html',
        open:true,
    });
    done();
}

//scss em css para dev
function stylesDev() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error',sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dev))
    .pipe(browserSync.stream());
}

//scss em css minificado para dist
function stylesDist() {
    return gulp.src(paths.styles.src)
    .pipe(sass().on('error',sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dist));
}

//html para dev
function htmlDev() {
    return gulp.src(paths.html.src)
    .pipe(replace('@@CSS_PATH@@', '/style/main.css'))
    .pipe(gulp.dest(paths.html.dev))
    .pipe(browserSync.stream());
}

//html em minificado para dist
function htmlDist() {
    return gulp.src(paths.html.src)
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest(paths.html.dist));
}

//javascript para dev 
function scriptsDev() {
    return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dev))
    .pipe(browserSync.stream());
}

//javascript em minificado para dist
function scriptsDist() {
    return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dist));
}

//imagens para dev
function imagesDev() {
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dev));
}

//images para dist
function imagesDist() {
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dist));
}

//watch para desenvolvimento
function watchFiles() {
    gulp.watch(paths.styles.src,stylesDev);
    gulp.watch(paths.html.src,htmlDev);
    gulp.watch(paths.scripts.src,scriptsDev);
    gulp.watch(paths.scripts.src,imagesDev);
}

//tasks
const dev = gulp.series(serve, imagesDev ,stylesDev, htmlDev, scriptsDev, watchFiles);
const build = gulp.series(stylesDist, htmlDist, scriptsDist, imagesDist);


//Exportar
exports.dev = dev; // npm run gulp dev
exports.build = build; // npm run gulp build
exports.default = build; // seria somente o npm run gulp