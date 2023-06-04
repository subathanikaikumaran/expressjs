const { Router } = require("express");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helper");
const { validateInput } = require("../validation/validation");
const passport = require("passport");
const router = Router();
require('../strategies/local');

// router.post("/loginsession", (req, res) => {
//   const { username, password } = req.body;
//   if (username && password) {
//     if (req.session.user) {
//       res.send(req.session.user);
//     } else {
//       req.session.user = {
//         username,
//       };
//       res.send(req.session);
//     }
//   } else {
//     res.send(401);
//   }
// });

router.post("/loginWithPassport", passport.authenticate('local'),(req, res) => {
  console.log('Logged In');
  res.send(200);
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send(400);
  const userDB = await User.findOne({ email });
  if (!userDB) return res.send(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    const userData = { username: userDB.username, email: userDB.email };
    req.session.user = userData;
    return res.status(200).json({ response: userData });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email } = req.body;

  // Define validation rules for each input field
  const usernameRules = { required: true, minlength: 2 };
  const passwordRules = { required: true, minlength: 5 };
  const emailRules = { required: true, email: true };

  // Validate input fields
  const usernameValidation = validateInput(username, usernameRules);
  const passwordValidation = validateInput(req.body.password, passwordRules);
  const emailValidation = validateInput(email, emailRules);

  // Check for validation errors
  if (
    !usernameValidation.valid ||
    !passwordValidation.valid ||
    !emailValidation.valid
  ) {
    const errors = {
      username: usernameValidation.errors,
      password: passwordValidation.errors,
      email: emailValidation.errors,
    };
    return res.status(400).json({ errors });
  }

  const userDB = await User.findOne({ $or: [{ email }] });
  if (userDB) {
    res.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(req.body.password);
    const newUser = await User.create({ username, password, email });
    // newUser.save();
    res.send(201);
  }
});

module.exports = router;
