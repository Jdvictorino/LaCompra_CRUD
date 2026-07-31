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

// READ: Obtener toda la lista de compras
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

//Segunda opcion CRUD: READ: Obtener un producto específico por ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado en la lista" });
  }
});

//*Aquí se inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor de Supermercado corriendo en http://localhost:${PORT}`);
});
