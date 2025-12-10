import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import createRoles from "./config/createRoles";
import connectDb from "./db";
import admin from "./firebase/firebase-admin";
import router from "./routes/index.routes";
dotenv.config();

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

app.use("/api", router);

app.listen(PORT, () => {
  return console.log(`Servidor escuchando en puerto ${PORT} `);
});

export { app };
