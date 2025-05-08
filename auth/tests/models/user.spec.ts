import User from "../../src/models/user";

describe("User Model", () => {
  it("it should create a user with the given attributes", async () => {
    const userAttributes = {
      email: "donald@gmail.com",
      password: "pass123",
      fullname: "Donald Duck",
    };

    const user = User.build(userAttributes);
    await user.save();

    const found = await User.findOne({ email: userAttributes.email });

    expect(found).toBeDefined();
    expect(found?.email).toBe(userAttributes.email);
    expect(found?.fullname).toBe(userAttributes.fullname);
    expect(found?.password).not.toBe(userAttributes.password);
  });

  it("should hash password correctly", async () => {
    const userAttributes = {
      email: "test@gmail.com",
      password: "test123",
      fullname: "Test user",
    };

    const user = User.build(userAttributes);
    await user.save();

    expect(user.password).not.toBe(userAttributes.password);
    expect(user.password.length).toBeGreaterThan(20);
  });

  it("should not return password and __v when converting to JSON", async () => {
    const userAttributes = {
      email: "test@email.com",
      password: "test123",
      fullname: "Test User",
    };

    const user = User.build(userAttributes);
    await user.save();

    const userJson = user.toJSON();

    expect(userJson.__v).toBeUndefined();
    expect(userJson.password).toBeUndefined();
    expect(userJson).toHaveProperty("id");
    expect(userJson).not.toHaveProperty("_id");
  });

  it("should compare password correctly", async () => {
    const userAttributes = {
      email: "test@email.com",
      password: "test123",
      fullname: "Test User",
    };

    const user = User.build(userAttributes);
    await user.save();

    const isMatch = await user.comparePassword("test123");
    expect(isMatch).toBe(true);

    const isNotMatch = await user.comparePassword("123test");
    expect(isNotMatch).toBe(false);
  });
});
