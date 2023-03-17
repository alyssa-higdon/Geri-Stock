const userServices = require("./models/user-services");

test("test find user by id", async () => {
  const result = await userServices.findUserOrItemById("63ffc409f777306ea76b70dc", "users");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");
}, 10000);

test("test find item by id", async () => {
  const result = await userServices.findUserOrItemById("640f79d937c5785d59db0e4e", "items");
  
  expect(result.name).toBe("newitem");
  expect(result.quantity).toBe(10);
  expect(result.username).toBe("Joe");

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
  var result = await userServices.findUserByUsername("alexhatch", "users");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");

  var result = await userServices.findUserByUsername("alexhatch", "wrong")
  expect(result).toBe(undefined);

});

test("test find item by name", async () => {
  var result = await userServices.findUserOrItemByName("newitem", "items");

  expect(result.name).toBe("newitem");
  expect(result.quantity).toBe(10);
  expect(result.username).toBe("Joe");

  var result = await userServices.findUserOrItemByName("newitem", "wrong");
  expect(result).toBe(undefined);

});

test("test find user by name and username", async () => {
  const result = await userServices.findUserByNameUsername("Alex Hatch", "alexhatch", "users");

  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");
});

test("test find item by name and username", async () => {
  var result = await userServices.findUserByNameUsername("newitem", "Joe", "items");

  expect(result.name).toBe("newitem");
  expect(result.quantity).toBe(10);
  expect(result.username).toBe("Joe");

  var result = await userServices.findUserByNameUsername("newitem", "Joe", "wrong");
  expect(result).toBe(undefined);

});

test("test add user", async () => {
  let mockPerson = {name: "Test User", username: "Test username", role: "Test role", password: "Test password", salt: "Test salt"};
  await userServices.addUserOrItem(mockPerson, "users");
  const result = await userServices.findUserByNameUsername("Test User", "Test username", "users");

  expect(result.name).toBe("Test User");
  expect(result.role).toBe("Test role");
  expect(result.username).toBe("Test username");
  expect(result.password).toBe("Test password");
  expect(result.salt).toBe("Test salt");
});

test("test delete user", async () => {
  let mockPerson = {name: "Test User", username: "Test username", role: "Test role", password: "Test password", salt: "Test salt"};
  await userServices.addUserOrItem(mockPerson, "users");
  const test_user = await userServices.findUserByNameUsername("Test User", "Test username", "users");

  await userServices.deleteUserOrItemById(test_user._id, "users");

  var result = await userServices.findUserByNameUsername("Test User", "Test username", "users");
  expect(result).toBe(null);

  var result = await userServices.deleteUserOrItemById(test_user._id, "wrong");
  expect(result).toBe(undefined);


});

test("test add item1", async () => {
  let mockItem = {name: "Test Item", quantity: 1, date: new Date("2023-03-16"), notes: "Test note", tag: "Test tag", username: "Test username"};
  await userServices.addUserOrItem(mockItem, "items");
  const result = await userServices.findUserOrItemByName("Test Item", "items");

  expect(result.name).toBe("Test Item");
  expect(result.notes).toBe("Test note");
  expect(result.tag).toBe("Test tag");
  expect(result.username).toBe("Test username");
});

test("test delete item", async () => {
  let mockItem = {name: "Test Item", quantity: 1, notes: "Test note", tag: "Test tag", username: "Test username"};
  await userServices.addUserOrItem(mockItem, "items");
  const testItem = await userServices.findUserOrItemByName("Test Item", "items");

  await userServices.deleteUserOrItemById(testItem._id, "items");

  const result = await userServices.findUserOrItemByName("Test Item", "items");
  expect(result).toBe(null);
});

test("test add item2", async () => {
  let mockItem = {name: "Test Item", quantity: 1, date: new Date("2023-03-16"), notes: "Test note", tag: "Test tag", username: "Test username"};
  await userServices.addUserOrItem(mockItem, "items");
  const result = await userServices.findUserOrItemByName("Test Item", "items");

  expect(result.name).toBe("Test Item");
  expect(result.notes).toBe("Test note");
  expect(result.tag).toBe("Test tag");
  expect(result.username).toBe("Test username");
});

test("test delete item by id", async () => {
  let mockItem = {name: "Test Item", quantity: 1, notes: "Test note", tag: "Test tag", username: "Test username"};
  await userServices.addUserOrItem(mockItem, "items");
  const testItem = await userServices.findUserOrItemByName("Test Item", "items");

  await userServices.deleteItemId(testItem._id);

  const result = await userServices.findUserOrItemByName("Test Item", "items");
  expect(result).toBe(null);
});

test("test get user item main function", async () => {
  var result = await userServices.getUsersOrItems(null, "alexhatch", "users");
  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");

  var result = await userServices.getUsersOrItems("Alex Hatch", null, "users");
  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");

  var result = await userServices.getUsersOrItems(undefined, undefined, "users");
  var firstUser = result[0];
  expect(firstUser.name).toBe("Alex Hatch");
  expect(firstUser.role).toBe("admin");
  expect(firstUser.username).toBe("alexhatch");
  expect(firstUser.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(firstUser.salt).toBe("f29ee61ebf80b36899d15a84245181c5");

  var result = await userServices.getUsersOrItems(undefined, undefined, "items");
  var firstItem = result[0];
  expect(firstItem.name).toBe("newitem");

  var result = await userServices.getUsersOrItems("Alex Hatch", "alexhatch", "users");
  expect(result.name).toBe("Alex Hatch");
  expect(result.role).toBe("admin");
  expect(result.username).toBe("alexhatch");
  expect(result.password).toBe("05694b486bff0582fb5175cbe7cb9fb143d0d51a8335c55dd3e7d0590ee8cc5e");
  expect(result.salt).toBe("f29ee61ebf80b36899d15a84245181c5");

  var result = await userServices.getUsersOrItems(undefined, undefined, "wrong");
  expect(result).toBe(undefined);
});

test("test cannot find user id", async () => {
  var result = await userServices.findUserOrItemById(1, "users");
  expect(result).toBe(undefined);


  var result = await userServices.findUserOrItemById(1, "wrong");
  expect(result).toBe(undefined);

});

test("test cannot find item id", async () => {
  const result = await userServices.findUserOrItemById(1, "items");
  expect(result).toBe(undefined);
});

test("unexpected type", async () => {
  const result = await userServices.addUserOrItem(null, "incorrect");
  expect(result).toBe(false);
});

test("unexpected type", async () => {
  const updatedResult = await userServices.findUserOrItemById("640f79d937c5785d59db0e4e", "items");
  var result = await userServices.editItemById("640f79d937c5785d59db0e4e", updatedResult);
  expect(result.name).toBe("newitem");
  expect(result.quantity).toBe(10);
  expect(result.username).toBe("Joe");

  var result = await userServices.editItemById(1, updatedResult);
  expect(result).toBe(false);

});


// testing again