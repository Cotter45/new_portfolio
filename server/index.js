const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");

let app = express();
app.use(compression());

// You may want to be more aggressive with this caching
app.use(express.static("public", { maxAge: "1h" }));

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", { immutable: true, maxAge: "1y" }));

if (MODE === "production") {
  // if not https redirect to https
  app.all('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`https://${req.hostname}${req.url}`);
    } else {
      next();
    }
  });
}

app.use(morgan("tiny"));
app.all(
  "*",
  MODE === "production"
    ? createRequestHandler({ build: require("./build") })
    : (req, res, next) => {
        purgeRequireCache();
        let build = require("./build");
        return createRequestHandler({ build, mode: MODE })(req, res, next);
      }
);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

// const { port } = require('./config');

// const db = require('./db/models');

// // Check the database connection before starting the app
// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection success! Sequelize is ready to use...');

//     // Start listening for connections
//     app.listen(port, () => console.log(`Listening on port ${port}...`));
//   })
//   .catch((err) => {
//     console.log('Database connection failure.');
//     console.error(err);
//   });

// module.exports = app;

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
