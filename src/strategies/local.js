const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/User");
const { comparePassword } = require("../utils/helper");

passport.serializeUser((user, done) => {
  console.log("serializing user...");
  console.log(user);

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializing user...");
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      try {
        if (!email || !password) throw new Error("Missing Credentials");
        const userDB = await User.findOne({ email });
        if (!userDB) throw new Error("User not found");
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          //   const userData = { username: userDB.username, email: userDB.email };
          console.log("Success login");
          done(null, userDB);
        } else {
          console.log("Invalid credentials");
          done(null, null);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
