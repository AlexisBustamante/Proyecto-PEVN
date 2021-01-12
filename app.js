//con babel
import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import history from "connect-history-api-fallback";
import path from "path";

//import { Pool } from "pg";
//con node
//const express = require('express');

const app = express();


//SETTINGS
app.set('port',process.env.PORT||4040);//tuve que cmabiar el puerto al 4000


app.listen(app.get('port'),()=>{
console.log("server on port "+ app.get('port') );
})

//MIDDLEWARES
//codigo que se ejecutan antes de las rutas
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true})); ///se usa true, para que cuando se suba un archivo
                                    ////se cree una carpeta TMP en nuestro proyecto (archivos temporales)


//RUTAS routes
app.use('/',require("./routes/auth.routes"));
app.use('/professor',require("./routes/profesor.routes"));
app.use('/student',require("./routes/student.routes"));

//Middlewares for VUue
app.use(history());
app.use(express.static(path.join(__dirname,'public'))); //ruta estatica
