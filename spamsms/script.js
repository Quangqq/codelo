document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;

    const apiUrl = 'https://apispam.quangapi.com/';
    const apiUrl = 'https://apispam.quangapi.com/index1.php/';
    const apiUrl = 'https://apispam.quangapi.com/index2.php/';
    const apiUrl = 'https://apispam.quangapi.com/index3.php/';
    const apiUrl = 'https://apispam.quangapi.com/index4.php/';
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
                messageDiv.style.color = 'green';
                messageDiv.textContent = `Thất Bại Chờ ${attempt}s`;
                
                setTimeout(() => sendRequest(attempt), 10000); // Retry the same attempt after 10 seconds
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            const messageDiv = document.getElementById('message');
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'green';
            messageDiv.textContent = `Thành Công Đợi ${attempt}s`;
            
            setTimeout(() => sendRequest(attempt), 10000); // Retry the same attempt after 10 seconds
        });
    }

    sendRequest(currentAttempt);
});
