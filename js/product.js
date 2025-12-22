// Lấy id từ URL

//ý là biết sản phẩm nào sẽ hiện ra nhờ vào id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Tìm sản phẩm trong mảng products.js là 1 file khác đã có dữ kiệu của các sản phẩm
const product = products.find(p => p.id === id); //tìm sản phẩm bằng id

if (!product) {
  document.body.innerHTML = "<h1>Không tìm thấy sản phẩm</h1>";
}

// Hiển thị ra giao diện, tức là thông tin sản phẩm đã có trong products.js

//đoạn này html  sẽ có các id như name price decs img và js sẽ đưa thông tin từ products.js sang html để hiện thị
document.getElementById("name").innerText = product.name;
document.getElementById("price").innerText = product.price;
document.getElementById("decs").innerText = product.decs;


//đây là container chứa danh sách ảnh nhỏ
const thumbBox = document.getElementById("thumbs");

product.images.forEach(img => { //product.images là mảng ảnh sản phẩm| câu lệnh này sẽ lặp qua từng ảnh 
  thumbBox.innerHTML += `
    <img src="${img}" class="thumb" onclick="document.getElementById('image').src='${img}'">
  `;
});



//câu này sẽ để biến selectedSize làm nơi lưu trữ dữ liệu của các size
let selectedSize = null;

// chọn size
document.querySelectorAll(".size-btn").forEach(btn => { //size-btn là các nút trong html đã có đoạn này
  btn.addEventListener("click", function () {
    // bỏ selected cũ
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected")); //đoạn này chưa hiểu| à maybe là khi click vào nút mới thì select ở nút cũ mất để đưa sang nút mới
    
    // đánh dấu nút đang chọn
    this.classList.add("selected");
    
    // lưu size
    selectedSize = this.dataset.size;
    console.log("Đã chọn size:", selectedSize);
  });
});



//đoạn này dùng để chọn số lượng sản phẩm| html đã có tên cảu các class này rồi
let quantity = 1;//set quantity mặc định luôn là 1 
const qtyValue = document.getElementById("qty-value"); //đây là thẻ hiển thị số lượng tức là số lượng như 1 2 3 4
const btnMinus = document.querySelector(".qty-btn.minus"); //đây là dấu - dữ liệu class này sẽ được đưa vào btnMinus á
const btnPlus = document.querySelector(".qty-btn.plus"); //đoạn này là dấu +

btnMinus.addEventListener("click", () => { //addEventListener tức là khi click vào dấu đó thì nó sẽ chạy code, thay đổi dữ liệu
  if (quantity > 1) { //nếu click dấu - và nếu quantity lớn hơn 1 thì sẽ giảm xuống 1 số, cơ bản ở java vad C
    quantity--;
    qtyValue.innerText = quantity;
  }
});

btnPlus.addEventListener("click", () => { //ngược lại
  quantity++;
  qtyValue.innerText = quantity;
});

// Add To Cart và chuyển sang trang cart
const addToCartBtn = document.getElementById("add-cart"); // ở đây sẽ lấy dữ liệu nút add to cart dựa vào id và add-cart, có trong html rồi
addToCartBtn.addEventListener("click", () => {//khi mà click vào nếu sản phảm chưa có size thì hiện lên thông báo ở dưới, có thể lược bỏ được
  if (product.size && !selectedSize) {
    alert("Please select a size!");
    return;
  }

  // Gọi hàm addToCart từ cart.js
  // Tham số: product, size, quantity
  addToCart(product, selectedSize, quantity); //hàm này đã được gọi ở file cart.js, cart.js là nơi sẽ lưu lại code để chạy dữ liệu cho cart, procduct.js này đang mượn dữ liệu từ cart

  // Chuyển sang trang giỏ hàng
  //vì addtocart đã được set ở cart.js rồi nên ở đây khi add to cart sẽ trực tiếp nhảy sang file cart.html luôn nên sẽ không thấy code của addToCart
  window.location.href = "cart.html";
});


// document.getElementById("add-cart").addEventListener("click", () => {
//   if (product.size && !selectedSize) {
//     alert("Please select a size!");
//     return;
//   }
//   addToCart(product, selectedSize, quantity);
//   window.location.href = "cart.html"; // chuyển sang trang giỏ hàng
// });

