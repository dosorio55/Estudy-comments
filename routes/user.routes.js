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
        /*        req.logIn(user, (error) => {
                   // Si hay un error logeando al usuario, resolvemos el controlador
                   if (error) {
                       return next(error);
                   }
                   // Si no hay error, devolvemos al usuario logueado
                   return res.status(201).json(user)
               });
        */
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

export { userRoutes }