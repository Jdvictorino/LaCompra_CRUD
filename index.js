const express = require("express");
const app = express();
const PORT = 4000;

// Middleware para procesar datos JSON enviados desde el frontend
app.use(express.json());

// Le decimos a Express que sirva la interfaz gráfica desde la carpeta "public"
app.use(express.static("public"));

// Nuestra "Base de datos" en memoria para la lista de compras
let products = [];

// READ: Obtener toda la lista de compras
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

//Primera opcion CRUD: READ: Obtener un producto específico por ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado en la lista" });
  }
});

//Segunda opcion CRUD: CREATE: Agregar un producto a la lista
app.post("/products", (req, res) => {
  // Calculamos un ID seguro sumando 1 al ID del último producto
  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const newProduct = {
    id: newId,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  products.push(newProduct);
  res
    .status(201)
    .json({ message: "Producto agregado a la lista", product: newProduct });
});

//Tercera opcion CRUD: UPDATE: Modificar datos de un producto (ej. cambiar precio)
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex].name = req.body.name || products[productIndex].name;
    products[productIndex].price =
      req.body.price || products[productIndex].price;
    products[productIndex].category =
      req.body.category || products[productIndex].category;

<<<<<<< Updated upstream
    res
      .status(200)
      .json({
        message: "Producto actualizado",
        product: products[productIndex],
      });
=======
    res.status(200).json({
      message: "Producto actualizado",
      product: products[productIndex],
    });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

//Cuarta opcion CRUD: DELETE: Eliminar un producto de la lista
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.status(200).json({
      message: "Producto sacado del carrito",
      product: deletedProduct[0],
    });
>>>>>>> Stashed changes
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// Iniciar el servidor (Esta función mantiene vivo el programa)
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`⚠️  Presiona "Ctrl + C" en esta terminal para apagarlo.`);
  console.log(`=================================================`);
});
