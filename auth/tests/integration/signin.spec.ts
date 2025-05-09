import request from "supertest";
import app from "../../src/app";

describe("POST /api/users/signin", () => {
  process.env.JWT_SECRET_KEY = "testsecretkey";
  process.env.NODE_ENV = "test";

  const URL = "/api/users/signin";
  const SIGNUP_URL = "/api/users/signup";

  it("should return 200 and a token for valid input data", async () => {
    const userSignUpAttributes = {
      email: "test@email.com",
      password: "pass1234",
      fullname: "Test user",
    };

    const response1 = await request(app)
      .post(SIGNUP_URL)
      .send(userSignUpAttributes);

    const userSignInAttributes = {
      email: "test@email.com",
      password: "pass1234",
    };

    const response2 = await request(app).post(URL).send(userSignInAttributes);

    expect(response1.status).toBe(201);
    expect(response2.status).toBe(200);
    expect(response2.body).toHaveProperty("token");
  });

  it("should return 401 for invalid input data", async () => {
    const userSignUpAttributes = {
      email: "test@email.com",
      password: "pass1234",
      fullname: "Test user",
    };

    const response1 = await request(app)
      .post(SIGNUP_URL)
      .send(userSignUpAttributes);

    const userSignInAttributes = {
      email: "test@email.com",
      password: "pass123456",
    };

    const response2 = await request(app).post(URL).send(userSignInAttributes);

    expect(response1.status).toBe(201);
    expect(response2.status).toBe(401);
    expect(response2.body).toHaveProperty("message", ["Invalid credentials."]);
  });
});
