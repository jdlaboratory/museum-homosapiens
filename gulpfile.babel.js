import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

const sass = require("gulp-sass")(require("node-sass"));

const routes = {
    pug: {
        watch: "src/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    pugSub: {
        watch: "src/html/*.pug",
        src: "src/html/*.pug",
        dest: "build/html"
    },
    img: {
        src: "src/img/*",
        dest: "build/img"
    },
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build/css"
    },
    js: {
        watch: "src/js/**/*.js",
        src: "src/js/*.js",
        dest: "build/js"
    }
};

const pug = () => 
    gulp
        .src(routes.pug.src)
        .pipe(gpug())
        .pipe(gulp.dest(routes.pug.dest));

const pugSub = () => 
    gulp
        .src(routes.pugSub.src)
        .pipe(gpug())
        .pipe(gulp.dest(routes.pugSub.dest));

const clean = () => del(["build/css", "build/img", "build/js", "build/*.html", "build/html"]);

const webserver = () => 
    gulp.src("build").pipe(ws({
        livereload:true
    }));


const img = () => 
    gulp
        .src(routes.img.src)
        .pipe(gulp.dest(routes.img.dest));

const styles = () =>
    gulp
        .src(routes.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(miniCSS())
        .pipe(gulp.dest(routes.scss.dest)); 

const js = () => 
    gulp
        .src(routes.js.src)
        .pipe(bro({
            transfrom: [babelify.configure({ presets: ["@babel/preset-env"] }),
                ["uglifyify", {global: true}]
            ]
        })
        )
        .pipe(gulp.dest(routes.js.dest));
    

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.pugSub.watch, pugSub);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, styles);
    gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, pugSub, styles, js]);
const live = gulp.series([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);