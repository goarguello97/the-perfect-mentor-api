import cors from "cors";
import express from "express";
import morgan from "morgan";
import createRoles from "./config/createRoles";
import connectDb from "./db";
import router from "./routes/index.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

connectDb();
createRoles();

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.use("/api", router);

app.listen(PORT, () => {
  return console.log(`Servidor escuchando en puerto ${PORT} `);
});

export { app };
