import dotenv from "dotenv";
import { Server as HttpServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";

dotenv.config();

class SocketService {
  private _io: SocketIOServer | null = null;

  public init(httpServer: HttpServer) {
    this._io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
      },
    });

    this._io.on("connection", (socket: Socket) => {
      const userId = socket.handshake.query.userId as string;

      if (userId) {
        socket.join(userId);
        console.log(`Usuario ${userId} conectado y unido a su sala`);
      }

      socket.on("disconnect", () => {
        console.log(`Usuario ${userId} desconectado`);
      });
    });

    return this._io;
  }

  public get io(): SocketIOServer {
    if (!this._io) {
      throw new Error("Socket.io no ha sido inicializado");
    }

    return this._io;
  }

  public sendNotification(userId: string, event: string, data: any) {
    if (this._io) {
      this._io.to(userId).emit(event, data);
    }
  }
}

export const socketService = new SocketService();
