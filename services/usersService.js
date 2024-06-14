const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");

const readUsersFile = () => {
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data);
};

const writeUsersFile = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

const getAllUsers = () => {
  return readUsersFile();
};

const createUser = (newUser) => {
  const users = readUsersFile();
  users.push(newUser);
  writeUsersFile(users);
  return newUser;
};

const getUserByUsername = (username) => {
  const users = readUsersFile();
  return users.find((u) => u.username === username);
};


const updateUser = (id, updatedUser) => {
  const users = readUsersFile();
  const index = users.findIndex((u) => u.id == id);
  if (index !== -1) {
    users[index] = updatedUser;
    writeUsersFile(users);
    return updatedUser;
  }
  return null;
};

const deleteUser = (id) => {
  const users = readUsersFile();
  const index = users.findIndex((u) => u.id == id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    writeUsersFile(users);
    return deletedUser;
  }
  return null;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
