// verify.js

function verifyOTP() {
  const inputOTP = document.getElementById("otpInput").value;
  const email = new URLSearchParams(window.location.search).get("email");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email);

  if (!user) {
    alert("User not found!");
    return;
  }

  if (inputOTP == user.otp) {
    user.isVerified = true;
    delete user.otp;

    localStorage.setItem("users", JSON.stringify(users));
    alert("Verify successful!");
    window.location.href = "login.html";
  } else {
    alert("Wrong OTP!");
  }
}
