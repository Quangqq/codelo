// Ngăn chặn chuột phải
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Ngăn tổ hợp phím
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.key === "u" || event.key === "U" || event.key === "F12")) {
        event.preventDefault();
    }
    if (event.key === "F12") {
        event.preventDefault();
    }
});

// Hiệu ứng gõ chữ
document.getElementById("sendLove").addEventListener("click", function () {
    const messageContainer = document.getElementById("love-message");
    const messageText = "Chúc tất cả phụ nữ trên thế giới luôn xinh đẹp, mạnh khỏe và hạnh phúc!";
    let currentIndex = 0;

    messageContainer.classList.remove("hidden");

    function typeWriter() {
        if (currentIndex < messageText.length) {
            messageContainer.querySelector("p").textContent += messageText[currentIndex];
            currentIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
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

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Tạo trái tim liên tục
setInterval(createHeart, 300);
