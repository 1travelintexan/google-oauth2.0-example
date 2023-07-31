// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

//for passport config
require("./passport/passport.config");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const app = express();
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.TOKEN_SECRET],
//   })
// );
app.use(
  session({
    secret: "mysupersecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
      httpOnly: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

//bouncer for auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
