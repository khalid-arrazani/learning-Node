const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const {
  User,
  validateLoginUser,
  validateRegisterUser,
} = require("../models/User");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/api/auth/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) return res.redirect("/api/auth/login");
    req.user = user;
    next();
  } catch {
    res.redirect("/api/auth/login");
  }
};

//=============================/* GOOGLE STRATEGY * /=============================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("1", profile, "1");

      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            password: null,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

//=============================/* GOOGLE CONTROLLER METHODS * /====================
const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    console.log("ERROR:", err);
    console.log("USER:", user, "USER:");
    console.log("INFO:", info, "INFO:");

    if (err || !user)
      return res.status(401).json({ message: "Authentication failed" });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    // redirect للfrontend أو EJS page

    res.redirect(`/api/auth/dashboard`);
  })(req, res, next);
};

//=============================/* AUTH CONTROLLER * /=============================/
//get Register User view

const getRegisterUserView = asyncHandler((req, res) => {
  res.render("register", {error: null});
});

//Register User
const RegisterUser = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ message: "This email already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await user.save();
  const token = null;
  const { password, ...other } = result._doc;
  res.status(201).json(other);
});

//login User
const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
   return res.render("login", { message: "invalid email or password" });
  };

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.render("login" , {message: "invalid email or password" });
  };
  const token = user.generateToken();
  const { password, ...other } = user._doc;



  res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    }).redirect("/api/auth/dashboard")


});

/**
 * @desc Get login View
 * @route /password/fprgot-password
 * @method GET
 * @access public
 */

getLoginView = asyncHandler((req, res) => {
  res.render("login", { message: null });
});

module.exports = {
  RegisterUser,
  loginUser,
  getLoginView,
  googleLogin,
  googleCallback,
  verifyToken,
};
