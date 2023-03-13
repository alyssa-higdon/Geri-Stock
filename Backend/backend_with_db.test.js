const userServices = require("./models/user-services");

test("test find user by id", async () => {
  const result = await userServices.findUserById("63ffc409f777306ea76b70dc");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");
});

test("test find user by name", async () => {
  const result = await userServices.findUserOrItemByName("Alex Hatch", "users");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");
});

test("test find user by username", async () => {
  const result = await userServices.findUserByUsername("alexhatch");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");
});

test("test find item by username", async () => {
  const result = await userServices.findUserOrItemByName("newitem", "items");

  expect(result.name).toBe("newitem");
  expect(result.quantity).toBe(10);
  expect(result.username).toBe("Joe");


});

test("test find user by name and username", async () => {
  const result = await userServices.findUserByNameUsername("Alex Hatch", "alexhatch", "users");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");
});

test("test find itm by name and username", async () => {
  const result = await userServices.findUserByNameUsername("newitem", "Joe", "items");

  expect(result.name).toBe("newitem");
  expect(result.quantity).toBe(10);
  expect(result.username).toBe("Joe");
});