// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connectToDB, getDb } = require('./server'); // Import connection function

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: 'None',
    },
  }))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new (require('passport-google-oauth2').Strategy)({
  clientID: '1049132989315-gj75cj4svnr3nc9retfa945iph2vmf0p.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:4000/auth/google/callback',
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const db = getDb();
    let user = await db.collection('student').findOne({ googleId: profile.id });
    console.log(user)
    if (!user) {
      user = await db.collection('student').insertOne({
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName,
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
    done(null, user._id.toString()); // Serialize the user ID as a string
  });
  

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
    const user = await db.collection('student').findOne({ _id: new mongoose.Types.ObjectId(id) });
    // const user1 = await db.collection('student').deleteMany()
    // console.log(user1)
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.get('/auth/google', (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'consent'  // Add this line to request re-authentication
    })(req, res, next);
  });
  

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/home');
  }
);

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.listen(4000, async () => {
  console.log('Server running on port 4000');
  await connectToDB()
//   process.exit(1);
});
