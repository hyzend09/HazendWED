// auth.js

function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) {
    alert("Email already exists!");
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  users.push({
    email,
    password,
    isVerified: false,
    otp
  });

  localStorage.setItem("users", JSON.stringify(users));

  emailjs.send("service_as01m3f", "template_pbuk6ku", {
    to_email: email,
    to_name: email,     // 👈 FIX TEMPLATE
    otp_code: otp
  })
  .then(() => {
    alert("OTP has been sent!");
    window.location.href = "verify.html?email=" + email;
  })
  .catch(err => {
    console.error("EmailJS error:", err);
    alert("Send OTP failed");
  });
}


function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Wrong email or password!");
    return;
  }

  if (!user.isVerified) {
    alert("Please verify your account first!");
    return;
  }

  localStorage.setItem("currentUser", email);
  alert("Login successful!");
  window.location.href = "index.html"; // hoặc trang bạn muốn
}



//hàm check out, thanh toán gửi hóa đơn theo mail về 

function checkout() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderId = "ORD" + Date.now();
  let total = 0;

  let itemsHTML = "<ul>";
  cart.forEach(item => {
    total += item.price * item.quantity;
    itemsHTML += `<li>${item.name} x ${item.quantity} Size: ${item.size}</li>`;
  });
  itemsHTML += "</ul>";

  // 1️⃣ EMAIL CHO KHÁCH
  emailjs.send("service_as01m3f", "template_pwpqqoc", {
    to_email: currentUser,
    customer_name: currentUser,
    order_id: orderId,
    total_price: total,
    order_items: itemsHTML
  });

  // 2️⃣ EMAIL CHO ADMIN
  emailjs.send("service_tt8tero", "template_br87gw8", {
    to_name: "yen180909@gmail.com",
    total_price: total,
    customer_email: currentUser,
    order_id: orderId,
    total_price: total,
    order_items: itemsHTML
  });

  alert("Order placed successfully!");
  localStorage.removeItem("cart");

    emailjs.send("service_tt8tero", "template_7pdprsa", {
    to_email: currentUser,
    to_name: currentUser,
    customer_email: currentUser,
    order_id: orderId,
    total_price: total,
    order_items: itemsHTML
  });
}
