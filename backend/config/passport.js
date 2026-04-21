const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const googleId = profile.id;

      let user = await User.findOne({ $or: [{ googleId }, { email }] });

      if (user) {
        if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
        return done(null, user);
      }

      user = new User({
        googleId,
        email,
        name,
        savedLocations: []
      });

      await user.save();
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err, null);
    }
  }
));
