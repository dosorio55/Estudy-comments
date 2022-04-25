import express from "express";
import passport from "passport"


const userRoutes = express.Router();

//register
userRoutes.post('/register', (req, res, next) => {

    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        return res.status(201).json(user)
    };

    passport.authenticate('register', done)(req);
});

//login
userRoutes.post('/login', (req, res, next) => {

    passport.authenticate('login', (error, user) => {
        if (error) return next(error)

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json(user)
        });
    })(req);
});

//Logout
userRoutes.post('/logout', (req, res, next) => {
    if (req.user) {
      req.logout();
  
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.status(200).json('Hasta pronto!!');
      });
    } else {
      return res.sendStatus(304);
    }
  });


export { userRoutes }