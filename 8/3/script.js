// Ngăn chặn chuột phải
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Ngăn chặn tổ hợp phím
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.key === "u" || event.key === "U" || event.key === "F12")) {
        event.preventDefault();
    }
    if (event.key === "F12") {
        event.preventDefault();
    }
});

// Hiển thị tin nhắn yêu thương
document.getElementById("sendLove").addEventListener("click", function () {
    const message = document.getElementById("love-message");
    message.classList.remove("hidden");

    setTimeout(() => {
        message.classList.add("hidden");
    }, 5000);
});

// Hiệu ứng trái tim rơi
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "♥️";

    // Vị trí ngẫu nhiên
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    document.body.appendChild(heart);

    // Xóa trái tim sau khi rơi
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Tạo trái tim liên tục
setInterval(createHeart, 300);
