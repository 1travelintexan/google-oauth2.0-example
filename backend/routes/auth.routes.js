const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isUserAuthenticated } = require("../middlewares/google.auth");
const passport = require("passport");
const saltRounds = 13;

router.post("/signup", async (req, res) => {
  //   console.log("Here is the body, from signup post", req.body);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = await User.create({ email: req.body.email, password: hash });
  console.log("here is our new user in the DB", newUser);
  res.status(201).json(newUser);
});

//login with passport
router.post("/login", (req, res, next) => {
  //login route without passport
  // router.post("/login", async (req, res) => {
  //   try {
  //     const foundUser = await User.findOne({ email: req.body.email });
  //     //   console.log("here is the found user", foundUser);
  //     if (foundUser) {
  //       const passwordMatch = bcrypt.compareSync(
  //         req.body.password,
  //         foundUser.password
  //       );
  //       // console.log("the password match! Yay!", passwordMatch);
  //       if (passwordMatch) {
  //         //take the info you want from the user without sensetive data
  //         const { _id, email } = foundUser;
  //         const payload = { _id, email };
  //         // Create and sign the token
  //         const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
  //           algorithm: "HS256",
  //           expiresIn: "6h",
  //         });
  //         console.log("here is my new token", authToken);
  //         res.status(200).json({ authToken });
  //       }
  //     } else {
  //       //if there is no email in the DB matching
  //       res.status(400).json({ message: "email or password do not match" });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
});

//<=========login with google==================>
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/callback",
  passport.authenticate("google", {
    failureMessage: "Problem logging in with google",
    successRedirect: "http://localhost:3000/profile",
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    console.log("Thank you for registering with google");
    res.send("thanks", req.user);
  }
);

//logout route
// route for logging out
router.get("/logout", function (req, res) {
  req.session.destroy(function (e) {
    req.logout();
    res.json({ message: "You logged out" });
  });
});

//this is the verify route for protected page of your app
router.get("/verify", isUserAuthenticated, (req, res) => {
  console.log("here is the req.user", req.session);
  res.json({ user: req.user });
});

module.exports = router;
