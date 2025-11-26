import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import admin from "./firebase/firebase-admin";
import connectDb from "./db";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Firebase conectado a", admin.app().name);
  connectDb();
  return console.log(`Servidor escuchando en puerto ${PORT} `);
});
