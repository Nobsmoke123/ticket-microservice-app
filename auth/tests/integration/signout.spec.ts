import request from "supertest";
import app from "../../src/app";

describe("POST /api/users/signout", () => {
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET_KEY = "testsecretkey";

  const URL = "/api/users/signout";

  it("should return 200 and clear the session", async () => {
    const userAttributes = {
      email: "test@email.com",
      password: "pass12345",
      fullname: "test user",
    };

    const response1 = await request(app)
      .post("/api/users/signup")
      .send(userAttributes);

    const response2 = await request(app).post(URL).send({});
    expect(response1.status).toBe(201);
    expect(response2.status).toBe(200);
    expect(response2.get("Set-Cookie")).toBeUndefined();
  });
});
