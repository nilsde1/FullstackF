const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./helpers_test");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { beforeEach, test, describe, expect } = require("@jest/globals");

describe("User error messages", () => {
  test("When username taken, return error message and status code 400", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "user",
      name: "newName",
      password: "newPassword",
    };

    const ergebniss = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(ergebniss.body.error).toContain("Username is already taken");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("when username/password too short <3 character, return error message and the status code 400", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUserWrongUsername = {
      username: "as",
      name: "newName",
      password: "asycxy",
    };

    const ergebnissUsername = await api
      .post("/api/users")
      .send(newUserWrongUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(ergebnissUsername.body.error).toContain(
      "The username must be at least 3 characters long"
    );

    const newUserWrongPassword = {
      username: "newUsername",
      name: "newName",
      password: "as",
    };

    const ergebnissPassword = await api
      .post("/api/users")
      .send(newUserWrongPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(ergebnissPassword.body.error).toContain(
      "Enter Password longer than 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("When username or password missing, return  error message and  status code 400", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUserNoUsername = {
      name: "name",
      password: "newPassword",
    };

    const ergebnissUsername = await api
      .post("/api/users")
      .send(newUserNoUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(ergebnissUsername.body.error).toContain("No Username");

    const newUserNoPassword = {
      username: "rot",
      name: "root username",
    };

    const ergebnissPassword = await api
      .post("/api/users")
      .send(newUserNoPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(ergebnissPassword.body.error).toContain("No Password");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
