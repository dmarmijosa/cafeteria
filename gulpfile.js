const {src, dest, watch, series, parallel} = require("gulp");
// css y sass
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
// imagenes
const imagenmin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const opciones = { quality: 50};opciones
// reintentos
const reintentos =3;
    let retryCount =0;
const css = (done) => {
    //compilar sass
    // pasos: 1 .identificar archivo, 2 - compilar, 3 -  guardar css
    src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));
    done();
};
const imagenes = (done) => {
    src('src/img/**/*')
        .pipe(imagenmin({optimizationLevel:3}))
        .pipe(dest('build/img'));
    done();
}
const versionWebp = () =>{
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}
const versionAvif = () =>{
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}
const dev = () => {
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*",imagenes);
    //watch("src/scss/app.scss", css);
};

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif , css, dev);
