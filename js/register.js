// register.js

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6 số
}

function sendOTPEmail(email, otp) {
    emailjs.send("service_as01m3f", "template_pbuk6ku", {
        to_email: email,
        otp_code: otp
    })
    .then(() => {
        alert("OTP đã được gửi tới email của bạn!");
        window.location.href = "verify.html"; 
    })
    .catch(err => {
        console.error("Lỗi gửi email:", err);
        alert("Không thể gửi OTP, thử lại!");
    });
}

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const otp = generateOTP();
    localStorage.setItem("otp", otp);
    localStorage.setItem("pendingEmail", email); // lưu email tạm để tạo account sau

    sendOTPEmail(email, otp);
});
