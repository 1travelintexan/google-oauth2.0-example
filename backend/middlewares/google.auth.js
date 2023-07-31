module.exports.isUserAuthenticated = (req, res, next) => {
  console.log("here is the req from google auth", req.session);
  if (req.session.passport) {
    next();
  } else {
    res.status(401).send("You must login first");
  }
};
