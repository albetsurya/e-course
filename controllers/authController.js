const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersService = require("../services/usersService");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
    };

    await usersService.createUser(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = usersService.getUserByUsername(username);

  if (!user) {
    return res.status(400).json({ message: "Cannot find user" });
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

module.exports = {
  register,
  login,
};
