const apiBaseUrl = "http://localhost:8080/api/v1.0";

let products = [];
let editingId = null;

function fetchProducts() {
    fetch(`${apiBaseUrl}/product`)
        .then(res => res.json())
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(err => console.error("Error fetching products:", err));
}

function renderProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
        <img src="${product.images?.[0] || 'https://via.placeholder.com/220'}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><b>Category:</b> ${product.productCategory || product.category}</p>
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

    if (!name || !description || !category || isNaN(quantity)) {
        return alert("Please fill all required fields.");
    }

    const payload = {
        name,
        description,
        images,
        productCategory: category,
        quantity,
        rating
    };

    if (editingId !== null) {
        fetch(`${apiBaseUrl}/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingId, ...payload })
            })
            .then(() => {
                clearForm();
                fetchProducts();
            });
    } else {
        fetch(`${apiBaseUrl}/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(() => {
                clearForm();
                fetchProducts();
            });
    }
}

function fillForm(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("images").value = product.images ? .join(", ") || "";
    document.getElementById("category").value = product.productCategory || product.category;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("rating").value = product.rating || "";

    editingId = id;
}

function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    fetch(`${apiBaseUrl}/product/${id}`, { method: "DELETE" })
        .then(() => fetchProducts());
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

// Load products on page load
window.onload = fetchProducts;