const listHelper = require("../helpers_test");

const listNoBlogs = [];

const listOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Need help connecting your Database?",
    author: "Edsger W. Dijkstra",
    url: "https://www.mongodb.com/docs/guides/atlas/connection-string/",
    likes: 12,
    __v: 0,
  },
];

const listBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React basics",
    author: "Michael Chan",
    url: "https://reactjs.org/docs/hello-world.html",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "10 Min wonder",
    author: "Edsger W. Dijkstra",
    url: "https://www.freecodecamp.org/news/learn-react-basics-in-10-minutes/",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Title",
    author: "Edsger W. Dijkstra",
    url: "http://www.title.com/",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "Heroku base side",
    author: "Robert C. Martin",
    url: "https://devcenter.heroku.com/start",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "Titlewave",
    author: "Robert C. Martin",
    url: "https://www.titlewave.com/login/",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("Dummy test", () => {
  test("Dummy returns one", () => {
    const blogs = [];

    const ergebniss = listHelper.dummy(blogs);
    expect(ergebniss).toBe(1);
  });
});

describe("Total likes", () => {
  test("Adds all likes, but if there is only one take that number.", () => {
    const ergebniss = listHelper.totalLikes(listOneBlog);
    expect(ergebniss).toBe(5);
  });

  test("If no blogs, value is 0", () => {
    const ergebniss = listHelper.totalLikes(listNoBlogs);
    expect(ergebniss).toBe(0);
  });

  test("If there are a more than one blog, add value together", () => {
    const ergebniss = listHelper.totalLikes(listBlogs);
    expect(ergebniss).toBe(36);
  });
});

describe("Favorite blog", () => {
  test("If more than one blog, show the one with most likes", () => {
    const ergebniss = listHelper.favoriteBlog(listBlogs);

    const answer = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Need help connecting your Database?",
      author: "Edsger W. Dijkstra",
      url: "https://www.mongodb.com/docs/guides/atlas/connection-string/",
      likes: 12,
      __v: 0,
    };

    expect(ergebniss).toEqual(answer);
  });
});

describe("Most blogs", () => {
  test("Author with most blogs will be returned", () => {
    const ergebniss = listHelper.mostBlogs(listBlogs);

    expect(ergebniss).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("Most likes", () => {
  test("Author with most likes will be returned", () => {
    const ergebniss = listHelper.mostLikes(listBlogs);

    const answer = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    expect(ergebniss).toEqual(answer);
  });
});
