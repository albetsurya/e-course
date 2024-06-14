const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

const app = express();
const port = 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(express.json());

const authenticateToken = require("./middleware/authenticateToken");

// Routes
app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(
  "/api/transactions",
  authenticateToken,
  require("./routes/transactionsRoutes")
);
app.use("/api/auth", require("./routes/authRoutes"));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
