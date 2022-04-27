import express from "express";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { DB_URL } from "./db.js";

import session from "express-session";
import MongoStore from "connect-mongo";



import passport from 'passport'
import { isAuth } from "./authentication/passport.js";

//Imported roures
import { userRoutes } from "./routes/user.routes.js";
import { commentRoutes } from "./routes/comment.routes.js";
import { linkRoutes } from "./routes/link.routes.js";

const PORT = process.env.PORT || 3000;
const server = express();
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('Hola de nuevo desde mongo')
});

//Midlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Middlewares - Public

//subida de ficheros

server.use(express.static(path.join(__dirname, 'public')));

server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000
      },
      store: MongoStore.create({
        mongoUrl: DB_URL,
      })
    })
  );

//init passport  
server.use(passport.initialize());
server.use(passport.session());

//Routes
server.use('/', router);
server.use('/user', userRoutes);
server.use('/comment', [isAuth], commentRoutes);
server.use('/links', [isAuth], linkRoutes);

//control de errores
server.use('*', (req, res, next) => {
    const error = new Error('Route not found'); 
    error.status = 404;
    next(error);
  });


server.use((err, req, res, next) => {
	return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

server.listen(PORT, () =>{
    console.log(`Mi super servidor está corriendo en http://localhost:${PORT}`)
});


