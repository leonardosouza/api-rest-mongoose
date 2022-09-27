// Conexao com Mongo
require("../infra/dbMongoose");
const { Schema, model } = require("mongoose");

// Criando o Schema
const productSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// Criando o Model
const ProductModel = model("Product", productSchema);

module.exports = ProductModel;
