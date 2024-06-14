const productsService = require("../services/productsService");

const getAllProducts = (req, res) => {
  const products = productsService.getAllProducts();
  res.json(products);
};

const createProduct = (req, res) => {
  const newProduct = req.body;
  const createdProduct = productsService.createProduct(newProduct);
  res.status(201).json(createdProduct);
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  const result = productsService.updateProduct(id, updatedProduct);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("Product not found");
  }
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  const result = productsService.deleteProduct(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("Product not found");
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
