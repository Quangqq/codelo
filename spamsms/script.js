document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const phone = document.getElementById('phone').value;
    const amout = document.getElementById('amout').value;
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = 'Đang Gửi Vui Lòng Chờ';
    messageDiv.className = '';

    function sendRequest(attempt) {
        fetch(`https://api.nqtool.net/spamsms/?phone=${phone}&amout=${amout}`)
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = `Success Vui Lòng Chờ ${attempt} Giây`;
                messageDiv.className = 'success';

                if (attempt < amout) {
                    setTimeout(() => sendRequest(attempt + 1), 10000); // 10-second delay
                }
            })
            .catch(error => {
                messageDiv.textContent = `Thất Bại Vui Lòng Chờ ${attempt} Giây`;
                messageDiv.className = 'error';
                console.error('Error:', error);
            });
    }

    sendRequest(1);
});
