document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    // 1️⃣ Gửi mail cho chủ web
    emailjs.send("service_8d8jc3q", "template_5sltubk", data)
    .then(function() {
        console.log("Mail chủ web đã gửi");
    }, function(error) {
        console.log("Mail chủ web thất bại:", error);
    });

    // 2️⃣ Gửi mail cho khách
    emailjs.send("service_8d8jc3q", "template_hufbe9j", data)
    .then(function() {
        document.getElementById("status").innerText = "Đã gửi thành công!";
    }, function(error) {
        document.getElementById("status").innerText = "Gửi thất bại!";
        console.log("Mail khách thất bại:", error);
    });
});
