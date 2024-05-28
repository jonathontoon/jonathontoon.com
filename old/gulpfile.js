  /**
    Settings
    Turn on/off build features
  **/

  const settings = {
    clean: true,
    html: true,
      scripts: true,
      styles: true,
      static: true,
      reload: true
  };
  
  /**
    Paths to project folders
  **/
  
  const paths = {
      input: "src/",
      output: "public/",
      html: {
          input: "src/views/pages/*.html",
        output: "public/",
        nunjunks: [ "src/views/templates/", "src/views/partials/" ],
        purge: "src/views/**/*.html"
      },
      scripts: {
          input: "src/scripts/index.js",
          output: "public/"
      },
      styles: {
          input: "src/styles/index.css",
          output: "public/"
      },
      static: {
          input: "src/static/**/*",
          output: "public/"
      },
      reload: "./public/"
  };
  
  /**
    Packages
  **/
  
  // General
  const gulp = require("gulp");
  const rename = require("gulp-rename");
  const size = require("gulp-size");
  const cache = require("gulp-cache");
  const del = require("del");
  
  // HTML
  const nunjucksRender = require("gulp-nunjucks-render");
  const htmlMinimizer = require("gulp-html-minimizer");
  const inlinesource = require("gulp-inline-source");  
  
  // Scripts
  const esbuild = require("gulp-esbuild");
  
  // Styles
  const cssimport = require("postcss-import");
  const concat = require("gulp-concat");
  const postcss = require("gulp-postcss");
  const autoprefixer = require("autoprefixer");
  const cssnano = require("cssnano");
  
  // BrowserSync
  const browserSync = require("browser-sync").create();
  
  const isDevelopment = process.env.NODE_ENV === "development";
  
  /**
    Tasks
  **/
  
  // Remove pre-existing content from output folders
  function cleanPublic(done) {
      // Make sure this feature is activated before running
      if (!settings.clean) done();
  
      // Clean the public folder
      del.sync([ paths.output ]);
  
      // Signal completion
      return done();
  };
  
  // Process nunjunk templates to output folder
  function buildHTML(done) {
    // Make sure this feature is activated before running
    if (!settings.html) done();
  
    const buildDate = new Date().toLocaleDateString("en-AU", { timeZone: "Australia/Sydney", weekday: "long", year: "numeric", month: "long", day: "numeric" });

    return gulp.src(paths.html.input)
      .pipe(nunjucksRender({
          data: {
            isDevelopment,
            buildDate 
          },
          path: paths.html.nunjunks,
          watch: false,
      }))
      .pipe(inlinesource({
        rootpath: paths.output
      }))
      .pipe(htmlMinimizer({
        removeComments: true,
        removeEmptyAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true
      }))
      .pipe(gulp.dest(paths.html.output))
      .pipe(size({ pretty: true, showFiles: true, showTotal: false }))
      .pipe(browserSync.reload({ stream: true }));
  };
  
  // Process javascript to output folder
  function buildScripts(done) {
    // Make sure this feature is activated before running
      if (!settings.scripts) done();
  
    browserSync.notify("Compiling javascript...");
  
    return gulp.src(paths.scripts.input)
      .pipe(esbuild({
          outfile: "bundle.js",
          target: "es2015",
          bundle: true,
          minify: isDevelopment ? false : true,
          sourcemap: isDevelopment ? true : false
      }))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(gulp.dest(paths.scripts.output))
      .pipe(size({ pretty: true, showFiles: true, showTotal: false }))
      .pipe(browserSync.reload({ stream: true }));
  }; 
  
  // Process stylesheets to output folder
  function buildStyles(done) {
    // Make sure this feature is activated before running
      if (!settings.styles) done();
  
    browserSync.notify("Compiling styles...");
  
    return gulp.src(paths.styles.input)
      .pipe(postcss([
          cssimport(),
          autoprefixer(),
          cssnano({
            preset: ["default", {
              discardComments: {
                removeAll: true,
              }
            }]
        })
      ]))
      .pipe(concat("bundle.css"))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(gulp.dest(paths.styles.output))
      .pipe(size({ pretty: true, showFiles: true, showTotal: false }))
      .pipe(browserSync.reload({ stream: true }));
  };
  
  // Copy static assets to output folder
  function copyStaticAssets(done) {
    // Make sure this feature is activated before running
    if (!settings.static) done();
    
    // Copy static files
      return gulp.src(paths.static.input)
      .pipe(gulp.dest(paths.static.output))
  
  };
  
  // Remove unused content from output folders
  function postCleanPublic(done) {
      // Make sure this feature is activated before running
      if (!settings.clean) done();

      // Signal completion
      return del([
        `${paths.output}/bundle.min.css`,
        `${paths.output}/bundle.min.js`
      ]);
  };

  // Watch for changes to the src directory
  function startServer(done) {
      // Make sure this feature is activated before running
      if (!settings.reload) return done();
  
      // Initialize BrowserSync
    browserSync.init({
      files: [paths.output],
      open: false,
      host: "localhost",
      port: 3000,
      server: {
        baseDir: paths.output,
        serveStaticOptions: {
          extensions: ["html"],
        }
      }
    });
  
      // Signal completion
      done();
  };
  
  // Build task
  const buildTask = gulp.series(
    cleanPublic,
    buildStyles,
    buildScripts,
    buildHTML,
    copyStaticAssets,
    postCleanPublic
  );
  
  // Reload the browser when files change
  function reloadBrowser(done) {
    if (!settings.reload) return done();
    cache.clearAll()
  
    browserSync.notify("Reloading site...");
    browserSync.reload();
    done();
  };
  
  // Watch for changes
  function watchSource(done) {
    browserSync.notify("Watching files...");
  
      gulp.watch(paths.input, gulp.series(buildTask, reloadBrowser));
      done();
  };
  
  // Build, watch and reload
  const serveTask = gulp.series(
      buildTask,
      startServer,
      watchSource
  );
  
  
  /**
    Export Tasks
  **/
  
  gulp.task("serve", serveTask);
  gulp.task("build", buildTask);
  gulp.task(buildTask);
