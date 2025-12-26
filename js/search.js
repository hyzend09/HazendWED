// --- PHẦN 2: XỬ LÝ SEARCH BOX (CHẠY TRÊN MỌI TRANG) ---
document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.getElementById('search-icon');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Kiểm tra xem các element search có tồn tại trên trang này không
    if (searchIcon && searchBox) {
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
            const isDisplayed = searchBox.style.display === 'block';
            searchBox.style.display = isDisplayed ? 'none' : 'block';
            if (!isDisplayed) searchInput.focus();
        });

        // Click ra ngoài để đóng search box
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && e.target !== searchIcon) {
                searchBox.style.display = 'none';
            }
        });
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function () {
            const keyword = this.value.toLowerCase().trim();
            searchResults.innerHTML = "";
            if (keyword === "") return;

            const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
            filtered.forEach(product => {
                const item = document.createElement("div");
                item.innerHTML = `<strong>${product.name}</strong> — ${product.price}`;
                item.onclick = () => {
                    window.location.href = "product.html?id=" + product.id;
                };
                searchResults.appendChild(item);
            });
        });
    }
});


