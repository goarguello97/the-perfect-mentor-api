import { socketService } from "@services/SocketService";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import createRoles from "./config/createRoles";
import connectDb from "./db";
import router from "./routes/index.routes";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;

socketService.init(httpServer);

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.set("etag", false);

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

connectDb();
createRoles();

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.use("/api", router);

httpServer.listen(PORT, () => {
  return console.log(`Servidor escuchando en puerto ${PORT} `);
});

export { app };
