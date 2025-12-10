import "express";

interface UserPayload {
  id: string;
  role: "ADMIN" | "MENTOR" | "MENTEE";
}

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}
