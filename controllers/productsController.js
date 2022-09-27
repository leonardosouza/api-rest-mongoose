const mongoose = require("mongoose");
const ProductModel = require("../models/productModel");

// Abordagem 1 - Classes
class ProductsController {
  createProduct(req, res) {
    const data = { ...req.body };

    ProductModel.create(data)
      .then(() => res.status(201).json(data))
      .catch((err) => res.status(500).json({ error: err }));
  }

  getAllProducts(req, res) {
    const { name } = req.query;

    const filter = name ? { name: new RegExp(name, "i") } : {};

    ProductModel.find(filter, "name quantity price")
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ error: err }));
  }

  getProductById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: `product not found` });

    ProductModel.find({ _id: id })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ error: err }));
  }

  updateProduct(req, res) {
    const { id } = req.params;
    ProductModel.findOneAndUpdate({ _id: id }, req.body, { upsert: true })
      .then(() => res.status(204).end())
      .catch(() => res.status(500).json({ error: err }));
  }

  removeProduct(req, res) {
    const { id } = req.params;
    ProductModel.deleteOne({ _id: id })
      .then((result) => {
        if (result) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: `product not found` });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
}

module.exports = new ProductsController();
