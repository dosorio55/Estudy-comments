import express from "express";
import { connection } from "./db.js";

//Imported roures
import { commentRoutes } from "./routes/comment.routes.js";
import { linkRoutes } from "./routes/link.routes.js";

const PORT = 3000;
const server = express();
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('Hola de nuevo desde mongo')
})

//Midlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Routes
server.use('/', router);
server.use('/comment', commentRoutes);
server.use('/links', linkRoutes);

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


