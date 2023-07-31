var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1095358552930-t8vfj6mt6q7igd53v9eljkm00eifl5d0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5005/auth/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const defaultUser = {
        fullname: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      console.log("here is the default user", defaultUser);
      return done(null, defaultUser);
    }
  )
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });
