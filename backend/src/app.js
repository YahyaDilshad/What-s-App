import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { app, HttpServer, io } from './lib/socket.js';


import authuser from './routes/auth.router.js'
import messageRoute from './routes/message.router.js';

import dbconnection from './db/db.connection.js'
dbconnection()
import cors from 'cors'

import cookieParser from "cookie-parser";


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,  // 👈 this must also be true
}));


app.use('/api/auth', authuser)
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 2000
HttpServer.listen(PORT, () => {
    console.log(`Server connected Successfully on ${PORT} port`)
})
