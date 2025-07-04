const BASE_URL = "http://localhost:8080/api/v1.0";

function getWishlist() {
  const email = document.getElementById("wishlistEmail").value;
  fetch(`${BASE_URL}/wishlist/${email}`)
    .then(res => res.json())
    .then(data => {
      let html = "<h4>Your Wishlist:</h4><ul>";
      data.forEach(item => {
        html += `<li>Product ID: ${item.product.productId}</li>`;
      });
      html += "</ul>";
      document.getElementById("wishlistItems").innerHTML = html;
    })
    .catch(() => alert("Error fetching wishlist"));
}

function addProductToWishlist() {
  const email = document.getElementById("wishlistEmail").value;
  const productId = document.getElementById("wishProductId").value;

  fetch(`${BASE_URL}/wishlist/${email}/${productId}`, {
    method: "POST"
  })
  .then(res => {
    if (res.ok) {
      alert("Added to wishlist!");
      getWishlist();
    } else {
      alert("Already exists or error!");
    }
  });
}
