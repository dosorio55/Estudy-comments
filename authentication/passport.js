import passport from 'passport';
import LocalStrategy from 'passport-local'
// const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';

import { User } from '../models/User.js';

const saltRounds = 10;

passport.use(
  'register',
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const previousUser = await User.findOne({ email: email });

        if (previousUser) {
          const error = new Error('The user is already registered!');
          return done(error);
        }

        const pwdHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
          email: email,
          password: pwdHash,
        });

        const savedUser = await newUser.save();

        done(null, savedUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);


//login

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const currentUser = await User.findOne({ email: email });

        if (!currentUser) {
          const error = new Error('The email & password combination is incorrect!');
          return done(error);
        }

        const isValidPassword = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!isValidPassword) {
          const error = new Error(
            'The email & password combination is incorrect!'
          );
          return done(error);
        }

        currentUser.password = null;
        return done(null, currentUser);
      } catch (error) {
        return done(error);
      }
    }
  )
)

//Serialization

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => { 
  try {
    const existingUser = await User.findById(userId);
    return done(null, existingUser);
  } catch (err) {
    return done(err);
  }
});

//Autentication

const isAuth = (req, res, next) => {
  //Esta es la funcion que lleva por dentro passport, is isAuthenticated
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json('No esta logueado');  }
};


export { isAuth}