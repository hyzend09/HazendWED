// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const sizePopup = document.getElementById("size-popup");
  const popupName = document.getElementById("popup-name");
  const popupPrice = document.getElementById("popup-price");
  const popupSizesDiv = document.getElementById("popup-sizes");
  const closeBtn = document.getElementById("close-size-popup");
  const addToCartBtn = document.getElementById("add-cart");
  const buyNowBtn = document.getElementById("buy-now");

  let popupSelectedSize = null;
  let currentProduct = null;

  // Mở popup
  window.addToPopup = function(id) {
    currentProduct = products.find(p => p.id == id);
    if (!currentProduct) return;

    popupName.textContent = currentProduct.name;
    popupPrice.textContent = currentProduct.price;

    popupSizesDiv.innerHTML = "";
    if (currentProduct.size) {
      currentProduct.size.forEach(size => {
        const btn = document.createElement("button");
        btn.textContent = size;
        btn.addEventListener("click", () => {
          Array.from(popupSizesDiv.children).forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          popupSelectedSize = size;
        });
        popupSizesDiv.appendChild(btn);
      });
    }

    sizePopup.style.display = "flex";
  }

  // Đóng popup
  closeBtn.addEventListener("click", () => {
    sizePopup.style.display = "none";
    popupSelectedSize = null;
  });

  window.addEventListener("click", e => {
    if (e.target === sizePopup) {
      sizePopup.style.display = "none";
      popupSelectedSize = null;
    }
  });

  // Add To Cart từ popup
  addToCartBtn.addEventListener("click", () => {
    if (!currentProduct) return;
    addToCart(currentProduct, popupSelectedSize, 1);
    window.location.href = "cart.html";
  });

  // Buy Now từ popup
  buyNowBtn.addEventListener("click", () => {
    if (!currentProduct) return;
    alert(`Buying ${currentProduct.name} (${popupSelectedSize || "No size"}) for ${currentProduct.price}`);
  });
});
