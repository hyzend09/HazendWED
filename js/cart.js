// cart.js

// Hàm thêm sản phẩm vào giỏ
function addToCart(product, size = null, quantity = 1) {
  if (!product) return;

  if (product.size && !size) {
    alert("Please select a size!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(
    item => item.id === product.id && item.size === size
  );

  if (index >= 0) {
    cart[index].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size,
      quantity: quantity,
      frontImg: product.frontImg || product.images?.[0] || ""
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Hiển thị giỏ hàng
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartList = document.getElementById("cart-list");
  const totalBox = document.getElementById("total-box"); 
  const emptyMsg = document.getElementById("empty-msg");

  if (!cartList) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    let numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
    total += numericPrice * item.quantity;

    div.innerHTML = `
      <img src="${item.frontImg}" alt="${item.name}">
      <div class="cart-info">
        <p class="name-item">${item.name}</p>
        <p class="size-item">Size: <span>${item.size}</span></p>
        <div class="quantity-box">
          <button class="qty-btn minus" onclick="changeQty('${item.id}', '${item.size}', -1)">−</button>
          <span id="qty-value">${item.quantity}</span>
          <button class="qty-btn plus" onclick="changeQty('${item.id}', '${item.size}', 1)">+</button>
        </div>
        <p class="cart-price">${item.price}</p>
        <button class="remove-btn" onclick="removeFromCart('${item.id}', '${item.size ?? ""}')">Remove</button>
      </div>
    `;
    cartList.appendChild(div);
  });


  //PHẦN NÀY LIÊN QUAN ĐẾN VIỆC HIỂN THỊ NÈ
  if (cart.length === 0) {
    totalBox.style.display = "none"; 
    emptyMsg.style.display = "block"; 
  } else {
    totalBox.style.display = "block";
    totalBox.querySelector("#cart-total").textContent = total.toLocaleString() + " HEHE";
    emptyMsg.style.display = "none";
  }
}

// Xóa sản phẩm khỏi giỏ
function removeFromCart(id, size = "") {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => !(item.id === id && (item.size ?? "") === size));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Thay đổi số lượng sản phẩm
function changeQty(id, size, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id == id && item.size == size);

  if (index >= 0) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Khi cart.html load
document.addEventListener("DOMContentLoaded", renderCart);
