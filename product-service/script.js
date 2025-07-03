let products = [{
    id: 1,
    name: "Red T-shirt",
    description: "A bright red cotton T-shirt",
    images: ["https://via.placeholder.com/220"],
    category: "Clothing",
    quantity: 10,
    rating: 4.2
}];

let editingId = null;

function renderProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
        <img src="${product.images[0] || 'https://via.placeholder.com/220'}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><b>Category:</b> ${product.category}</p>
        <p><b>Qty:</b> ${product.quantity}</p>
        <p><b>Rating:</b> ${product.rating || 'N/A'}</p>
        <button class="update-btn" onclick="fillForm(${product.id})">Update</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
      `;
        list.appendChild(card);
    });
}

function addOrUpdateProduct() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const images = document.getElementById("images").value.split(",").map(i => i.trim());
    const category = document.getElementById("category").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const rating = parseFloat(document.getElementById("rating").value) || null;

    if (!name || !description || !images.length || !category || isNaN(quantity)) {
        return alert("Please fill all required fields.");
    }

    const productData = { name, description, images, category, quantity, rating };

    if (editingId !== null) {
        const index = products.findIndex(p => p.id === editingId);
        products[index] = {...products[index], ...productData };
        editingId = null;
    } else {
        products.push({ id: Date.now(), ...productData });
    }

    clearForm();
    renderProducts();

    // For backend (commented):
    /*
    fetch("http://localhost:8080/api/products/add", {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    }).then(() => renderProducts());
    */
}

function fillForm(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("images").value = product.images.join(", ");
    document.getElementById("category").value = product.category;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("rating").value = product.rating || "";

    editingId = id;
}

function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    products = products.filter(p => p.id !== id);
    renderProducts();

    // For backend (commented):
    // fetch(`http://localhost:8080/api/products/delete/id/${id}`, { method: "DELETE" });
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("images").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("rating").value = "";
    editingId = null;
}

renderProducts();