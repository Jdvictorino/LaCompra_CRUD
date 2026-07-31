const express = require("express");
const app = express();
const PORT = 3000;

//*Este Middleware es para procesar JSON
app.use(express.json());

//*Esta variable es para almacenar los productos
let products = [];

//*Aquí se inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor de Supermercado corriendo en http://localhost:${PORT}`);
});
