const BASE_URL = "http://localhost:8080/api/v1.0";

function getCart() {
  const email = document.getElementById("cartEmail").value;
  fetch(`${BASE_URL}/cart/${email}`)
    .then(res => res.json())
    .then(data => {
      let html = "<h4>Your Cart Items:</h4><ul>";
      data.forEach(item => {
        html += `<li>Product ID: ${item.product.productId}, Quantity: ${item.quantity}</li>`;
      });
      html += "</ul>";
      document.getElementById("cartItems").innerHTML = html;
    })
    .catch(() => alert("Failed to fetch cart!"));
}

function addProductToCart() {
  const email = document.getElementById("cartEmail").value;
  const productId = document.getElementById("productId").value;
  const quantity = document.getElementById("quantity").value;

  fetch(`${BASE_URL}/cart/${email}/${productId}/${quantity}`, {
    method: "POST"
  })
  .then(res => {
    if (res.ok) {
      alert("Product added to cart!");
      getCart();
    } else {
      alert("Failed to add to cart.");
    }
  });
}
