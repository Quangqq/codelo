// api mặt định của bạn
const spamApiUrls = {
    spamSms1: 'https://api.dichvuvn.shop/', //api v1
    spamSms2: 'https://api.dichvuvn.shop/', //api v2
    spamSms3: 'https://api.dichvuvn.shop/', //api v3
};

document.getElementById('smsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value || 100; // Get the amount or default to 100
    const selectedApi = document.getElementById('apiSelect').value; // Get the selected API

    const apiUrl = spamApiUrls[selectedApi];

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, amount }) // gửi số điện thoại và số lần
    })
    .then(response => response.json())
    .then(data => {
        // kiểm tra trạng thái api nha bé
        const message = data.message || "Thành Công";
        document.getElementById('responseMessage').innerText = message;
        document.getElementById('responseMessage').style.color = 'green'; // Success 
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = "Lỗi Vui Lòng Dùng Lại Sau";
        document.getElementById('responseMessage').style.color = 'red'; // Error
    });
});
