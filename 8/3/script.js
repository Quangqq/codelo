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

// Hiển thị tin nhắn yêu thương với hiệu ứng gõ chữ
document.getElementById("sendLove").addEventListener("click", function () {
    const messageContainer = document.getElementById("love-message");
    const messageText = "Nhân ngày Quốc tế Phụ nữ 8/3, xin gửi những lời chúc tốt đẹp nhất đến tất cả những người phụ nữ tuyệt vời trên thế giới. Chúc các bạn luôn mạnh khỏe, xinh đẹp, hạnh phúc và thành công trong mọi lĩnh vực của cuộc sống. Cảm ơn vì đã làm cho thế giới này trở nên ấm áp và tràn đầy yêu thương hơn!";
    let currentIndex = 0;

    messageContainer.classList.remove("hidden");

    function typeWriter() {
        if (currentIndex < messageText.length) {
            messageContainer.querySelector("p").textContent += messageText[currentIndex];
            currentIndex++;
            setTimeout(typeWriter, 50); // Tốc độ gõ chữ (50ms mỗi ký tự)
        }
    }

    typeWriter(); // Bắt đầu hiệu ứng gõ chữ
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
