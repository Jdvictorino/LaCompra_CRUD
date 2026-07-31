const form = document.getElementById("productForm");
const productList = document.getElementById("productList");
const submitBtn = document.getElementById("submitBtn");

// READ: Cargar productos al iniciar
async function loadProducts() {
  try {
    const response = await fetch("/products");
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    const products = await response.json();

    productList.innerHTML = "";
    products.forEach((product) => {
      productList.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>
                    <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.category}')">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// CREATE / UPDATE: Manejar el envío del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const category = document.getElementById("category").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `/products/${id}` : "/products";

  await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, category }),
  });

  // Limpiar formulario y recargar lista
  form.reset();
  document.getElementById("productId").value = "";
  submitBtn.textContent = "Agregar Producto";
  loadProducts();
});

// DELETE: Eliminar producto
async function deleteProduct(id) {
  if (confirm("¿Seguro que deseas sacar esto del carrito?")) {
    await fetch(`/products/${id}`, { method: "DELETE" });
    loadProducts();
  }
}

// Preparar el formulario para UPDATE
function editProduct(id, name, price, category) {
  document.getElementById("productId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("category").value = category;
  submitBtn.textContent = "Actualizar Producto";
}

// Inicializar la tabla
loadProducts();
