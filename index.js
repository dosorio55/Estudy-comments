import express from "express";

const PORT = 3000;
const server = express();

server.use('/', (req, res) =>{
    res.send('Hello everyone!')
})

server.listen(PORT, () =>{
    console.log(`Mi super servidor está corriendo en http://localhost:${PORT}`)
});


