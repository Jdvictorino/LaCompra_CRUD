const express = require("express");
const app = express();
const PORT = 3000;

//*Este Middleware es para procesar JSON
app.use(express.json());

//*Esta variable es para almacenar los productos
let products = [];

// Primer opcion CRUD: CREATE: Agregar un producto a la lista
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name, // ej: "Leche"
    price: req.body.price, // ej: 1.50
    category: req.body.category, // ej: "Lácteos"
  };
  products.push(newProduct);
  res
    .status(201)
    .json({ message: "Producto agregado a la lista", product: newProduct });
});

//*Aquí se inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor de Supermercado corriendo en http://localhost:${PORT}`);
});
