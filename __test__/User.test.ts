import User from "@models/User";
import dotenv from "dotenv";
import request from "supertest";
import admin from "../src/firebase/firebase-admin";
import { app } from "../src/index";
dotenv.config();

beforeAll(async () => {
  /**
   * listUsers, uidsDelete y deleteUsers van en otro archivo.
   */
  const listUsers = await admin.auth().listUsers(1000);
  const uidsDelete = listUsers.users.map((user) => user.uid);
  const deleteUsers = uidsDelete.map((uid) => admin.auth().deleteUser(uid));
  await Promise.all([
    await app.locals.connectDb,
    await User.deleteMany(),
    deleteUsers,
  ]);
});

afterAll(async () => {
  await User.deleteMany();
});

describe("GET /api/users/:id", () => {
  let id = "" as string;
  let email = "";
  let unknowId = "gHeoDKDQCRWRcPm4SlAm4dlGJ513";

  beforeAll(async () => {
    const user = await admin.auth().createUser({
      email: "tepibat299@badfist.com",
      password: "Pass-1234",
    });

    id = user.uid;
    email = user.email!;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should find a user by id", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", id);
    expect(response.body).toHaveProperty("email", email);
  });

  it("should not find a user by incorrect id", async () => {
    const response = await request(app).get(`/api/users/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuario no encontrado.");
  });
});
