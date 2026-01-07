import "express";

interface UserPayload {
  email: string;
}

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}
