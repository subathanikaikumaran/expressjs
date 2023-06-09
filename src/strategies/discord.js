const passport = require("passport");
const { Strategy } = require("passport-discord");
const DiscordUser = require("../database/schemas/DiscordUser");
const scopes = ["identify", "email", "guilds", "guilds.join"];



passport.serializeUser((user, done) => {
    console.log("serializing user...");
    console.log(user);
  
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    console.log("deserializing user...");
    console.log(id);
    try {
      const user = await DiscordUser.findById(id);
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
      clientID: "XXXXXXXXXXXXXXXXXXXX",
      clientSecret: "XXXXXXXXXXXXXXXX",
      callbackURL: "http://localhost:3003/api/auth/discord/redirect",
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(accessToken,refreshToken);
        // console.log(profile);
         // User.findOrCreate({ discordId: profile.id }, function(err, user) {
        //     return cb(err, user);
        // });

        const userDB = await DiscordUser.findOne({ discordId: profile.id });
        if (userDB) {
            console.log("Found User");
            done(null, userDB);
          } else {
            const newUser = await DiscordUser.create({ discordId: profile.id });
            console.log("New User Created");
            done(null, newUser);
          }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
