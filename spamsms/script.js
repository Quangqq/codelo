document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;

    const apiUrl = 'https://quangapi.com/spamsms/api/';
    const params = new URLSearchParams({ phone: phone, amout: amout });
    
    let currentAttempt = 1;

    function sendRequest(attempt) {
        fetch(`${apiUrl}?${params}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById('message');
            if (data.success) {  // Assuming the API returns { success: true } on success
                messageDiv.style.display = 'block';
                messageDiv.style.color = 'green';
                messageDiv.textContent = `Thành công chờ ${attempt}s`;
                
                if (attempt < amout) {
                    setTimeout(() => sendRequest(attempt + 1), 10000); // 10-second delay before next attempt
                }
            } else {
                messageDiv.style.display = 'block';
                messageDiv.style.color = 'red';
                messageDiv.textContent = `Thất bại ở lượt thử ${attempt}. Đang thử lại sau 10 giây...`;
                
                setTimeout(() => sendRequest(attempt), 10000); // Retry the same attempt after 10 seconds
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            const messageDiv = document.getElementById('message');
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            messageDiv.textContent = `Lỗi Api Đợi ${attempt}s Hoặc Báo Admin Ngay`;
            
            setTimeout(() => sendRequest(attempt), 10000); // Retry the same attempt after 10 seconds
        });
    }

    sendRequest(currentAttempt);
});
