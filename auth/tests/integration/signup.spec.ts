import request from "supertest";
import app from "../../src/app";

describe("POST /api/users/signup", () => {
  process.env.JWT_SECRET_KEY = "testsecretkey";
  process.env.NODE_ENV = "test";

  const URL = "/api/users/signup";

  it("should return 201 and a token for valid input data", async () => {
    const userAttributes = {
      email: "test@email.com",
      password: "password123",
      fullname: "Test User",
    };

    const response = await request(app).post(URL).send(userAttributes);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", userAttributes.email);
    expect(response.body).toHaveProperty("fullname", userAttributes.fullname);
    expect(response.body).not.toHaveProperty("password");
  });

  it("should return 400 for invalid input data", async () => {
    const invalidUserAttributes = {
      email: "testinvalidemail",
      password: "short",
      fullname: "T",
    };

    const response = await request(app).post(URL).send(invalidUserAttributes);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain(
      "'Email' must be a valid email address."
    );
    expect(response.body.message).toContain(
      "'Fullname' must be at least 6 characters long."
    );
    expect(response.body.message).toContain(
      "'Password' must be at least 8 characters long."
    );
  });

  it("should return 400 for duplicate email", async () => {
    const userAttributes = {
      email: "test@gmail.com",
      password: "pass1234",
      fullname: "Test User",
    };

    const response1 = await request(app).post(URL).send(userAttributes);
    const response2 = await request(app).post(URL).send(userAttributes);

    console.log(response2.body);

    expect(response1.status).toBe(201);
    expect(response2.status).toBe(400);
    expect(response2.body).toHaveProperty("message", ["Email already exists."]);
  });

  it("should return 400 for missing required fields", async () => {
    const userAttributes = {
      email: "test@email.com",
      password: "password123",
    };

    const response = await request(app).post(URL).send(userAttributes);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", [
      "'Fullname' is required.",
    ]);
  });
});
