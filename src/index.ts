import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import admin from "./firebase/firebase-admin";
import connectDb from "./db";
import morgan from "morgan";
import createRoles from "./config/createRoles";

const PORT = process.env.PORT || 3000;

const app = express();
console.log("Firebase conectado a", admin.app().name);
connectDb();
createRoles();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  return console.log(`Servidor escuchando en puerto ${PORT} `);
});
