const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./helpers_test");

const api = supertest(app);

describe("Blog checks:", () => {
  test("Blogs will be returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test('The identifier is named "id"', async () => {
    const response = await api.get("/api/blogs").expect(200);

    expect(response.body[0].id).toBeDefined();
  }, 100000);
});

describe("Post,delete and update requests:", () => {
  test("addition of a new blog", async () => {
    const blogsStart = await helper.blogsInDb();

    const newBlog = {
      author: "a autor",
      title: "a blog",
      url: "www.example.com",
      likes: 13,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${authenticator}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsEnd = await helper.blogsInDb();
    expect(blogsEnd.length).toBe(blogsStart.length + 1);

    const authors = blogsEnd.map((blog) => blog.author);
    expect(authors).toContain("newAuthor");
  }, 100000);

  test("Deleting a blog succeeds with status code 204", async () => {
    const blogsStart = await helper.blogsInDb();
    const blogDelete = blogsStart[0];

    await api.delete(`/api/blogs/${blogDelete.id}`).expect(204);

    const blogsEnd = await helper.blogsInDb();

    expect(blogsEnd).toHaveLength(blogsStart.length - 1);

    const authors = blogsEnd.map((blog) => blog.author);
    expect(authors).not.toContain(blogDelete.body.author);
  }, 100000);

  test("Updating correctly a blog succeeds with status code 204", async () => {
    const blogsStart = await helper.blogsInDb();
    const blogUpdate = blogsStart[0];

    const newBlog = {
      author: "a author",
      title: "a blog",
      url: "www.exampleblog.com",
      likes: 42,
    };

    await api
      .put(`/api/blogs/${blogUpdate.id}`)
      .send(newBlog)
      .expect(204)
      .expect("Content-Type", /application\/json/);

    const blogsEnd = await helper.blogsInDb();
    const updatedBlog = blogsEnd[0];

    expect(updatedBlog).toEqual(newBlog);
  }, 100000);

  test("A blog cann not be added with unvalid token", async () => {
    const users = await helper.usersInDb();

    const newBlog = {
      author: "a author",
      title: "a blog",
      url: "www.exampleblog.com",
      likes: 16,
      userId: users[0].id,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsEnd = await helper.blogsInDb();
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length);
  }, 100000);
});

describe("Missing like area behaviour:", () => {
  test("If like-area is missing, default value will be set to 0", async () => {
    const newBlog = {
      author: "a author",
      title: "a blog",
      url: "www.exampleblog.com",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBeDefined();
    expect(resp.body.likes).toEqual(0);
  }, 100000);

  test('If url and title area is missing,  "400 bad request" will be returned', async () => {
    const newBlog = {
      author: "a author",
      likes: 17,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsEnd = await helper.blogsInDb();
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length);
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});
