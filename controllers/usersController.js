const usersService = require("../services/usersService");

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();
  res.json(users);
};

const createUser = (req, res) => {
  const newUser = req.body;
  const createdUser = usersService.createUser(newUser);
  res.status(201).json(createdUser);
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const result = usersService.updateUser(id, updatedUser);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("User not found");
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const result = usersService.deleteUser(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("User not found");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
