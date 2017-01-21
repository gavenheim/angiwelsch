import autoprefixer from 'autoprefixer';
import group from 'gulp-group-css-media-queries';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import lost from 'lost';

const $ = loadPlugins();

const supported = [
  '> 1%',
  'last 2 versions',
  'IE >= 9'
];

const plugins = [
  autoprefixer(supported),
  lost()
];

const styles = () => {
  return gulp.src('_app/styles/styles.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['sass'],
      onError: $.util.log
    }))
    .pipe($.postcss(plugins))
    .pipe(group())
    .pipe($.rename({extname: '.css'}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./css'))
};

gulp.task('build:styles', styles);