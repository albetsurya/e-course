const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");

const readProductsFile = () => {
  const data = fs.readFileSync(productsFilePath, "utf8");
  return JSON.parse(data);
};

const writeProductsFile = (data) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

const getAllProducts = () => {
  return readProductsFile();
};

const createProduct = (newProduct) => {
  const products = readProductsFile();
  products.push(newProduct);
  writeProductsFile(products);
  return newProduct;
};

const updateProduct = (id, updatedProduct) => {
  const products = readProductsFile();
  const index = products.findIndex((p) => p.id == id);
  if (index !== -1) {
    products[index] = updatedProduct;
    writeProductsFile(products);
    return updatedProduct;
  }
  return null;
};

const deleteProduct = (id) => {
  const products = readProductsFile();
  const index = products.findIndex((p) => p.id == id);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    writeProductsFile(products);
    return deletedProduct;
  }
  return null;
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
